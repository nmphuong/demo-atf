import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Button, Empty } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import './shop.css';
import HeaderMobile from 'components/common/menu-sidebar-top';
import CominSoon from 'components/cominsoon';
import HeaderPage from 'components/common/header-page';
import FooterIndex from 'components/Footer';

const { Content } = Layout;


const Shop = () => {
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
					<div className='page-main'>
						<div className="page-content">
							<CominSoon />
						</div>
					</div>
				</Row>
				<FooterIndex />
			</Content>
		</>
	);
}

export default Shop
