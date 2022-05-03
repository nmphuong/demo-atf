import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import HeaderMobile from 'components/common/menu-sidebar-top';
import HeaderPage from 'components/common/header-page';
import './style.css';
import FooterIndex from 'components/Footer';
import ProfileMenu from './profile-menu';
import DepositGae from './deposit-gae';
import Withdraw from './withdraw';
import Deposit from './Deposit';
const { Content } = Layout;
const MyProfile = () => {
    const location = useLocation();

    const ContentPage = (typePage) => {
        let content;
        if (typePage == '/my-profile/deposit') {
            content = <DepositGae />;
        } else {
            content = <Withdraw />;
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
                            <ProfileMenu />
                            {ContentPage(location.pathname)}

                        </div>
                    </div>
                </Row>
                <FooterIndex />
            </Content>
        </>
    );
}

export default MyProfile