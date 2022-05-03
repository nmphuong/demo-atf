import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Pagination, Modal, Form, Popover, Button, Spin, Tooltip, Empty } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useActiveWeb3React, useConnectWallet } from 'hooks';
import web3 from 'web3';
import { MyBoxApi } from '../../../config/api/myBoxApi';
import NoneImg from '../../../public/images/none-img.png';
import { useWrap } from 'context/WrapperContext';

import NoneData from 'components/element/NoneData';

import LoadingItem from 'components/element/LoadingItem';
import CominSoon from 'components/cominsoon';
import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import { cancelSellGemItem, unlockNFT1155FromGame } from '../../my-profile/game-utils';
import { useGamePlayContract, useGemrMarketContract } from '../../../hooks/useContract';
import LoadingFull from '../../loading-full';

const { Header, Content } = Layout;

interface Col {
	classDefault: string;
}

declare const window: Window & typeof globalThis & { ethereum: any };

const MyItem = () => {
	let tokenID = window.localStorage.getItem('tokenId');

	const history = useHistory();
	const typeProfile = history.location.search.replace('?', '');

	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
	const envChainId = process.env.REACT_APP_CHAIN_ID;
	const gamePlayAddress = process.env.REACT_APP_GAME_PLAY_CONTRACT ?? '';

	const gemMarketAddress = process.env.REACT_APP_GEM_NFT_MARKET_CONTRACT ?? '';

	const gemMarketContract = useGemrMarketContract(gemMarketAddress);

	const gamePlayContract = useGamePlayContract(gamePlayAddress);

	const [loading, setLoading] = useState(false);

	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);
	const { chainId, account, library } = useActiveWeb3React();
	const [dataProfile, setDataProfile] = useState<any>([]);
	const [classTab, setClassTabs] = useState('');
	const [loadingCancel, setLoadingCancel] = useState(false);
	const [loadingUnlock, setLoadingUnlock] = useState(false);

	const [totalRow, setTotalRow] = useState(0);

	const paramReset = {
		gameItemTypeList: ['ITEM'],
		ownerAddress: account,
		statusList: ['OWNER'],
		page: 0,
		size: 100
	};
	const [param, setParam] = useState(paramReset);

	const onChange_Pagi = (pageNumber) => {
		setParam({
			...param,
			page: pageNumber - 1
		});
	};

	const { showNoti } = useWrap();

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
	const getDataAsset = async (type, account) => {
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

	useEffect(() => {
		if (account && classTab) {
			switch (classTab) {
				case 'item':
					getDataAsset('OWNER', account);
					break;
				case 'selling-item':
					getDataAsset('SELLING', account);
					break;
				case 'item-in-game':
					getDataAsset('IN_GAME', account);
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
	}, [classTab]);

	useEffect(() => {
		if (typeProfile) {
			setClassTabs(typeProfile);
		} else {
			setClassTabs('item');
		}
	}, [typeProfile]);
	const onUnload = (event) => {
		event.preventDefault();
		return (event.returnValue = 'Are you sure you want to exit?');
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
			setLoadingUnlock(true);

			await unlockNFT1155FromGame(gamePlayContract, item)
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
												nftId: item.nftId.toString(),
												id: item.id
											};
											MyBoxApi.nftToMarket(payload, item.id, tokenID).finally(() => {
												history.push('/profile/my-asset?asset');
											});
										}
									} else {
										showNoti('warning', 'Unlock Failed');
										if (account && tokenID) {
											getDataAsset('IN_GAME', account);
										}
									}
									setLoadingUnlock(false);
									window.removeEventListener('beforeunload', onUnload);
								}
							})();
						}, 1000);
					}
				})
				.catch((error) => {
					console.log(error);
					setLoadingUnlock(false);
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
			window.removeEventListener('beforeunload', onUnload);
			console.log(error);
			if (error.data) {
				showNoti('error', error.data.message);
			}
		}
	};

	const onCancelSelling = async (item) => {
		if (chainId != envChainId) {
			showNoti('warning', 'Wrong Network!');
			return;
		}
		window.addEventListener('beforeunload', onUnload);
		try {
			if (loadingCancel || !account || !item) {
				return;
			}
			setLoadingCancel(true);
			await cancelSellGemItem(gemMarketContract, item.saleId)
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
											window.removeEventListener('beforeunload', onUnload);
											showNoti('success', 'Cancel Successfully');
											countNoti++;
											const dataCancel = {
												hash: txn.hash,
												ownerAddress: account,
												sellId: item.saleId,
												gameItemType: 'ITEM'
											};
											MyBoxApi.cancelMyAsset(dataCancel, tokenID).finally(() => {
												displayTabs('item');
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
					window.removeEventListener('beforeunload', onUnload);
					console.log(error);
					setLoadingCancel(false);
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
			window.removeEventListener('beforeunload', onUnload);
			console.log(error);
			setLoadingCancel(false);
		}
	};

	const BoxContent = (props) => {
		const { type } = props;
		return (
			<>
				<div className="content-page-assets">
					{/* ... */}
					<div className={`${type === 'selling-item' ? '' : 'lst-item'}`}>
						{dataProfile?.length > 0 ? (
							dataProfile.map((item, index) => (
								<div className="_item-list-item">
									<div className="_asset-item">
										<div className="asset-id">#{item.nftId}</div>
										<div className="asset-quantity">x{item.quantity}</div>
										<div className="asset-image-items">
											<img src={item.nftImage == null || item.nftImage == '' ? NoneImg : item.nftImage} />
											<div className="mk-box-name">
												<span>Provided by</span>
												<span className="provider">LegendOfGalaxy</span>
											</div>
										</div>
										<div className="asset-name">
											<div className="btn-action">
												<div className="name-item-asset">{item.name}</div>
												<div className="gr-action">
													{type === 'selling-item' && (
														<button
															className="btn-gold-claim font-normal"
															onClick={() => {
																onCancelSelling(item);
															}}
														>
															<span>Cancel</span>
														</button>
													)}
													{type === 'item-in-game' && (
														<button
															className="btn-gold-claim font-normal"
															onClick={(event) =>
																(window.location.href = `/my-assets/item/unlock/${item.id}`)
															}
														>
															<span>Unlock</span>
														</button>
													)}
													{type === 'my-item' && (
														<button
															className="btn-gold-claim font-normal"
															onClick={(event) =>
																(window.location.href = `/my-assets/item/detail/${item.gameItemNftId}`)
															}
														>
															<span>Detail</span>
														</button>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<>
								{type === 'selling-item' ? (
									<NoneData text={'No Selling Data'} />
								) : (
									<>
										{[{}, {}, {}, {}, {}, {}].map((it, index) => (
											<div className="_item-list-item">
												<div className="_asset-item">
													<div className="asset-id">#123</div>
													<div className="asset-quantity">x1</div>
													<div className="asset-image-items">
														<img src={require('../../../public/images/Marketplace/stun/stone.png').default} />
														<div className="mk-box-name">
															<span>Provided by</span>
															<span className="provider">LegendOfGalaxy</span>
														</div>
													</div>
													<div className="asset-name">
														<div className="btn-action">
															<div className="name-item-asset">TBA</div>
															<div className="gr-action">
																{type === 'item-in-game' ? (
																	<button
																		className="btn-gold-claim font-normal"
																		onClick={(event) =>
																			(window.location.href = `/my-assets/item/unlock/2`)
																		}
																	>
																		<span>Unlock</span>
																	</button>
																) : (
																	<button
																		className="btn-gold-claim font-normal"
																		onClick={(event) =>
																			(window.location.href = `/my-assets/item/detail/2`)
																		}
																	>
																		<span>Detail</span>
																	</button>
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</>
								)}
							</>
						)}
					</div>
				</div>
			</>
		);
	};

	const returnContentTab = () => {
		switch (classTab) {
			case 'item':
				return <BoxContent type="my-item" />;
				break;
			case 'selling-item':
				return <BoxContent type="selling-item" />;
				break;
			case 'item-in-game':
				return <BoxContent type="item-in-game" />;
				break;
			default:
				break;
		}
	};

	return (
		<Layout className="asset-block">
			<Header className="asset-type-status" style={{ padding: 0 }}>
				<div className="tab-asset-sale">
					<button type="button" className={classTab == 'item' ? 'active' : ''} onClick={() => displayTabs('item')}>
						My item
					</button>
					<button
						type="button"
						className={classTab == 'selling-item' ? 'active' : ''}
						onClick={() => displayTabs('selling-item')}
					>
						Selling item
					</button>
					<button
						type="button"
						className={classTab == 'item-in-game' ? 'active' : ''}
						onClick={() => displayTabs('item-in-game')}
					>
						Item In Game
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
							<Col className="gutter-row" xs={24} xl={24} md={24} sm={24}>
								<div className="asset-grid">{returnContentTab()}</div>
								{totalRow > 100 && (
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
			{(loadingUnlock || loadingCancel) && <LoadingFull />}
		</Layout>
	);
};

export default MyItem;
