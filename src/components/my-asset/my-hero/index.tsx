import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Pagination, Modal, Form, Popover, Button, Spin, Tooltip, Empty } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useWrap } from 'context/WrapperContext';
import { useActiveWeb3React, useConnectWallet } from 'hooks';
import web3 from 'web3';
import { MyBoxApi } from '../../../config/api/myBoxApi';
import NoneImg from '../../../public/images/none-img.png';
import NoneData from 'components/element/NoneData';
import LoadingItem from 'components/element/LoadingItem';
import CominSoon from 'components/cominsoon';
import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import LoadingFull from 'components/loading-full';
import { useCharacterMarketContract, useGamePlayContract, useGEMContract } from '../../../hooks/useContract';
import { unlockNFTFromGame, claimNFT, getSellCharacterInfo, cancelSellCharacter } from '../../my-profile/game-utils';

const { Header, Content } = Layout;

interface Col {
	classDefault: string;
}

declare const window: Window & typeof globalThis & { ethereum: any };

const MyHero = () => {
	let tokenID = window.localStorage.getItem('tokenId');
	const history = useHistory();
	const typeProfile = history.location.search.replace('?', '');
	const { showNoti } = useWrap();
	const fixedListFilter = [
		{
			name: 'CHARACTER',
			icon: 'filter-dot-a'
		}
	];

	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
	const envChainId = process.env.REACT_APP_CHAIN_ID;
	const gamePlayAddress = process.env.REACT_APP_GAME_PLAY_CONTRACT ?? '';
	const characterMarketAddress = process.env.REACT_APP_CHARACTER_NFT_MARKET_CONTRACT ?? '';

	const gamePlayContract = useGamePlayContract(gamePlayAddress);
	const characterMarketContract = useCharacterMarketContract(characterMarketAddress);

	const [loading, setLoading] = useState(false);
	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);
	const { chainId, account, library } = useActiveWeb3React();
	const [dataProfile, setDataProfile] = useState<any>([]);
	const [classTab, setClassTabs] = useState('');
	const [loadingKey, setLoadingKey] = useState(0);
	const [loadingUnlock, setLoadingUnlock] = useState(false);
	const [loadingCancel, setLoadingCancel] = useState(false);
	const [disableUnlock, setDisableUnlock] = useState(false);

	const [isLoadingMint, setLoadingMint] = useState(false);
	const [loadingMintKey, setLoadingMintKey] = useState(0);

	const [listFilter, setListFitler] = useState(() => {
		let arr: string[] = [];
		fixedListFilter.forEach((item) => {
			arr.push(item.name);
		});
		return arr;
	});

	const [totalRow, setTotalRow] = useState(0);
	const paramReset = {
		gameItemTypeList: listFilter,
		ownerAddress: account,
		statusList: ['OWNER'],
		page: 0,
		size: 12
	};
	const [param, setParam] = useState(paramReset);

	const col: Col = {
		classDefault: ''
	};
	if (!isMobile) {
		col.classDefault = 'col-20';
	}

	const displayTabs = (action: string) => {
		history.push({
			pathname: '',
			search: action
		});
	};

	// GET DATA BOX
	const getDataAsset = async (type, account, tokenID) => {
		setLoading(true);

		const dataFilter = {
			...param,
			statusList: [type]
		};
		try {
			let res = await MyBoxApi.getDataAsset(dataFilter, tokenID, account);
			setTotalRow(parseInt(res.headers['x-total-count']));
			if (res.status === 200) {
				//let newListAsset: any = [];
				if (res.data.length > 0) {
					// res.data.forEach((item, index) => {
					//     (async () => {
					//         try {
					//             // let check = await getOwner(itemContract, item.nftId);

					//             // if (check === account) {
					//             newListAsset.push(item);
					//             // }
					//         } catch (error) {
					//         } finally {
					//             // setDataProfile([]);
					//             if (index === res.data.length - 1) {
					//                 setLoading(false);
					//             }
					//         }
					//     })();
					// });
					//setDataProfile(newListAsset);
					setDataProfile(res.data);
				} else {
					setDataProfile([]);
					setLoading(false);
				}
			}
		} catch (error) {
			console.log('Error: ', error);
		} finally {
			setLoading(false);
		}
	};
	const onUnload = (event) => {
		event.preventDefault();
		return (event.returnValue = 'Are you sure you want to exit?');
	};

	const onCancelSellingAsset = async (item: any) => {
		if (chainId != envChainId) {
			showNoti('warning', 'Wrong Network!');
			return;
		}
		window.addEventListener('beforeunload', onUnload);
		try {
			if (loadingCancel || !account || !item) {
				return;
			}

			setLoadingKey(item.id);
			setLoadingCancel(true);
			await cancelSellCharacter(characterMarketContract, item.saleId)
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
											showNoti('success', 'Cancel Successfully');
											countNoti++;
											const dataCancel = {
												hash: txn.hash,
												ownerAddress: account,
												sellId: item.saleId,
												gameItemType: 'CHARACTER'
											};
											MyBoxApi.cancelMyAsset(dataCancel, tokenID).finally(() => {
												displayTabs('hero');
											});
										}
									} else {
										showNoti('warning', 'Cancel Failed');
									}

									setLoadingCancel(false);
									window.removeEventListener('beforeunload', onUnload);
								}
							})();
						}, 1000);
					}
				})
				.catch((error) => {
					console.log(error);
					setLoadingCancel(false);
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
		} catch (error: any) {
			console.log(error);
			setLoadingCancel(false);
			window.removeEventListener('beforeunload', onUnload);
		}
	};

	const onUnlockFromGame = async (item: any) => {
		try {
			if (chainId != envChainId) {
				showNoti('warning', 'Wrong Network!');
				return;
			}
			if (loadingUnlock) {
				return;
			}
			window.addEventListener('beforeunload', onUnload);
			setLoadingKey(item.id);
			setLoadingUnlock(true);
			setDisableUnlock(true);

			await unlockNFTFromGame(gamePlayContract, item)
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
											countNoti++;
											showNoti('success', 'Unlock Successfully');
											const payload = {
												moveNftHash: txn.hash,
												ownerAddress: account,
												gameItemNftId: item.gameItemNftId.toString(),
												gameItemType: 'CHARACTER',
												id: item.id
											};
											MyBoxApi.nftToMarket(payload, item.id, tokenID).finally(() => {
												history.push('/my-assets/hero');
											});
										}
									} else {
										showNoti('warning', 'Unlock Failed');
										if (account && tokenID) {
											getDataAsset('IN_GAME', true, tokenID);
										}
									}
									setLoadingUnlock(false);
									setDisableUnlock(false);
									window.removeEventListener('beforeunload', onUnload);
								}
							})();
						}, 1000);
					}
				})
				.catch((error) => {
					console.log(error);
					setLoadingUnlock(false);
					setDisableUnlock(false);
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
		} catch (error: any) {
			setLoadingUnlock(false);
			setDisableUnlock(false);
			window.removeEventListener('beforeunload', onUnload);
			console.log(error);
			if (error.data) {
				showNoti('error', error.data.message);
			}
		}
	};

	useEffect(() => {
		if (account && classTab) {
			switch (classTab) {
				case 'hero':
					getDataAsset('OWNER', account, tokenID);
					break;
				case 'selling-hero':
					getDataAsset('SELLING', account, tokenID);
					break;
				case 'hero-in-game':
					getDataAsset('IN_GAME', account, tokenID);
					break;
				default:
					break;
			}
		}
	}, [account, classTab, param]);

	useEffect(() => {
		setParam({
			...param,
			page: 0
		});
	}, [account]);

	useEffect(() => {
		if (typeProfile) {
			setClassTabs(typeProfile);
		} else {
			setClassTabs('hero');
		}
	}, [typeProfile]);

	const claimTestGameNft = async (item) => {
		if (!account || !item.gameItemNftId || !item.claimSign || isLoadingMint) {
			return;
		}
		if (chainId != envChainId) {
			showNoti('warning', 'Wrong Network!');
			return;
		}
		window.addEventListener('beforeunload', onUnload);
		try {
			setLoadingMint(true);
			setLoadingMintKey(item.id);

			await claimNFT(gamePlayContract, account, item)
				.then((txn) => {
					if (txn && txn.hash) {
						const payloadBefore = {
							claimHash: txn.hash,
							ownerAddress: account,
							nftId: item.gameItemNftId
						};
						MyBoxApi.beforeMintNFT(payloadBefore, item.id, tokenID).catch((e) => {
							console.log(e);
						});
						let countNoti = 0;
						const interval = setInterval(function () {
							(async () => {
								const res = await w3.eth.getTransactionReceipt(txn.hash);
								if (res) {
									clearInterval(interval);
									if (res.status && res.blockNumber) {
										if (!countNoti) {
											countNoti++;
											showNoti('success', 'Mint Successfully');
											const payload = {
												ownerAddress: account,
												nftId: item.gameItemNftId
											};
											MyBoxApi.mintNFT(payload, item.id, tokenID).finally(() => {
												getDataAsset('OWNER', account, tokenID);
											});
										}
									} else {
										showNoti('warning', 'Mint Failed');
									}
									setLoadingMint(false);
									window.removeEventListener('beforeunload', onUnload);
								}
							})();
						}, 1000);
					}
				})
				.catch((error) => {
					console.log(error);
					setLoadingMint(false);
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
		} catch (error: any) {
			console.log(error);
			setLoadingMint(false);
			window.removeEventListener('beforeunload', onUnload);
		}
	};

	// const ObjectNew = dataProfile[0]



	const BoxContent = (props) => {
		const { type } = props;
		return (
			<>
				{/* <img src={ObjectNew?.assetImage} alt="..." /> */}
				<Row gutter={30}>
					{dataProfile?.length > 0 ? (
						dataProfile.map((item, index) => (
							<Col xs={24} sm={12} xl={6} key={index}>
								<div className="asset-item hero-item">
									<div className="asset-id">#{item.gameItemNftId}</div>
									<div className="hero-stone">
										<img src="../images/hero-stone.png" />
									</div>
									<div className="hero-image">
										<img src={item.assetImage == null || item.assetImage == '' ? NoneImg : item.assetImage} />
									</div>
									<div className="hero-provided">
										<span>Provided by</span>
										<span>LegendOfGalaxy</span>
									</div>
									<div className="hero-name">
										<span>{item.name ? item.name : 'Hero'}</span>

										{type == 'selling-hero' && (
											<Button
												onClick={() => onCancelSellingAsset(item)}
												disabled={loadingCancel && loadingKey == item.id}
												className="btn-gold-claim font-normal"
											>
												Cancel{' '}
												{loadingCancel && loadingKey == item.id && <Spin className="style-loading" size="small" />}
											</Button>
										)}

										{type == 'hero-in-game' && item?.moveNftStatus != '' && item?.moveNftStatus == 'PENDING' ? (
											<Button
												onClick={() => onUnlockFromGame(item)}
												disabled={disableUnlock && loadingKey == item.id}
												className="btn-gold-claim font-normal"
											>
												Unlock{' '}
												{loadingUnlock && loadingKey == item.id && <Spin className="style-loading" size="small" />}
											</Button>
										) : (
											<>
												{type == 'my-hero' && (
													<>
														{!item.claimNft ? (
															<Button
																className="btn-gold-claim font-normal"
																onClick={() => claimTestGameNft(item)}
																disabled={isLoadingMint}
															>
																Claim{' '}
																{isLoadingMint && loadingMintKey == item.id && (
																	<Spin className="style-loading" size="small" />
																)}
															</Button>
														) : (
															<Button
																className="btn-gold-claim font-normal"
																onClick={(event) =>
																	(window.location.href = `/my-assets/hero/detail/${item.gameItemNftId}?profile`)
																}
																disabled={isLoadingMint}
															>
																Detail
															</Button>
														)}
													</>
												)}
											</>
										)}
									</div>
								</div>
							</Col>
						))
					) : (
						<>
							{type === 'selling-hero' ? (
								// <NoneData text={'No Selling Data'} />
								<CominSoon />
							) : (
								<>
									<NoneData text={'No Data'} />
								</>
							)}
						</>
					)}
				</Row>
			</>
		);
	};

	const returnContentTab = () => {
		switch (classTab) {
			case 'hero':
				return <BoxContent type="my-hero" />;
				break;
			case 'selling-hero':
				return <BoxContent type="selling-hero" />;
				break;
			case 'hero-in-game':
				return <BoxContent type="hero-in-game" />;
				break;
			default:
				break;
		}
	};
	const onChange_Pagi = (pageNumber) => {
		setParam({
			...param,
			page: pageNumber - 1
		});
	};
	return (
		<Layout className="asset-block">
			<Header className="asset-type-status" style={{ padding: 0 }}>
				<div className="tab-asset-sale">
					<button type="button" className={classTab == 'hero' ? 'active' : ''} onClick={() => displayTabs('hero')}>
						My hero
					</button>
					<button
						type="button"
						className={classTab == 'selling-hero' ? 'active' : ''}
						onClick={() => displayTabs('selling-hero')}
					>
						Selling hero
					</button>
					<button
						type="button"
						className={classTab == 'hero-in-game' ? 'active' : ''}
						onClick={() => displayTabs('hero-in-game')}
					>
						Hero In Game
					</button>
				</div>
			</Header>
			<Content style={{ margin: '0 0' }} className="page-container">
				{!account ? (
					<div className="asset-content" style={{ padding: 0, minHeight: 360 }}>
						<div className="wallet-content-connect">
							<h3>NOTHING HERE YET...</h3>
							<div className="pls-connect-text">Please connect your wallet to activate this page</div>
							<div className="btn-connect-wl">
								<ConnectWallet />
							</div>
						</div>
					</div>
				) : (
					<div className="asset-content" style={{ padding: 0, minHeight: 360 }}>
						<Row>
							{/* <Col className="gutter-row" xs={24} xl={4} md={4} sm={4}>
                                <div className="asset-filter">

                                </div>
                            </Col> */}
							<Col className="gutter-row" xs={24} xl={24} md={24} sm={24}>
								<div className="asset-grid">{returnContentTab()}</div>
								{totalRow > 10 && (
									<Pagination
										// style={{ padding: 15, float: 'right' }}
										current={param.page + 1}
										defaultCurrent={1}
										total={totalRow}
										pageSize={param.size}
										onChange={onChange_Pagi}
										showSizeChanger={false}
										className="pagiation-custom"
									/>
								)}
							</Col>
						</Row>
					</div>
				)}
			</Content>
			{(loadingUnlock || isLoadingMint || loadingCancel) && <LoadingFull />}
		</Layout>
	);
};

export default MyHero;
