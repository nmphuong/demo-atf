import { faBox, faHouseUser, faStore, faUser, faRetweet, faThLarge, faFunnelDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button, Menu, Modal } from 'antd';
import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, DollarCircleOutlined, EllipsisOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import './header.css';
import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import tokenAbi from '../../../config/abi/tokenAbi.json';
import { useActiveWeb3React } from 'hooks';
import web3 from 'web3';
import SidebarHome from 'components/home/SidebarHome';
import SidebarHomeMobile from 'components/home/SidebarHome/Mobile';

declare const window: Window & typeof globalThis & { ethereum: any };
const HeaderHome = () => {
	const tokenAddress = process.env.REACT_APP_ATF_CONTRACT ?? '';
	const { account } = useActiveWeb3React();
	const location = useLocation();

	let defaultMenu;
	switch (location.pathname) {
		case '/':
			defaultMenu = 'home';
			break;

		case '/marketplace':
		case '/marketplace-asset':
			defaultMenu = 'marketplace';
			break;
		case '/mystery-box':
			defaultMenu = 'graveyard';
			break;

		case '/profile':
			defaultMenu = 'profile';
			break;
		case '/profile/my-box':
			defaultMenu = 'profile';
			break;
		case '/profile/my-asset':
			defaultMenu = 'profile';
			break;
		case '/profile/craft-nft-request':
			defaultMenu = 'profile';
			break;
		case '/profile/mint-nft-request':
			defaultMenu = 'profile';
			break;
		case '/profile/account-balance':
			defaultMenu = 'profile';
			break;
		case '/profile/deposit':
			defaultMenu = 'profile';
			break;
		case '/profile/login-game':
			defaultMenu = 'profile';
			break;
		case '/profile/references':
			defaultMenu = 'profile';
			break;
		case '/box/detail':
			defaultMenu = 'profile';
			break;
		case '/item/detail':
			defaultMenu = 'profile';
			break;
		case '/claim':
			defaultMenu = 'claim';
			break;
		default:
			defaultMenu = 'home';
	}
	const [current, setCurrent] = useState(defaultMenu);
	const [zwzBalance, setZwzBalance] = useState(0);

	async function zwzBalanceFc() {
		if (typeof window.ethereum !== 'undefined') {
			if (account) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const contract = new ethers.Contract(tokenAddress, tokenAbi, provider);
				const tokenBalance = await contract.balanceOf(account);
				return tokenBalance.toString();
			} else {
				return 0;
			}
		}
	}
	useEffect(() => {
		if (account) {
			zwzBalanceFc()
				.then((val) => {
					if (val > 0) {
						let _balance: any = web3.utils.fromWei(web3.utils.toBN(val), 'ether');
						let zwzBl = Math.round(parseFloat(_balance) * 10000) / 10000;
						setZwzBalance(zwzBl);
					} else {
						setZwzBalance(0);
					}
				})
				.catch((e) => { });
		}
	}, [account]);
	const activeMenu = (e: { key: React.SetStateAction<string> }) => {
		if (e.key === 'logo') {
			setCurrent('home');
			return;
		}
		setCurrent(e.key);
	};

	const [isActive, setActive] = useState(false);
	const handleToggle = () => {
		setActive(!isActive);
	};

	const handleHideMenu = () => {
		setActive(false);
	};


	const { SubMenu } = Menu;

	return (
		<>
			<SidebarHome />
			<SidebarHomeMobile />
		</>
	);
};

export default HeaderHome;
