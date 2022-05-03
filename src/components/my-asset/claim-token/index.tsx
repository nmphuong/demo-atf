import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Button, Table, Space, Spin, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
import './style.css';
import Balance from '../../my-profile/balance';
import { Tabs } from 'antd';
import { useActiveWeb3React } from 'hooks';
import { MyBoxApi } from '../../../config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import { convertDateTime } from 'utils/formatDatetime';
import MenuSidebar from 'components/common/menu-sidebar';
import HeaderMobile from 'components/common/menu-sidebar-top';
import HeaderPage from 'components/common/header-page';
import FooterIndex from 'components/Footer';
import { useGameContract, useGamePlayContract } from '../../../hooks/useContract';
import { claimGameToken } from '../../my-profile/game-utils';
import { ethers } from 'ethers';
import web3 from 'web3';
import LoadingFull from 'components/loading-full';
import NoneData from 'components/element/NoneData';
import AssetMenu from 'components/my-asset/asset-menu';

const { Header, Content } = Layout;
declare const window: Window & typeof globalThis & { ethereum: any };
const ClaimToken = () => {
	let tokenID = window.localStorage.getItem('tokenId');
	const { showNoti } = useWrap();
	const gaeTokenAddress = process.env.REACT_APP_GAE_CONTRACT ?? '';
	const gamePlayAddress = process.env.REACT_APP_GAME_PLAY_CONTRACT ?? '';
	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
	const envChainId = process.env.REACT_APP_CHAIN_ID;
	const gamePlayContract = useGamePlayContract(gamePlayAddress);
	const { chainId, account } = useActiveWeb3React();
	const [dataClaims, setDataClaims] = useState<any>([]);
	const [disable, setDisable] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [loadingKey, setLoadingKey] = useState(0);
	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);

	const getDataClaims = async (type, tokenID) => {
		try {
			let res = await MyBoxApi.getDataClaims(account, type, tokenID);
			if (res.status === 200) {
				if (res.data.length > 0) {
					setDataClaims(res.data);
				} else {
					setDataClaims([]);
				}
			}
		} catch (error) {
			console.log('Error: ', error);
		} finally {
		}
	};
	useEffect(() => {
		if (account) {
			getDataClaims('WITHDRAW', tokenID);
		}
	}, [account, tokenID]);

	const onUnload = (event) => {
		event.preventDefault();
		return (event.returnValue = 'Are you sure you want to exit?');
	};

	const claimTokens = async (item, tokenName) => {
		try {
			if (isLoading || !item.signature) {
				showNoti('warning', 'No signature!');
				return;
			}
			if (!account) {
				showNoti('warning', 'Please Connect Wallet!');
				return;
			}
			if (chainId != envChainId) {
				showNoti('warning', 'Wrong Network!');
				return;
			}
			setDisable(true);
			setLoading(true);
			setLoadingKey(item.id);
			window.addEventListener('beforeunload', onUnload);

			await claimGameToken(gamePlayContract, gaeTokenAddress, item.signature, item.val, account, item.id)
				.then((txn) => {
					if (txn && txn.hash) {
						let countNoti = 0;
						const interval = setInterval(function () {
							(async () => {
								const res = await w3.eth.getTransactionReceipt(txn.hash);
								if (res) {
									clearInterval(interval);
									if (res.status && res.blockNumber) {
										if (!countNoti) {
											countNoti++;
											showNoti('success', 'Claim Successfully');
											const payload = {
												hash: txn.hash,
												balanceType: tokenName,
												id: item.id
											};
											MyBoxApi.processwithdraw(payload, item.id, tokenID).finally(() => {
												if (account && tokenID) {
													getDataClaims(tokenName, tokenID);
												}
											});
										}
									} else {
										showNoti('error', 'Claim Failed');
									}
									setDisable(false);
									setLoading(false);
									window.removeEventListener('beforeunload', onUnload);
								}
							})();
						}, 1000);
					}

				})
				.catch((error) => {
					console.log(error);
					window.removeEventListener('beforeunload', onUnload);
					setLoading(false);
					setDisable(false);
					if (error) {
						if (error.code == 4001 && error.message) {
							showNoti('warning', error.message);
						} else {
							if (error.data && error.data.message) {
								showNoti('warning', error.data.message);
							}
						}
					}
				});
		} catch (error: any) {
			setLoading(false);
			setDisable(false);
			window.removeEventListener('beforeunload', onUnload);
			console.log(error);
		}
	};

	const btnStatus = (record, tokenName) => {
		let btn;
		let dis = false;
		if (record.hash) {
			dis = true;
		}

		if (record.status == 'INIT') {
			btn = <label className='label-alert alert-pending'>PENDING</label>;
		} else if (record.status == 'APPROVED') {
			if (record.blockchainStatus == 'PENDING') {
				btn = (
					<Button
						key={record.id}
						className="btn-gold-claim"
						htmlType="button"
						onClick={() => claimTokens(record, tokenName)}
						disabled={(disable && loadingKey == record.id) || dis}
					>
						Claim {isLoading && loadingKey == record.id && <Spin className="style-loading" size="small" />}
					</Button>
				);
			} else {
				btn = <label className={'label-alert alert-' + record.blockchainStatus.toLowerCase()}>{record.blockchainStatus}</label>;
			}
		} else if (record.status == 'REJECTED') {
			btn = <label key={record.status}>REJECTED</label>;
		}
		return btn;
	};

	const onCopy = () => {
		showNoti('success', 'Copied');
	};

	const columnsWithdraw = [
		{
			title: 'No.',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: 'Amount',
			dataIndex: 'val',
			key: 'val'
		},
		{
			title: 'TxHash',
			dataIndex: 'hash',
			key: 'hash',
			render: (text, record) =>
				record.hash && (
					<>
						<span className="txt-hash">
							{record.hash?.substring(0, 5)}...{record.hash?.substring(record.hash.length - 5)}
						</span>
						<CopyToClipboard onCopy={onCopy} text={record.hash}>
							<CopyOutlined />
						</CopyToClipboard>
					</>
				)
		},
		{
			title: 'Date',
			dataIndex: 'balanceDate',
			key: 'balanceDate',
			render: (text, record) => (
				<>
					<span>{convertDateTime(new Date(record.balanceDate))}</span>
				</>
			)
		},
		{
			title: '',
			key: 'action',
			render: (text, record) => <Space size="middle">{btnStatus(record, 'TOKEN')}</Space>
		}
	];

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
							<AssetMenu />
							<div className="claim-box-title">
								Claim Your Token
							</div>

							<div className="history-deposit">
								<h3>Transaction history</h3>
								<div className="craft-table">
									<Table locale={{ emptyText: <NoneData text="No Data" /> }} columns={columnsWithdraw} pagination={false} dataSource={dataClaims} className="cus-tables" />
								</div>
							</div>

							{isLoading && <LoadingFull />}

						</div>
					</div>
				</Row>
				<FooterIndex />
			</Content>

		</>
	);
};

export default ClaimToken;
