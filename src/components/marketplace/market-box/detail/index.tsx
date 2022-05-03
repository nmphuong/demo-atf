import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import { useActiveWeb3React } from 'hooks';

import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import HeaderMobile from 'components/common/menu-sidebar-top';
import { MyBoxApi } from 'config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';

import LoadingFull from 'components/loading-full';
import HeaderPage from 'components/common/header-page';
import web3 from 'web3';
import './mybox.css';

const { Content } = Layout;
declare const window: Window & typeof globalThis & { ethereum: any };

const MarketBoxDetail = () => {
	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';

	const [quantityBuy, setQuantityBuy] = useState(1);
	let { id }: { id: string } = useParams();
	let history = useHistory();
	const [loadingDetail, setLoadingDetail] = useState(false);
	const { showNoti, tokenID } = useWrap();
	const { chainId, account } = useActiveWeb3React();
	const [boxInfo, setBoxInfo] = useState<IListItemProfile>();
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [priceBox, setPriceBox] = useState(0);
	const location = useLocation();

	const [totalBox, setTotalBox] = useState(0);

	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);

	const onChangeQuantity = (e: any) => {
		setQuantityBuy(parseInt(e.target.value));
		setTotal(parseInt(e.target.value) * boxInfo?.boxPrice || 0);
	};

	const getBox = async () => {
		setLoadingDetail(true);

		let res: any = null;
		try {
			res = await MyBoxApi.getBoxDetailClient(id, account, '');
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
	let classBg = 'detail-img detail-img-box ' + typeBg;
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
							<div className="detail-box">
								<div className="back">
									<Link to="/marketplace">
										<ArrowLeftOutlined /> Back{' '}
									</Link>
								</div>
								<div className="detail-block">
									<div className="detail-box-content">
										<div className="detail-left">
											<div className={classBg}>
												<div className="box-total-text mt-20 mb-20">
													{boxInfo?.boxNftId ? boxInfo?.boxNftId : 'TBA'}
												</div>
												<div className="img-box-detail">
													<img
														className="animation-css-scale"
														src={
															boxInfo?.boxImage
																? boxInfo?.boxImage
																: require(`../../../../public/images/Marketplace/box/Conqueror-Box.png`)
																		.default
														}
													/>
												</div>
											</div>
											<div className="detail-info">
												<div className="_detail-info">
													<p>Address Contract:</p>
													<p>a1234...515f61</p>
												</div>
												<div className="_detail-info">
													<p>ID: </p>
													<p>123</p>
												</div>
												<div className="_detail-info">
													<p>Creator’s Address: </p>
													<p>a1234...515f61</p>
												</div>
												<div className="_detail-info">
													<p>Owner’s Address: </p>
													<p>
														{boxInfo?.ownerAddress.substring(0, 5)}...
														{boxInfo?.ownerAddress.substring(boxInfo?.ownerAddress.length - 5)}
													</p>
												</div>
											</div>
										</div>
										<div className="detail-right">
											<div className="detail-info">
												<div className={classTitle}>
													<span>{boxInfo?.boxName ? boxInfo?.boxName : 'Conqueror Box'}</span>
												</div>
												<p>Description</p>
												<div className="detail-des">
													{boxInfo?.description
														? boxInfo?.description
														: 'High chance of getting an SSR Rarity Hero Card.'}
												</div>
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
															<span>50%</span>
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
															<span>30%</span>
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
															<span>14%</span>
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
															<span>4%</span>
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
															<span>2%</span>
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
															<span>0%</span>
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
															<span>0%</span>
														</li>
													</ul>
												</div>
											</div>
											<div className="detail-info">
												<p className="detail-box-name">Amount</p>
												<div className="detail-des-input">
													<input
														className="input-quantity-box"
														type="number"
														value={quantityBuy}
														onChange={(e) => onChangeQuantity(e)}
														name="quantity"
														disabled={!account}
													/>
													<img
														className="icon-box-detail icon-box-detail-input"
														src={
															require('../../../../public/images/Marketplace/header/icon-box-gold.webp')
																.default
														}
													/>
												</div>
												<div className="detail-des-input">
													<Row className="mt-10" gutter={{ sm: 16, md: 16, lg: 32 }}>
														{priceBox === 0 ? (
															<Col className="gutter-row" xs={24} xl={24} md={24} sm={24}>
																<div className="tba">TBA</div>
															</Col>
														) : (
															<>
																<Col className="gutter-row" xs={24} xl={12} md={12} sm={12}>
																	<div className="detail-box-name">
																		<span className="detail-box-info-pr">Price</span> :{' '}
																		<div className="price-info">
																			<img src="../../../images/icon-price.png" /> {priceBox}
																		</div>
																	</div>
																</Col>
																<Col className="gutter-row" xs={24} xl={12} md={12} sm={12}>
																	<div className="detail-box-name text-right">
																		<span className="detail-box-info-pr">Total</span> :{' '}
																		<div className="price-info">
																			<img src="../../../images/icon-price.png" /> {total}
																		</div>
																	</div>
																</Col>
															</>
														)}
													</Row>
													<div className="btn-gold-div">
														<Button htmlType="button" className="btn-gold btn-witdh">
															BUY NOW
														</Button>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="history-table"></div>
								</div>
							</div>
						</div>
					</div>
				</Row>

				{loadingDetail || (loading && <LoadingFull />)}
			</Content>
		</>
	);
};

export default MarketBoxDetail;
