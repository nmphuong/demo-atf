import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import HeaderMobile from 'components/common/menu-sidebar-top';
import CominSoon from 'components/cominsoon';
import HeaderPage from 'components/common/header-page';
import MarketHero from './market-hero';
import MarketItem from './market-item';
import MarketBox from './market-box';
import AssetMenu from './asset-menu';
import './style.css';
import FooterIndex from 'components/Footer';
const { Content } = Layout;
const Marketplace = () => {

    const location = useLocation();

    const ContentPage = (typePage) => {
        let content;
        if (typePage == '/marketplace/hero') {
            content = <MarketHero />;
        }
        else if (typePage == '/marketplace/item') {
            content = <MarketItem />;
        } else {
            content = <MarketBox />;
        }
        return content;
    }

    return (
        <>
            <HeaderMobile />
            <HeaderPage />
            <Content className="page-container cus-page-main">
                <Row>
                    <Col className="gutter-row" xs={24} xl={4} md={4} sm={4}>
                        <div className="menu-sidebar">
                            <MenuSidebar />
                        </div>
                    </Col>
                    <div className='page-main'>
                        <div className="page-content">
                            <div className="marketplace-title">
                                <img src="../../../images/marketplace-title.svg" />
                            </div>
                            <AssetMenu />
                            {ContentPage(location.pathname)}

                        </div>
                    </div>
                </Row>
                <FooterIndex />
            </Content>
        </>
    );
}

export default Marketplace