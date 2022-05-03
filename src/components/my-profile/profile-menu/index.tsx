import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';
import './style.css';
const ProfileMenu = () => {
    const location = useLocation();
    let defaultMenu;
    switch (location.pathname) {
        case '/my-profile/deposit':
            defaultMenu = 'deposit';
            break;
        case '/my-profile/withdraw':
            defaultMenu = 'withdraw';
            break;
        default:
            defaultMenu = 'withdraw';
    }
    const [current, setCurrent] = useState(defaultMenu);
    const activeMenu = (e: { key: React.SetStateAction<string> }) => {
        setCurrent(e.key);
    };

    useEffect(() => {
        setCurrent(defaultMenu)
    }, [defaultMenu])

    return (
        <div className="profile-menu">
            <Menu mode="horizontal" onClick={activeMenu} selectedKeys={[current]} className="profile-menu-list">
                <Menu.Item key="withdraw"><Link to="/my-profile/withdraw">Withdraw</Link></Menu.Item>
                <Menu.Item key="deposit"><Link to="/my-profile/deposit">Deposit</Link></Menu.Item>
            </Menu>
            <div className="asset-img">
                <img src="../../../images/line-menu-asset.png" />
            </div>

        </div>
    );
}

export default ProfileMenu