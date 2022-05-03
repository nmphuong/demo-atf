import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Form, Input, Button, Space, Table, Spin } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
import './style.css';
import { MyBoxApi } from '../../../config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';
import { useActiveWeb3React } from 'hooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import { useGamePlayContract, useGEMContract } from '../../../hooks/useContract';
import { approveGEM, depositGameToken } from '../game-utils';
import { ethers } from 'ethers';
import brainTokenAbi from '../../../config/abi/brainTokenAbi.json';
import web3 from 'web3';
import LoadingFull from 'components/loading-full';
import { convertDateTime } from 'utils/formatDatetime';
import NoneData from 'components/element/NoneData';

const { Header, Content } = Layout;
declare const window: Window & typeof globalThis & { ethereum: any };
const Deposit = () => {
	const { chainId, account } = useActiveWeb3React();
	const gamePlayAddress = process.env.REACT_APP_GAME_PLAY_CONTRACT ?? '';
	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
	const gemTokenAddress = process.env.REACT_APP_GEM_CONTRACT ?? '';
	const envChainId = process.env.REACT_APP_CHAIN_ID;

	const gamePlayContract = useGamePlayContract(gamePlayAddress);
	const gemTokenContract = useGEMContract(gemTokenAddress);
	const [loadingKey, setLoadingKey] = useState(0);
	const [isCollapse, setIsCollapse] = useState(true);
	const [disable, setDisable] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [catId, setCatId] = useState(0);
	const [isHideSideBar, setIsHideSideBar] = useState(false);
	const [depositList, setDebositList] = useState([]);
	const { showNoti, tokenID } = useWrap();
	const [form] = Form.useForm();
	const tokenNameDeposit: any = 'MONEY';
	const [gemBalance, setGemBalance] = useState(0);
	const [gemApprove, setGemApprove] = useState(0);
	const [mintDeposit, setMinDeposit] = useState(0);
	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);


	async function getGEMBalance() {
		if (typeof window.ethereum !== 'undefined') {
			if (account && gemTokenContract) {
				const gemBalance = await gemTokenContract.balanceOf(account);
				let bl: any = web3.utils.fromWei(web3.utils.toBN(gemBalance.toString()), 'ether');
				let formatedBl = Math.round(parseFloat(bl) * 10000) / 10000;
				setGemBalance(formatedBl);
			}
		}
	}

	useEffect(() => {
		if (account && tokenID) {
			getDeposits(account, 'DEPOSIT', tokenID);
			// minDeposits(account, tokenID);
		}
	}, [account, tokenID]);

	useEffect(() => {
		if (gemTokenContract) {
			gemTokenContract.allowance(account, gamePlayAddress).then((res) => {
				setGemApprove(parseInt(res));
			});
		}
		getGEMBalance();
	}, [account]);



	const getDeposits = (account: any, type: any, tokenID: any) => {
		MyBoxApi.getDataDeposits(account, type, tokenID).then((res) => {
			if (res.status === 200) {
				if (res.data && res.data.length > 0) {
					setDebositList(res.data);
				}
			}
		});
	};
	const minDeposits = (account: any, tokenID: any) => {
		MyBoxApi.minDeposits(account, tokenID).then((res) => {
			if (res.status === 200) {
				if (res.data) {
					setMinDeposit(parseInt(res.data.val));
				}
			}
		});
	};
	const onUnload = (event) => {
		event.preventDefault();
		return (event.returnValue = 'Are you sure you want to exit?');
	};
	const depositTokens = async (item, tokenNameDeposit) => {
		if (chainId != envChainId) {
			showNoti('warning', 'Wrong Network!');
			return;
		}
		try {
			if (!account) {
				showNoti('warning', 'Please Connect Wallet!');
				return;
			}

			if (item.quantity < mintDeposit) {
				showNoti('warning', `Min deposit must greater than ${mintDeposit}`);
				return;
			}

			setDisable(true);
			setLoading(true);


			const payload = {
				hash: "asdasdasd",
				balanceType: tokenNameDeposit,
				id: item.id
			};
			MyBoxApi.depositToken(payload, tokenID).finally(() => {
				if (account && tokenID) {
					form.setFieldsValue({
						quantity: 0
					});
					getDeposits(account, 'DEPOSIT', tokenID);
				}
			});


		} catch (error: any) {
			setLoading(false);
			setDisable(false);
			window.removeEventListener('beforeunload', onUnload);
			console.log(error);
		}
	}

	const onSubmitRequestDeposit = async (values: any) => {
		try {
			if (values.quantity < mintDeposit) {
				showNoti('warning', `Min deposit must greater than ${mintDeposit}`);
				return;
			}
			setDisable(true);
			setLoading(true);
			const payload = {
				ownerAddress: account,
				balanceType: "MONEY",
				amount: parseInt(values.quantity),
			};
			MyBoxApi.requestDepositToken(payload, tokenID).finally(() => {
				if (account && tokenID) {
					form.setFieldsValue({
						quantity: 0
					});
					getDeposits(account, 'DEPOSIT', tokenID);
				}
			});
			showNoti('success', 'Deposit Request Successfully');
			setDisable(false);
			setLoading(false);
		} catch (error: any) {
			setLoading(false);
			setDisable(false);
			console.log(error);
		}
	};

	const handleApproveGem = async () => {
		if (chainId != envChainId) {
			showNoti('warning', 'Wrong Network!');
			return;
		}
		try {
			setLoading(true);
			await approveGEM(gemTokenContract, gamePlayAddress)
				.then((txn) => {
					if (txn && txn.hash) {
						let countNoti = 0;
						const interval = setInterval(function () {
							(async () => {
								const res = await w3.eth.getTransactionReceipt(txn.hash);
								if (res) {
									clearInterval(interval);
									if (res.status && res.blockNumber) {
										!countNoti && showNoti('success', 'Approve GEM Successfully');
										countNoti++;
										setGemApprove(Math.pow(2, 256))
									} else {
										showNoti('error', 'Approve GEM Failed');
									}
									setLoading(false);
								}
							})();
						}, 1000);
					}
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
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
			console.log(error);
		}
	};

	const btnStatus = (record) => {
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
						onClick={() => depositTokens(record, tokenNameDeposit)}
						disabled={(disable && loadingKey == record.id) || dis}
					>
						Deposit {isLoading && loadingKey == record.id && <Spin className="style-loading" size="small" />}
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

	const columnsDeposit = [
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
			title: 'Token',
			dataIndex: 'tokenType',
			key: 'tokenType',
			render: (text, record) => (
				<>GEM</>
			)
		},
		{
			title: 'Address',
			dataIndex: 'ownerAddress',
			key: 'ownerAddress',
			render: (text, record) => (
				<>
					<span className="txt-hash">
						{record.ownerAddress?.substring(0, 5)}...{record.ownerAddress?.substring(record.ownerAddress.length - 5)}
					</span>
					<CopyToClipboard onCopy={onCopy} text={record.ownerAddress}>
						<CopyOutlined />
					</CopyToClipboard>
				</>
			)
		},
		{
			title: 'TxHash',
			dataIndex: 'hash',
			key: 'hash',
			render: (text, record) => (
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
			title: 'Balance Date',
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
			render: (text, record) => (
				<Space size="middle" align="center">
					{btnStatus(record.depositStatus)}
				</Space>
			)
		}
	];

	return (
		<Layout className="asset-block">
			<div className="deposit-content">
				<h3>
					Balance: <span>{gemBalance}</span> GEM
				</h3>
				<div className="form-deposit">
					<Form
						name="customized_form_controls"
						layout="inline"
						form={form}
						onFinish={onSubmitRequestDeposit}
						initialValues={{ quantity: 0 }}
						wrapperCol={{ span: 16 }}
					>
						<Form.Item
							name="quantity"
							className="deposit-quantiy"
							rules={[
								{
									validator: (rule, value, cb: (msg?: string) => void) => {
										!value || parseInt(value) <= 0 || value > gemBalance ? cb('Invalid Quantity') : cb();
									}
								}
							]}
						>
							<Input type="number" min={0} max={gemBalance} style={{ width: 150 }} />
						</Form.Item>
						<Form.Item>
							{gemApprove > 0 ? (
								<Button type="primary" htmlType="submit" className="btn-deposit-form" disabled={disable}>
									<span>Deposit To Game</span> {isLoading && <Spin className="style-loading" size="small" />}
								</Button>
							) : (
								<Button
									htmlType="button"
									disabled={isLoading}
									className="btn-deposit-form"
									onClick={handleApproveGem}
								>
									<span>Approve</span> {isLoading && <Spin className="style-loading" size="small" />}
								</Button>
							)}
						</Form.Item>
					</Form>
				</div>
				<p className="text-war-depo">Min deposit must greater than {mintDeposit}</p>
				<div className="history-deposit">
					<h3>Deposit transaction history</h3>
					<div className="craft-table">
						<Table locale={{ emptyText: <NoneData text="No Data" /> }} pagination={false} columns={columnsDeposit} dataSource={depositList} className="cus-tables" />
					</div>
				</div>
			</div>
			{isLoading && <LoadingFull />}
		</Layout>
	);
};

export default Deposit;
