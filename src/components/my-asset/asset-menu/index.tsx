import React, { useState, useEffect, useCallback } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';
import './style.css';
const AssetMenu = () => {
    const location = useLocation();
    let defaultMenu;
    switch (location.pathname) {
        case '/my-assets/hero':
            defaultMenu = 'hero';
            break;
        case '/my-assets/item':
            defaultMenu = 'item';
            break;
        default:
            defaultMenu = 'box';
    }
    const [current, setCurrent] = useState(defaultMenu);
    const activeMenu = (e: { key: React.SetStateAction<string> }) => {
        setCurrent(e.key);
    };

    useEffect(() => {
        setCurrent(defaultMenu)
    }, [defaultMenu])

    return (
        <div className="asset-menu">
            <Menu mode="horizontal" onClick={activeMenu} selectedKeys={[current]} className="asset-menu-list">
                <Menu.Item key="box"><Link to="/my-assets/box"><img src={require('../../../public/images/Marketplace/header/icon-box-gold.webp').default} /> Box</Link></Menu.Item>
                <Menu.Item key="hero"><Link to="/my-assets/hero"><img src={require('../../../public/images/Marketplace/header/character.webp').default} /> Hero</Link></Menu.Item>
                <Menu.Item disabled key="item"><Link to="/my-assets/item"><img src={require('../../../public/images/Marketplace/header/stun-lv5.webp').default} /> Item</Link></Menu.Item>
            </Menu>
            <div className="asset-img">
                <img src="../../../images/line-menu-asset.png" />
            </div>

        </div>
    );
}

export default AssetMenu