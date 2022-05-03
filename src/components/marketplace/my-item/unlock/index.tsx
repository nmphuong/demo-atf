import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Button, Table, Space, Spin, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
import './style.css';
import { Tabs } from 'antd';
import { useActiveWeb3React } from 'hooks';
import { MyBoxApi } from '../../../../config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import { convertDateTime } from 'utils/formatDatetime';
import { useGameContract, useGamePlayContract } from '../../../../hooks/useContract';
import { ethers } from 'ethers';
import web3 from 'web3';
import LoadingFull from 'components/loading-full';
import MenuSidebar from 'components/common/menu-sidebar';
import HeaderMobile from 'components/common/menu-sidebar-top';
import HeaderPage from 'components/common/header-page';
import FooterIndex from 'components/Footer';
import { unlockNFT1155FromGame } from '../../../my-profile/game-utils';

const { Header, Content } = Layout;
declare const window: Window & typeof globalThis & { ethereum: any };
const UnlockGame = () => {
	const history = useHistory();

	const gamePlayAddress = process.env.REACT_APP_GAME_PLAY_CONTRACT ?? '';
	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';


	const envChainId = process.env.REACT_APP_CHAIN_ID;

	const gamePlayContract = useGamePlayContract(gamePlayAddress);

	const { chainId, account } = useActiveWeb3React();
	const [isCollapse, setIsCollapse] = useState(true);
	const [catId, setCatId] = useState(0);
	const [isHideSideBar, setIsHideSideBar] = useState(false);
	const [dataRequest, setDataRequest] = useState<any>([]);
	const { showNoti, tokenID } = useWrap();
	const [disable, setDisable] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [loadingKey, setLoadingKey] = useState(0);
	const [loadingUnlock, setLoadingUnlock] = useState(false);
	const [disableUnlock, setDisableUnlock] = useState(false);
	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);

	const getRequestUnlockByNftId = async (type, tokenID) => {
		try {
			let res = await MyBoxApi.getRequestUnlockByNftId(account, type, tokenID);
			if (res.status === 200) {
				if (res.data.length > 0) {
					setDataRequest(res.data);
				} else {
					setDataRequest([]);
				}
			}
		} catch (error) {
			console.log('Error: ', error);
		} finally {
		}
	};
	useEffect(() => {
		if (account) {
			getRequestUnlockByNftId('BRAIN', tokenID);
		}
	}, [account, tokenID]);

	const onUnload = (event) => {
		event.preventDefault();
		return (event.returnValue = 'Are you sure you want to exit?');
	};

	const onUnlockFromGame = async (item: any) => {
		try {
			if (chainId != envChainId) {
				showNoti('warning', 'Wrong Network!');
				return;
			}
			if (loadingUnlock) {
				return;
			}
			window.addEventListener('beforeunload', onUnload);
			setLoadingKey(item.id);
			setLoadingUnlock(true);
			setDisableUnlock(true);

			await unlockNFT1155FromGame(gamePlayContract, item)
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
											showNoti('success', 'Unlock Successfully');
											const payload = {
												moveNftHash: txn.hash,
												ownerAddress: account,
												nftId: item.nftId.toString(),
												id: item.id
											};
											MyBoxApi.nftToMarket(payload, item.id, tokenID).finally(() => {
												history.push('/profile/my-asset?asset');
											});
										}
									} else {
										showNoti('warning', 'Unlock Failed');
										if (account && tokenID) {
											getRequestUnlockByNftId('BRAIN', tokenID);
										}
									}
									setLoadingUnlock(false);
									setDisableUnlock(false);
									window.removeEventListener('beforeunload', onUnload);
								}
							})();
						}, 1000);
					}
				})
				.catch((error) => {
					console.log(error);
					setLoadingUnlock(false);
					setDisableUnlock(false);
					window.removeEventListener('beforeunload', onUnload);
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
			setLoadingUnlock(false);
			setDisableUnlock(false);
			window.removeEventListener('beforeunload', onUnload);
			console.log(error);
			if (error.data) {
				showNoti('error', error.data.message);
			}
		}
	};

	const btnStatus = (record, tokenName) => {
		let btn;
		let dis = false;
		if (record.hash) {
			dis = true;
		}
		if (record.processStatus == "APPROVED") {
			if (record.withdrawStatus == 'PENDING') {
				btn = (
					<Button
						key={record.id}
						className="item-btn-claim"
						htmlType="button"
						onClick={() => onUnlockFromGame(record)}
						disabled={(disable && loadingKey == record.id) || dis}
					>
						Claim {isLoading && loadingKey == record.id && <Spin className="style-loading" size="small" />}
					</Button>
				);
			} else {
				btn = <label className={'label-alert alert-' + record.withdrawStatus.toLowerCase()}>{record.withdrawStatus}</label>;
			}
		} else {
			btn = <label className='label-alert alert-pending'>Pending</label>;
		}
		return btn;
	};

	const onCopy = () => {
		showNoti('success', 'Copied');
	};


	const columnsRequest = [
		{
			title: 'No.',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: 'NFT Id',
			dataIndex: 'nftId',
			key: 'nftId'
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
			title: 'Created date',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (text, record) => (
				<>
					<span>{convertDateTime(new Date(record.createdDate))}</span>
				</>
			)
		},
		{
			title: '',
			key: 'action',
			render: (text, record) => <Space size="middle">{btnStatus(record, 'GAE')}</Space>
		}
	];

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
					<Col className="gutter-row" xs={24} xl={20} md={20} sm={20}>
						<div className="page-content">
							<div className="claim-box-title">
								Request Unlock Item
							</div>
							<div className="asset-block">

								<Table pagination={false} columns={columnsRequest} dataSource={dataRequest} className="cus-tables" />

								{/* {totalRow > 10 && (
									<Pagination
										// style={{ padding: 15, float: 'right' }}
										current={param.page + 1}
										defaultCurrent={1}
										total={totalRow}
										pageSize={param.size}
										onChange={onChange_Pagi}
										showSizeChanger={false}
										className="pagiation-custom"
									/>
								)} */}
							</div>
						</div>
					</Col>
				</Row>
				<FooterIndex />
			</Content>
			{loadingUnlock && <LoadingFull />}
		</>


	);
};

export default UnlockGame;
