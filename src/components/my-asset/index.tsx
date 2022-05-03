import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import HeaderMobile from 'components/common/menu-sidebar-top';
import HeaderPage from 'components/common/header-page';
import MyHero from './my-hero';
import MyItem from './my-item';
import MyBox from './my-box';
import AssetMenu from './asset-menu';
import './style.css';
import FooterIndex from 'components/Footer';
import CominSoon from 'components/cominsoon';
const { Content } = Layout;
const MyAsset = () => {

    const location = useLocation();

    const ContentPage = (typePage) => {
        console.log(typePage);
        let content;
        if (typePage == '/my-assets/hero') {
            content = <MyHero />;
        }
        else if (typePage == '/my-assets/hero?hero') {
            content = <MyHero />;
        } else if (typePage == '/my-assets/item') {
            content = <MyItem />;
        } else {
            content = <MyBox />;
        }
        return content;
    }


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
                        <div className="page-content">
                            {
                                        <>
                                            <AssetMenu />
                                            {ContentPage(location.pathname)}
                                        </>
                            }
                        </div>
                    </div>
                </Row>
                <FooterIndex />
            </Content>
        </>
    );
}

export default MyAsset
