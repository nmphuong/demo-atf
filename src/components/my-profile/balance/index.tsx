import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Pagination, Modal, Form, Popover, Button, Spin, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useActiveWeb3React } from 'hooks';
import './style.css';
import web3 from 'web3';
import { isMobile } from 'react-device-detect';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useWrap } from 'context/WrapperContext';
import { useGAEContract, useGEMContract } from '../../../hooks/useContract';

declare const window: Window & typeof globalThis & { ethereum: any };
const Balance = () => {
	const gemTokenAddress = process.env.REACT_APP_GEM_CONTRACT ?? '';
	const gaeTokenAddress = process.env.REACT_APP_GAE_CONTRACT ?? '';

	const gaeTokenContract = useGAEContract(gaeTokenAddress);

	const { account } = useActiveWeb3React();
	const [gaeBalance, setGaeBalance] = useState(0);

	const { showNoti } = useWrap();

	async function getGAEBalance() {
		if (typeof window.ethereum !== 'undefined') {
			if (account && gaeTokenContract) {
				const gaeTokenBalance = await gaeTokenContract.balanceOf(account);
				let _balanceBrain: any = web3.utils.fromWei(web3.utils.toBN(gaeTokenBalance.toString()), 'ether');
				let brainBl = Math.round(parseFloat(_balanceBrain) * 10000) / 10000;
				setGaeBalance(brainBl);
			}
		}
	}

	useEffect(() => {
		getGAEBalance();
	}, [account]);
	let accountStr;
	if (account) {
		if (isMobile) {
			accountStr = `${account?.substring(0, 6)}...${account?.substring(account.length - 6)}`;
		} else {
			accountStr = account;
		}
	} else {
		accountStr = 'Connect Wallet';
	}
	let accountCopy: any = account;
	const onCopy = () => {
		showNoti('success', 'Copied');
	};

	return (
		<div className="balance-profile">
			<div className="my-address">
				{!account ? (
					<div>Please Connect Wallet !!!</div>
				) : (
					<>
						<span>{`${accountStr.substring(0, 12)}...${accountStr.substring(accountStr.length - 12, accountStr.length)}`}</span>
						<CopyToClipboard onCopy={onCopy} text={accountCopy}>
							<CopyOutlined />
						</CopyToClipboard>
					</>
				)}
			</div>
			<div className="my-token">
				<Row gutter={16}>
					<Col className="gutter-row" xs={24} xl={24}>
						<div className="token-profile">
							<div className="token-profile-title">GAE</div>
							<div className="token-profile-quantity">{gaeBalance.toLocaleString()}</div>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Balance;
