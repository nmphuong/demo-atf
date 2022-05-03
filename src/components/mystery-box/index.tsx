import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Button, Empty } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import './box.css';
import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import HeaderMobile from 'components/common/menu-sidebar-top'
import { MyBoxApi } from 'config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';
import { useActiveWeb3React } from 'hooks';
import HeaderPage from 'components/common/header-page';
import NoneData from 'components/element/NoneData';
import FooterIndex from 'components/Footer';



const { Content } = Layout;


const MysteryBox = () => {

	const { account } = useActiveWeb3React();
	const { showNoti } = useWrap();
	// const [stateBox, actionsBox] = useHookBox();
	const [isBuyVisible, setIsBuyVisible] = useState<boolean>(false);
	const [dataBox, setDataBox] = useState(undefined || []);

	const getMysteryBox = () => {
		MyBoxApi.getMysteryBox().then((res) => {
			if (res.status === 200) {
				if (res.data) {
					setDataBox(res.data);
				}
			}
		});
	};

	useEffect(() => {
		getMysteryBox();
	}, []);

	const handleCancel = () => {
		setIsBuyVisible(false);
	};
	const showPopupConfirm = (item) => {
		console.log(item)
		setIsBuyVisible(true);
	}
	const onBuyBox = () => {
		setIsBuyVisible(false);
	}
	const BoxItems = () => {
		return (
			<>
				{dataBox.length > 0 ? (
					<>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							{dataBox.map((item: any, key) => {
								let typeBg = 'bg-special';
								let typeTitle = 'text-special';
								let classBg = 'box-item ' + typeBg;
								let classTitle = 'box-name ' + typeTitle;

								return (
									<>
										{item.boxType == "SPECIAL" && (
											<Col className="gutter-row special-box" xs={24} xl={8} md={8} sm={8} key={'box' + key}>
												<div className={classBg}>
													<div className={classTitle}><span>{item.boxName}</span></div>
													<div className="box-image img-special animation-css-scale">
														<img src={item.boxImage} />
													</div>
													<div className="box-total-text-msb">Total box available</div>
													<div className="box-total-quantity">{item.quantity}</div>
													<div className="box-line"><img src="../images/sidebar-line.png" /></div>
													<div className="box-price"><img src="../images/icon-price.png" /> {item.boxPrice} <span>(per box)</span> </div>
												</div>
												<div className="btn-gold-div">
													<Button htmlType="button" className="btn-gold-claim btn-box-mystery"
														onClick={(event) => (window.location.href = `/mystery-box/detail/${item.id}`)}
													>
														Detail
													</Button>
												</div>
											</Col>
										)}
									</>
								);
							})}
						</Row>
						<div className='mystery-box-cus'>
							{dataBox.map((item: any, key) => {
								let typeBg = 'bg-wool';
								let typeTitle = 'text-wool';
								if (item.boxType == "CONQUEROR") {
									typeBg = 'bg-gold';
									typeTitle = 'text-gold';
								} else if (item.boxType == "EXPLORER") {
									typeBg = 'bg-silver';
									typeTitle = 'text-silver';
								} else if (item.boxType == "SPECIAL") {
									typeBg = 'bg-silver';
									typeTitle = 'text-silver';
								}
								let classBg = 'box-item ' + typeBg;
								let classTitle = 'box-name ' + typeTitle;

								return (
									<>
										{item.boxType != 'SPECIAL' && item.boxType != 'REF' && (
											<div className="box-item-mystery" key={'box' + key}>
												<div className={classBg}>
													<div className={classTitle}><span>{item.boxName}</span></div>
													<div className="box-image animation-css-scale">
														<img src={item.boxImage} />
													</div>
													{/* <div className="box-total-text">Total box available</div> */}
													{/* <div className="box-total-quantity">TBA</div> */}
													{/* <div className="box-total-quantity">{item.quantity}</div> */}
													{/* <div className="box-line"><img src="../images/sidebar-line.png" /></div> */}
													<div className="box-price"><img className='icon-price-gae-token' src={require('../../public/images/Marketplace/header/gae-token.webp').default} /> {item.boxPrice} <span>(per box)</span> </div>
												</div>
												<div className="btn-gold-div">
													<Button htmlType="button" className="btn-gold-claim btn-box-mystery"
														onClick={(event) => (window.location.href = `/mystery-box/detail/${item.id}`)}
													>
														Detail
													</Button>
												</div>
											</div>
										)}
									</>
								);
							})}
						</div>
					</>
				) : (
					<NoneData text="No data" />
				)}
			</>

		);
	};


	return (
		<>
		<HeaderMobile />
		<HeaderPage />
		<Content className="page-container">

			<Row>
				<div className='sider-bar'>
					<div className="menu-sidebar">
						<MenuSidebar />
					</div>
				</div>
				<div className='page-main cusIconPlaned'>
					<div className="page-content">
						<div className="mystery-box">
						<div className="background-top-msb"></div>
							{/* <div className="title-mystery-box"><img src="../images/title-mystery-box.png" /></div> */}
							{
								!account ? (
									<div className="asset-content" style={{ padding: 0, minHeight: 360 }}>
										<div className="wallet-content-connect">
											<h3>NOTHING HERE YET...</h3>
											<div className="pls-connect-text">Please connect your wallet to activate this page</div>
											<div className="btn-connect-wl">
												<ConnectWallet />
											</div>
										</div>
									</div>)
									: (
										<BoxItems />
									)
							}
							<div className="background-bottom-msb"></div>
						</div>
					</div>
				</div>
			</Row>
			<FooterIndex />
			<Modal
				title={<div className="text-md connect-wallet-title">BUY BOX</div>}
				visible={isBuyVisible}
				className="buy-box-popup"
			>
				<div className="noti-out">
					<p className="noti-out-text">Confirm Buy Box?</p>
					<div className="noti-out-button">
						<Button className="btn-gold" onClick={onBuyBox}> Confirm </Button>
						<Button className="btn-gold" onClick={handleCancel}> Cancel </Button>
					</div>
				</div>
			</Modal>
		</Content>
		</>
	);
}

export default MysteryBox
