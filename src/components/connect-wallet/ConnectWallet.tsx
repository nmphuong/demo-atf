import React, { useEffect, useState } from 'react';
import { Button, Menu, Modal } from 'antd';
import { useConnectWallet, useActiveWeb3React } from 'hooks';
import { NEED_A_PLACEHOLDER, WALLET_LIST } from 'constants/index';
import WalletItem from 'components/connect-wallet/WalletItem';
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import './wallet.css';
import { useWrap } from 'context/WrapperContext';
import Copy from 'components/Copy';

declare const window: Window & typeof globalThis & { ethereum: any };

const ConnectWallet = (props) => {
	const { textBtn } = props;
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const { walletLogin, walletLogout } = useConnectWallet();
	const { tokenID } = useWrap();
	const walletItemClass = 'w-1/3 flex-auto mb-0.5 p-0.5 last:bg-transparent';
	const chainId = process.env.REACT_APP_CHAIN_ID ?? '0';
	const { account } = useActiveWeb3React();

	const context = useWeb3React();
	const { activate, deactivate, active, error } = context;

	if (window.ethereum) {
		window.ethereum.on('chainChanged', (chainId) => {
			window.location.reload();
		});

		window.ethereum.on('accountsChanged', (chainId: string) => {
			window.location.reload();
		});
	}

	// --- ACTION IN MODAL ---
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	//  --- Return address wallet with substring ---
	const accountEllipsis = active ? `${account?.substring(0, 4)}...${account?.substring(account.length - 4)}` : 'Connect Wallet';

	// ---- HANDLE DISCONNECT ----
	const handleDisconnect = () => {
		walletLogout();
		setIsModalVisible(false);
	};

	// ---- HANDLE CONNECT ----
	const handleConnect = async (connectorId: string) => {
		try {
			const rs = await walletLogin(connectorId);
			setIsModalVisible(false);
		} catch (e) {
			console.error('Login failed');
		}
	};

	const changeNetwork = async (chainId) => {
		try {
			window.localStorage.removeItem('refCode');
			await window.ethereum.enable();
			// check if the chain to connect to is installed

			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chainId }] // chainId must be in hexadecimal numbers
			});
		} catch (error) {
			// This error code indicates that the chain has not been added to MetaMask
			// if it is not, then install it into the user MetaMask
			//@ts-ignore
			if (error.code === 4902) {
				try {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [{ chainId: chainId, rpcUrl: process.env.REACT_APP_BSC_NETWORK_URL ?? '' /* ... */ }]
					});
				} catch (addError) {
					// handle "add" error
				}
			}
			console.error(error);
		}
	};



	useEffect(() => {
		if (account) {
			if (window.ethereum) {
				if (chainId != window.ethereum.networkVersion) {
					changeNetwork(`0x${parseInt(chainId).toString(16)}`);
				}
			}
		}
	}, [account]);

	return (
		<>
			<Button className="btn-gold mt-10-plus" onClick={showModal}>
				{textBtn ? textBtn : accountEllipsis}
			</Button>
			<Modal
				title={<div className="text-md connect-wallet-title">{!account ? 'Connect Wallet' : 'Your Wallet'}</div>}
				visible={isModalVisible}
				// onOk={handleOk}
				footer={null}
				onCancel={handleCancel}
				className="connect-wallet "
			>
				{!active ? (
					<div className="wallet-content">
						{WALLET_LIST.map((wallet) => {
							return (
								<WalletItem
									className={`wallet-item`}
									key={wallet.title}
									onClick={() => handleConnect(wallet.connectorId)}
									icon={<wallet.icon width="48px" />}
									title={wallet.title}
								/>
							);
						})}
						{NEED_A_PLACEHOLDER && <div className={walletItemClass} />}
					</div>
				) : (
					<div className="wallet-content-account">
						<div className="wallet-button">
							<img src={require('../../public/images/Marketplace/header/gae-token.webp').default} alt="logo" className="gae-token" />
							<p className="gae-balance">0.00</p>
							<p className="gae-name">GAE Token</p>
							<p className='wallet-account-address'>{`${account?.substring(0, 11)}...${account?.substring(account.length - 12, account.length)}`}</p>
							<div className="wallet-account">
								<a className='link-address' href={`http://bscscan.com/address/${account}`} target="_blank" rel="noopener noreferrer">
									View on BscScan&nbsp;<img src={require('../../public/images/Marketplace/wallet/arrow-square.svg').default} alt="copy" />
								</a>
								<Copy toCopy={account ? account : ''}>
									Copy Address&nbsp;<img src={require('../../public/images/Marketplace/wallet/copy.svg').default} alt="copy" />
								</Copy>
							</div>
							<Button className="btn-gold" onClick={handleDisconnect}>
								Disconnect
							</Button>
						</div>
					</div>
				)}
			</Modal>
		</>
	);
};

export default ConnectWallet;
