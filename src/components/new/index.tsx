import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Button, Empty } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import './new.css';
import HeaderMobile from 'components/common/menu-sidebar-top';
import CominSoon from 'components/cominsoon';
import HeaderPage from 'components/common/header-page';
import FooterIndex from 'components/Footer';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import LoadingInPage from 'components/loading-in-page';


const { Content } = Layout;


const New = () => {

	const [loading, setLoading] = useState(true)
	return (
		<>
			<HeaderMobile />
			<HeaderPage />
			<Content className="page-container cusIconPlaned">
				<Row>
					<Col className="gutter-row" xs={24} xl={4} md={4} sm={4}>
						<div className="menu-sidebar">
							<MenuSidebar />
						</div>
					</Col>
					<div className='page-main'>
						<div className="page-content new" style={{ minHeight: `${loading === true ? 'auto' : '700px'}` }}>
							{/* <CominSoon /> */}
							<div className="twitter-contain">
								<div className="twitter">
									<TwitterTimelineEmbed
										onLoad={function noRefCheck() { setLoading(false) }}
										screenName="Legend_LFW"
										sourceType="profile"
										theme="dark"
									/>
									{
										loading
										? <LoadingInPage />
										: <></>
									}
								</div>
							</div>
						</div>
					</div>
				</Row>
				<FooterIndex />
			</Content>
		</>
	);
}

export default New
