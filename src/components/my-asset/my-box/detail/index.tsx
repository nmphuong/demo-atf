import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Form, Input, InputNumber, Button, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import { useActiveWeb3React } from 'hooks';

import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import HeaderMobile from 'components/common/menu-sidebar-top';
import { MyBoxApi } from 'config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import LoadingFull from 'components/loading-full';
import LoadingNew from 'components/Loading';
import HeaderPage from 'components/common/header-page';
import { approveBox, openBoxCharacter, openBoxGameToken, openBoxGem, openBoxMainToken } from 'utils/utils';
import { useMysteryBoxContract, useOpenBoxContract } from 'hooks/useContract';
import web3 from 'web3';
import AssetMenu from 'components/my-asset/asset-menu';
import './mybox.css';

const { Content } = Layout;
declare const window: Window & typeof globalThis & { ethereum: any };

const MyBoxDetail = () => {
	let tokenID = window.localStorage.getItem('tokenId');

	const boxContractAddress = process.env.REACT_APP_BOX_CONTRACT ?? '';

	const openBoxContractAddress = process.env.REACT_APP_OPEN_BOX_CONTRACT ?? '';

	const envChainId = process.env.REACT_APP_CHAIN_ID;

	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';

	const openBoxContract = useOpenBoxContract(openBoxContractAddress);

	const boxContract = useMysteryBoxContract(boxContractAddress);

	const [quantityBuy, setQuantityBuy] = useState(1);
	let { id }: { id: string } = useParams();
	let history = useHistory();
	const typePage = history.location.search.replace('?', '');
	const [loadingDetail, setLoadingDetail] = useState(false);
	const { showNoti } = useWrap();
	const { chainId, account } = useActiveWeb3React();
	const [boxInfo, setBoxInfo] = useState<IListItemProfile>();
	const [total, setTotal] = useState(0);
	const [isApproved, setIsApproved] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSellVisible, setIsSellVisible] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState(false);
	const [loadingSell, setLoadingSell] = useState(false);
	const [sellForm] = Form.useForm();

	const [totalBox, setTotalBox] = useState(0);
	const [quantityBox, setQuantityBox] = useState(0);

	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);

	const onChangeQuantity = (e: any) => {
		setQuantityBuy(parseInt(e.target.value));
		setTotal(parseInt(e.target.value) * boxInfo?.boxPrice || 0);
	};

	const getBox = async () => {
		setLoadingDetail(true);

		let res: any = null;
		try {
			res = await MyBoxApi.getMyBoxDetailClient(id, tokenID);
			if (res.status === 200) {
				setBoxInfo(res.data);
				setTotalBox(parseInt(res.data.quantity));
			}
		} catch (error) {
			console.log('Error: ', error);
		} finally {
			setLoadingDetail(false);
		}
	};
	useEffect(() => {
		getBox();
	}, [account]);

	useEffect(() => {
		if (account) {
			if (boxContract) {
				boxContract.isApprovedForAll(account, openBoxContractAddress).then((res) => {
					setIsApproved(res);
				});
			}
		}
	}, [account]);

	const handleApproveBox = async () => {
		try {
			if (chainId != envChainId) {
				showNoti('warning', 'Wrong Network!');
				return;
			}
			setLoading(true);

			await approveBox(boxContract, openBoxContractAddress)
				.then((txn) => {
					if (txn && txn.hash) {
						let countNoti = 0;
						const interval = setInterval(function () {
							(async () => {
								const res = await w3.eth.getTransactionReceipt(txn.hash);
								if (res) {
									clearInterval(interval);
									if (res.status && res.blockNumber) {
										if (!countNoti) {
											showNoti('success', 'Approve Box Successfully');
											countNoti++;
											setIsApproved(true);
										}
									} else {
										showNoti('error', 'Approve Box Failed');
									}
									setLoading(false);
								}
							})();
						}, 1000);
					}
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
					if (error) {
						if (error.code == 4001 && error.message) {
							showNoti('warning', error.message);
						} else {
							if (error.data && error.data.message) {
								showNoti('warning', error.data.message);
							}
						}
					}
				});
		} catch (error: any) {
			setLoading(false);
			console.log(error);
			// if (error.data) {
			//     showNoti('error', error.data.message);
			// }
		}
	};

	const onUnload = (event) => {
		event.preventDefault();
		return (event.returnValue = 'Are you sure you want to exit?');
	};

	const openMainToken = async (openBoxSC, boxId, receiptId, amount, sig, token, srcMyBoxId) => {
		await openBoxMainToken(openBoxSC, boxId, receiptId, amount, sig)
			.then((txn) => {
				console.log(txn);
				if (txn && txn.hash) {
					let countNoti = 0;
					const interval = setInterval(function () {
						(async () => {
							const res = await w3.eth.getTransactionReceipt(txn.hash);
							if (res) {
								clearInterval(interval);
								if (res.status && res.blockNumber) {
									if (!countNoti) {
										showNoti('success', 'Open Box Successfully');
										countNoti++;
										const payload = {
											id: receiptId,
											mintHash: txn.hash,
											ownerAddress: account,
											myBoxId: srcMyBoxId
										};
										MyBoxApi.updateAfterRandom(payload, token).finally(() => {
											history.push('/my-assets/box?box');
										});
									}
								} else {
									showNoti('error', 'Open Box Failed');
								}
								setLoading(false);
								window.removeEventListener('beforeunload', onUnload);
							}
						})();
					}, 1000);
				}
			})
			.catch((error) => {
				setLoading(false);
				window.removeEventListener('beforeunload', onUnload);
				if (error) {
					if (error.code == 4001 && error.message) {
						showNoti('warning', error.message);
					} else {
						if (error.data && error.data.message) {
							showNoti('warning', error.data.message);
						}
					}
				}
			});
	};

	const openGameToken = async (openBoxSC, boxId, receiptId, amount, sig, token, srcMyBoxId) => {
		await openBoxGameToken(openBoxSC, boxId, receiptId, amount, sig)
			.then((txn) => {
				console.log(txn);
				if (txn && txn.hash) {
					let countNoti = 0;
					const interval = setInterval(function () {
						(async () => {
							const res = await w3.eth.getTransactionReceipt(txn.hash);
							if (res) {
								clearInterval(interval);
								if (res.status && res.blockNumber) {
									if (!countNoti) {
										showNoti('success', 'Open Box Successfully');
										countNoti++;
										const payload = {
											id: receiptId,
											mintHash: txn.hash,
											ownerAddress: account,
											myBoxId: srcMyBoxId
										};
										MyBoxApi.updateAfterRandom(payload, token).finally(() => {
											history.push('/my-assets/box?box');
										});
									}
								} else {
									showNoti('error', 'Open Box Failed');
								}
								setLoading(false);
								window.removeEventListener('beforeunload', onUnload);
							}
						})();
					}, 1000);
				}
			})
			.catch((error) => {
				setLoading(false);
				window.removeEventListener('beforeunload', onUnload);
				if (error) {
					if (error.code == 4001 && error.message) {
						showNoti('warning', error.message);
					} else {
						if (error.data && error.data.message) {
							showNoti('warning', error.data.message);
						}
					}
				}
			});
	};

	const openCharacter = async (openBoxSC, boxId, receiptId, nftId, color, uri, sig, token) => {
		await openBoxCharacter(openBoxSC, boxId, receiptId, nftId, color, uri, sig)
			.then((txn) => {
				console.log(txn);
				if (txn && txn.hash) {
					let countNoti = 0;
					const interval = setInterval(function () {
						(async () => {
							const res = await w3.eth.getTransactionReceipt(txn.hash);
							if (res) {
								clearInterval(interval);
								if (res.status && res.blockNumber) {
									if (!countNoti) {
										showNoti('success', 'Open Box Successfully');
										countNoti++;
										const payload = {
											id: receiptId,
											mintHash: txn.hash,
											ownerAddress: account
										};
										MyBoxApi.updateAfterRandom(payload, token).finally(() => {
											// function resolveAfter2Seconds() {
											// 	return new Promise((resolve) => {
											// 		setTimeout(() => {
											// 			history.push('/my-assets/hero?hero');
											// 		}, 4500);
											// 	});
											// }

											// async function asyncCall() {
											// 	const result = await resolveAfter2Seconds();
											// 	console.log(result);
											// }

											// asyncCall();

											history.push('/openbox');
										});
									}
								} else {
									showNoti('error', 'Open Box Failed');
								}
								setLoading(false);
								window.removeEventListener('beforeunload', onUnload);
							}
						})();
					}, 1000);
				}
			})
			.catch((error) => {
				setLoading(false);
				window.removeEventListener('beforeunload', onUnload);
				if (error) {
					if (error.code == 4001 && error.message) {
						showNoti('warning', error.message);
					} else {
						if (error.data && error.data.message) {
							showNoti('warning', error.data.message);
						}
					}
				}
			});
	};

	const openGem = async (openBoxSC, boxId, receiptId, nftId, amount, sig, token) => {
		await openBoxGem(openBoxSC, boxId, receiptId, nftId, amount, sig)
			.then((txn) => {
				console.log(txn);
				if (txn && txn.hash) {
					let countNoti = 0;
					const interval = setInterval(function () {
						(async () => {
							const res = await w3.eth.getTransactionReceipt(txn.hash);
							if (res) {
								clearInterval(interval);
								if (res.status && res.blockNumber) {
									if (!countNoti) {
										showNoti('success', 'Open Box Successfully');
										countNoti++;
										const payload = {
											id: receiptId,
											mintHash: txn.hash,
											ownerAddress: account
										};
										MyBoxApi.updateAfterRandom(payload, token).finally(() => {
											history.push('/my-assets/item?item');
										});
									}
								} else {
									showNoti('error', 'Open Box Failed');
								}
								setLoading(false);
								window.removeEventListener('beforeunload', onUnload);
							}
						})();
					}, 1000);
				}
			})
			.catch((error) => {
				setLoading(false);
				window.removeEventListener('beforeunload', onUnload);
				if (error) {
					if (error.code == 4001 && error.message) {
						showNoti('warning', error.message);
					} else {
						if (error.data && error.data.message) {
							showNoti('warning', error.data.message);
						}
					}
				}
			});
	};

	const handleOpenBox = async () => {
		try {
			if (chainId != envChainId) {
				showNoti('warning', 'Wrong Network!');
				return;
			}
			if (!account || !boxInfo || !boxInfo.boxNftId || !openBoxContract || !tokenID) {
				return;
			}
			const randomInfo: any = await MyBoxApi.randomItem(account, id, tokenID);
			if (!randomInfo || !randomInfo.data || !randomInfo.data.receiptId) {
				return;
			}

			let data = randomInfo.data;
			let receiptInfo = await openBoxContract.mappingClaimInfos(data.receiptId);
			if (receiptInfo && parseInt(receiptInfo.receiptId) == data.receiptId) {
				const payload = {
					id: data.receiptId,
					mintHash: openBoxContractAddress,
					ownerAddress: account
				};
				MyBoxApi.updateAfterRandom(payload, tokenID).finally(() => {
					history.push('/my-assets?box');
				});
				return;
			}


			setIsLoading(true);
			window.addEventListener('beforeunload', onUnload);

			if (data.resultType === 'MONEY') {
				await openGameToken(
					openBoxContract,
					boxInfo.boxNftId,
					data.receiptId,
					data.resultVal,
					data.signature,
					tokenID,
					data.srcMyBoxId
				);
			} else if (data.resultType === 'TOKEN') {
				await openMainToken(
					openBoxContract,
					boxInfo.boxNftId,
					data.receiptId,
					data.resultVal,
					data.signature,
					tokenID,
					data.srcMyBoxId
				);
			} else if (data.resultType === 'ITEM') {
				await openGem(openBoxContract, boxInfo.boxNftId, data.receiptId, data.resultId, data.resultVal, data.signature, tokenID);
			} else if (data.resultType.includes('CHARACTER')) {
				await openCharacter(
					openBoxContract,
					boxInfo.boxNftId,
					data.receiptId,
					data.resultId,
					data.color,
					`${data.resultId}.json`,
					data.signature,
					tokenID
				);
				setIsOpen(true);
			} else {
				setIsLoading(false);
				window.removeEventListener('beforeunload', onUnload);
				return;
			}
		} catch (error: any) {
			setIsLoading(false);
			console.log(error);
			window.removeEventListener('beforeunload', onUnload);
		}
	};

	const closeBox = () => {
		setIsSellVisible(false);
		sellForm.resetFields();
	};
	const onShowModalSellBox = () => {
		sellForm.resetFields();
		setIsSellVisible(true);
	};
	const onSellForm = (values: any) => {
		//handleSellAsset(values.price);
	};

	let typeTitle = 'text-wool';
	let typeBg = 'bg-detail-wool';
	if (boxInfo) {
		if (boxInfo.boxType == 'CONQUEROR') {
			typeBg = 'bg-detail-gold';
			typeTitle = 'text-gold';
		} else if (boxInfo.boxType == 'EXPLORER') {
			typeBg = 'bg-detail-silver';
			typeTitle = 'text-silver';
		} else if (boxInfo.boxType == 'SPECIAL') {
			typeBg = 'bg-silver';
			typeTitle = 'text-silver';
		}
	}
	let classBg = 'detail-img detail-img-box-detail ' + typeBg;
	let classTitle = 'box-name detail-box-name ' + typeTitle;
	const onCopy = () => {
		showNoti('success', 'Copied');
	};
	return (
		<>
			<HeaderMobile />
			<HeaderPage />
			<Content className="page-container">
				<Row>
					<Col className="gutter-row" xs={24} xl={4} md={4} sm={4}>
						<div className="menu-sidebar">
							<MenuSidebar />
						</div>
					</Col>
					<div className="page-main">
						<div className="page-content">
							<AssetMenu />
							<div className="detail-box">
								<div className="back">
									<Link to="/my-assets">
										<ArrowLeftOutlined /> Back{' '}
									</Link>
								</div>
								<div className="detail-block">
									<div className="detail-box-content">
										<div className="detail-left">
											<div className={classBg}>
												<div className="box-total-text">{boxInfo?.boxNftId ? boxInfo?.boxNftId : ''}</div>
												<div className="img-box-detail">
													<img
														className="animation-css-scale"
														src={
															boxInfo?.boxImage
																? boxInfo?.boxImage
																: require('../../../../public/images/Marketplace/box/Pioneer-Box.png')
																		.default
														}
													/>
												</div>
											</div>
										</div>
										<div className="detail-right">
											<div className="detail-info">
												<div className={classTitle}>
													<span>{boxInfo?.box?.boxName ? boxInfo?.box?.boxName : ''}</span>
												</div>
												<p>Description</p>
												<div className="detail-des">{boxInfo?.box?.description}</div>
												<p>Rewards</p>
												<div className="detail-des">
													<ul className="item-detail">
														<li className="item-lv">
															<div className="icon-item">
																<img
																	src={
																		require(`../../../../public/images/Marketplace/level/lv-b.png`)
																			.default
																	}
																/>
															</div>
															<span>
																{(
																	Number(
																		boxInfo?.box?.openRates.filter(
																			(item) => item.unboxItem === 'WHITE_CHARACTER'
																		)[0].percentage
																	) * 100
																).toFixed(2)}
																%
															</span>
														</li>
														<li className="item-lv">
															<div className="icon-item">
																<img
																	src={
																		require(`../../../../public/images/Marketplace/level/lv-a.png`)
																			.default
																	}
																/>
															</div>
															<span>
																{(
																	Number(
																		boxInfo?.box?.openRates.filter(
																			(item) => item.unboxItem === 'GREEN_CHARACTER'
																		)[0].percentage
																	) * 100
																).toFixed(2)}
																%
															</span>
														</li>
														<li className="item-lv">
															<div className="icon-item">
																<img
																	src={
																		require(`../../../../public/images/Marketplace/level/lv-s.png`)
																			.default
																	}
																/>
															</div>
															<span>
																{(
																	Number(
																		boxInfo?.box?.openRates.filter(
																			(item) => item.unboxItem === 'BLUE_CHARACTER'
																		)[0].percentage
																	) * 100
																).toFixed(2)}
																%
															</span>
														</li>
														<li className="item-lv">
															<div className="icon-item">
																<img
																	src={
																		require(`../../../../public/images/Marketplace/level/lv-ss.png`)
																			.default
																	}
																/>
															</div>
															<span>
																{(
																	Number(
																		boxInfo?.box?.openRates.filter(
																			(item) => item.unboxItem === 'PURPLE_CHARACTER'
																		)[0].percentage
																	) * 100
																).toFixed(2)}
																%
															</span>
														</li>
														<li className="item-lv">
															<div className="icon-item">
																<img
																	src={
																		require(`../../../../public/images/Marketplace/level/lv-ssr.png`)
																			.default
																	}
																/>
															</div>
															<span>
																{(
																	Number(
																		boxInfo?.box?.openRates.filter(
																			(item) => item.unboxItem === 'YELLOW_CHARACTER'
																		)[0].percentage
																	) * 100
																).toFixed(2)}
																%
															</span>
														</li>
														<li className="item-lv">
															<div className="icon-item">
																<img
																	className="w-37"
																	src={
																		require(`../../../../public/images/Marketplace/logo/gae-token.png`)
																			.default
																	}
																/>
															</div>
															<span>
																{(
																	Number(
																		boxInfo?.box?.openRates.filter(
																			(item) => item.unboxItem === 'TOKEN'
																		)[0].percentage
																	) * 100
																).toFixed(2)}
																%
															</span>
														</li>
														<li className="item-lv">
															<div className="icon-item">
																<img
																	className="w-37"
																	src={
																		require(`../../../../public/images/Marketplace/logo/token-ingame.png`)
																			.default
																	}
																/>
															</div>
															<span>
																{(
																	Number(
																		boxInfo?.box?.openRates.filter(
																			(item) => item.unboxItem === 'MONEY'
																		)[0].percentage
																	) * 100
																).toFixed(2)}
																%
															</span>
														</li>
													</ul>
												</div>
												<p>Owner</p>
												<div className="detail-des">
													<div className="owner-address">
														<span>
															{boxInfo?.ownerAddress?.substring(0, 12)}...
															{boxInfo?.ownerAddress?.substring(boxInfo?.ownerAddress?.length - 12)}
														</span>
														<CopyToClipboard
															onCopy={onCopy}
															text={boxInfo && boxInfo?.ownerAddress ? boxInfo.ownerAddress : ''}
														>
															<CopyOutlined />
														</CopyToClipboard>
													</div>
												</div>
											</div>
											<div className="detail-info_cus">
												{/* <p className="detail-box-name">Amount</p> */}
												{/* <div className="detail-des-input">
													<input
														className="input-quantity-box"
														type="number"
														value={quantityBuy}
														onChange={(e) => onChangeQuantity(e)}
														name="quantity"
														disabled={!account}
													/>
													<img
														className="icon-box-detail"
														src={
															require('../../../../public/images/Marketplace/header/icon-box-gold.webp')
																.default
														}
													/>
												</div> */}
												<div className="detail-des-input">
													{ process.env.REACT_APP_ENV === 'dev' &&
													(<div className="btn-gold-div">
															{/*<Button htmlType="button" className="btn-gold" onClick={onShowModalSellBox} >Sell</Button>*/}
															{account ? (
																isApproved ? (
																	<Button htmlType="button" className="btn-gold" onClick={handleOpenBox}>
																		Open Box
																	</Button>
																) : (
																	<Button htmlType="button" className="btn-gold" onClick={handleApproveBox}>
																		Open Box: Approve
																	</Button>
																)
															) : (
																<ConnectWallet />
															)}
														</div>)
													}

												</div>
											</div>
										</div>
									</div>

									<div className="history-table"></div>
								</div>
							</div>
						</div>
						<Modal
							title={<div className="text-md connect-wallet-title">Sell Your Box</div>}
							visible={isSellVisible}
							footer={null}
							className="connect-wallet "
						>
							<div className="wallet-content-account">
								<div className="wallet-button">
									<div className="sell-form-img">
										<img
											src={
												boxInfo?.boxImage
													? boxInfo?.boxImage
													: require('../../../../public/images/Marketplace/box/Pioneer-Box.png').default
											}
										/>
									</div>

									<Form
										form={sellForm}
										name="basic"
										initialValues={{ price: 0 }}
										labelCol={{ span: 5 }}
										wrapperCol={{ span: 24 }}
										autoComplete="off"
										onFinish={onSellForm}
										className="sell-form"
									>
										<Form.Item
											label={<label className="label-price">Price (GAE)</label>}
											name="price"
											rules={[
												{
													validator: (rule, value, cb: (msg?: string) => void) => {
														!value || parseFloat(value) <= 0 ? cb('Invalid Price') : cb();
													}
												}
											]}
										>
											<InputNumber
												className="input-custom"
												style={{ width: '100%' }}
												placeholder="Price..."
												defaultValue="0"
												disabled={loadingSell}
											/>
										</Form.Item>
										<Form.Item className="modal-btn-group">
											<Button className="btn-gold" type="primary" htmlType="submit" disabled={loadingSell}>
												Confirm {loadingSell && <Spin className="style-loading" size="small" />}
											</Button>

											<Button
												className="btn-gold"
												type="default"
												htmlType="button"
												onClick={closeBox}
												disabled={loadingSell}
											>
												Close
											</Button>
										</Form.Item>
									</Form>
									{loadingSell && (
										<div className="warning">Waiting for confirmation txn. Please DON'T reload your page.</div>
									)}
								</div>
							</div>
						</Modal>
					</div>
				</Row>

				{loadingDetail || (loading && <LoadingFull />)}

				{isLoading && (
					<>
						<div className="cusLoading">
							{isOpen ? (
								<>
									<img
										className="animation-css-data cusImgData"
										src={
											boxInfo?.boxImage
												? boxInfo?.boxImage
												: require('../../../../public/images/Marketplace/box/Pioneer-Box.png').default
										}
									/>
									<p>Loading...</p>
								</>
							) : (
								<>
									<img
										className="animation-css-scale cusImgData"
										src={
											boxInfo?.boxImage
												? boxInfo?.boxImage
												: require('../../../../public/images/Marketplace/box/Pioneer-Box.png').default
										}
									/>
									<p>Confirm...</p>
								</>
							)}
						</div>
					</>
				)}
			</Content>
		</>
	);
};

export default MyBoxDetail;
