import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Pagination, Modal, Form, Popover, Button, Spin, Tooltip } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
// import '../style.css';
import { isMobile } from 'react-device-detect';
import { useActiveWeb3React, useConnectWallet } from 'hooks';
import web3 from 'web3';
import { MyBoxApi } from '../../../config/api/myBoxApi';
import NoneImg from '../../../public/images/none-img.png';
import { useWrap } from 'context/WrapperContext';

import CominSoon from 'components/cominsoon';
import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import { getBoxBalanceOfBatch } from '../../my-profile/game-utils';
import { useCampaignContract, useMysteryBoxContract } from '../../../hooks/useContract';
import { claimRefBox } from 'utils/utils';
import LoadingFull from '../../loading-full';
import NoneData from 'components/element/NoneData';

const { Header, Content } = Layout;

interface Col {
	classDefault: string;
}

declare const window: Window & typeof globalThis & { ethereum: any };

const MyBox = () => {
	let tokenID = window.localStorage.getItem('tokenId');
	const { showNoti } = useWrap();
	const history = useHistory();
	const typeProfile = history.location.search.replace('?', '');

	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
	const envChainId = process.env.REACT_APP_CHAIN_ID;
	const boxContractAddress = process.env.REACT_APP_BOX_CONTRACT ?? '';

	const campaignContractAddress = process.env.REACT_APP_CAMPAIGN_CONTRACT ?? '';
	const campaignContract = useCampaignContract(campaignContractAddress);

	const boxContract = useMysteryBoxContract(boxContractAddress);

	const [loading, setLoading] = useState(false);

	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);
	const { chainId, account, library } = useActiveWeb3React();
	const [dataProfile, setDataProfile] = useState<any>([]);
	const [classTab, setClassTabs] = useState('');

	const [totalRow, setTotalRow] = useState(0);
	const paramReset = {
		ownerAddress: account,
		statusList: ['OWNER'],
		size: 100,
		page: 0
	};
	const [param, setParam] = useState(paramReset);

	const col: Col = {
		classDefault: ''
	};
	const wS = window.screen.width;
	if (!isMobile) {
		if (wS > 1400) {
			col.classDefault = 'col-20';
		}
	}

	const displayTabs = (action: string) => {
		// setClassTabs(action);
		history.push({
			pathname: '',
			search: action
		});
		// if (action == 'asset' || action == 'selling-asset') {
		// 	handleClear();
		// }
	};

	// GROUP ELEMENT
	const groupElement = (boxes, balanceMap) => {
		// handle group object
		const objArr = boxes.reduce(function (results, org) {
			(results[org.boxNftId] = results[org.boxNftId] || []).push(org);
			return results;
		}, []);

		console.log(objArr);

		// handle group array
		let groupArr: any = [];
		objArr.forEach((item, index) => {
			if (item.length > 0) {
				let claimedBoxIndex = -1;
				let notClaimedBoxIndex = -1;
				let notClaimQty = 0;
				for (let i = 0; i < item.length; i++) {
					if (item[i].claimBox) {
						claimedBoxIndex = i;
					} else {
						notClaimedBoxIndex = i;
						notClaimQty++;
					}
				}
				if (claimedBoxIndex >= 0 && balanceMap[item[claimedBoxIndex].boxNftId] > 0) {
					item[claimedBoxIndex].quantity = balanceMap[item[claimedBoxIndex].boxNftId];
					groupArr.push(item[claimedBoxIndex]);
				}
				if (notClaimedBoxIndex >= 0) {
					item[notClaimedBoxIndex].quantity = notClaimQty;
					groupArr.push(item[notClaimedBoxIndex]);
				}
			}
		});
		console.log(groupArr);
		return groupArr;
	};

	// GET DATA BOX
	const getDataBox = async (type, account) => {
		setLoading(true);
		const dataFilter = {
			...param,
			statusList: [type]
		};

		try {
			let res = await MyBoxApi.getDataBox(dataFilter, tokenID, account);
			setTotalRow(parseInt(res.headers['x-total-count']));
			if (res.status === 200) {
				if (res.data && res.data.length > 0) {
					// Check cancel balance
					if (type === 'SELLING') {
						// const saleIds = res.data.map((e) => parseInt(e.sellId));
						// const sellingBoxBalance = await getSellBoxListInfo(boxMarketContract, saleIds);
						// let listSellingBox: any = [];
						// res.data.forEach((item, index) => {
						//     if (parseInt(sellingBoxBalance[index].status) === 1) {
						//         listSellingBox.push({
						//             ...item,
						//             quantity: parseInt(sellingBoxBalance[index].quantity),
						//             numSold: parseInt(sellingBoxBalance[index].numSold),
						//             total: parseInt(sellingBoxBalance[index].quantity) + parseInt(sellingBoxBalance[index].numSold),
						//             status: parseInt(sellingBoxBalance[index].status),
						//             quoteToken: parseInt(sellingBoxBalance[index].quoteTokenKey),
						//             sellingPrice: web3.utils.fromWei(sellingBoxBalance[index].price.toString(), 'ether')
						//         });
						//     }
						// });
						// setDataProfile(listSellingBox);
					} else {
						const boxIds = res.data.map((e) => parseInt(e.boxNftId));

						const accounts = Array.from({ length: boxIds.length }).fill(account);

						const boxBalance = await getBoxBalanceOfBatch(boxContract, accounts, boxIds);

						const balanceMap = boxIds.reduce(function (result, field, index) {
							result[field] = parseInt(boxBalance[index]);
							// result[field] = 1;
							return result;
						}, {});
						var groupBox = groupElement(res.data, balanceMap);

						setDataProfile(groupBox);
					}
				} else {
					setDataProfile([]);
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
				case 'box':
					getDataBox('OWNER', account);
					break;
				case 'selling-box':
					getDataBox('SELLING', account);
					break;
				default:
					break;
			}
		}
	}, [account, classTab, param]);

	useEffect(() => {
		if (typeProfile) {
			setClassTabs(typeProfile);
		} else {
			setClassTabs('box');
		}
	}, [typeProfile]);

	const onUnload = (event) => {
		event.preventDefault();
		return (event.returnValue = 'Are you sure you want to exit?');
	};

	const handleClaimBox = async (item: any) => {
		try {
			if (chainId != envChainId) {
				showNoti('warning', 'Wrong Network!');
				return;
			}
			if (!account || !item || !item.boxNftId || !item.signClaimBox || !campaignContract) {
				return;
			}
			console.log(item.signClaimBox);

			setLoading(true);
			window.addEventListener('beforeunload', onUnload);
			await claimRefBox(campaignContract, item.id, parseInt(item.boxNftId), item.signClaimBox)
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
											showNoti('success', 'Claim Box Successfully');
											countNoti++;
											const data = {
												myBoxId: item.id,
												ownerAddress: account,
												hash: txn.hash
											};

											await MyBoxApi.claimBox(data, item.id, tokenID).finally(() => {
												getDataBox('OWNER', account);
											});
										}
									} else {
										showNoti('error', 'Claim Box Failed');
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
		} catch (error: any) {
			setLoading(false);
			console.log(error);
			window.removeEventListener('beforeunload', onUnload);
		}
	};


	// const initialValue = 0;
	// const sumWithInitial = dataProfile
	// 	.map((item) => item.quantity)
	// 	.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);

    //     console.log("......",sumWithInitial)

	const BoxContent = (props) => {
		const { type } = props;
		return (
			<>
				<div className="content-page-assets">
					{dataProfile?.length > 0 ? (
						<div className={type === 'selling-box' ? 'grid-1' : 'lst-item'}>
							{dataProfile.map((item, index) => (
								<div className="_item-list-item">
									<div className="asset-item">
										<div className="asset-id">#{item.boxNftId}</div>
										<div className="asset-quantity">x{item.quantity}</div>
										<div className="asset-image-item">
											<img src={item.boxImage == null || item.boxImage == '' ? NoneImg : item.boxImage} />
											<div className="mk-box-name">{item.boxName}</div>
										</div>
										<div className="asset-name">
											<div className="btn-action">
												<div className="gr-action">
													{!item.claimBox ? (
														<button
															className="btn-gold-claim font-normal"
															onClick={() => {
																handleClaimBox(item);
															}}
														>
															<span>Claim</span>
														</button>
													) : (
														<button
															className="btn-gold-claim font-normal"
															onClick={(event) =>
																(window.location.href = `/my-assets/box/detail/${item.id}?profile`)
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
						</div>
					) : (
						<>
							{type === 'selling-box' ? (
								<CominSoon />
							) : (
								<>
									{/* <NoneData text={'No Data'} /> */}

									{/* {[{}, {}, {}, {}, {}, {}].map((it, index) => (
                                            <div className="_item-list-item">
                                                <div className="asset-item">
                                                    <div className="asset-id">#123</div>
                                                    <div className="asset-quantity">x1</div>
                                                    <div className="asset-image-item">
                                                        <img src={require('../../../public/images/Marketplace/box/Conqueror-Box.png').default} />
                                                        <div className="mk-box-name">TBA</div>
                                                    </div>
                                                    <div className="asset-name">
                                                        <div className="btn-action">
                                                            <div className="gr-action">

                                                                <button className="btn-gold-claim font-normal" onClick={(event) => (window.location.href = `/my-assets/box/detail/2?profile`)}>
                                                                    <span>Detail</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}
									<NoneData text="No data" />
								</>
							)}
						</>
					)}
				</div>
			</>
		);
	};

	const returnContentTab = () => {
		switch (classTab) {
			case 'box':
				return <BoxContent type="my-box" />;
				break;
			case 'selling-box':
				return <BoxContent type="selling-box" />;
				break;
			default:
				break;
		}
	};

	return (
		<Layout className="asset-block">
			<Header className="asset-type-status" style={{ padding: 0 }}>
				<div className="header-myasset">
					{/*<Link className="claim-box-link-cus" to="/claim-box"><span>Claim Box</span></Link>*/}
					{/* <Link className="claim-box-link-cus" to="/claim-token"><span>Claim Token</span></Link> */}
				</div>
				<div className="tab-asset-sale">
					<button type="button" className={classTab == 'box' ? 'active' : ''} onClick={() => displayTabs('box')}>
						My box
					</button>
					<button type="button" className={classTab == 'selling-box' ? 'active' : ''} onClick={() => displayTabs('selling-box')}>
						Selling Box
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
							</Col>
						</Row>
					</div>
				)}
			</Content>
			{loading && <LoadingFull />}
		</Layout>
	);
};

export default MyBox;
