import React, { useState, useEffect } from 'react';
import { useActiveWeb3React } from 'hooks';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';

import { MyBoxApi } from '../../../config/api/myBoxApi';
import { useCampaignContract, useMysteryBoxContract } from '../../../hooks/useContract';
import { getBoxBalanceOfBatch } from '../../my-profile/game-utils';

import { useWrap } from 'context/WrapperContext';

import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import { Wrapper, Content, Account, Coin, Item, IconCoin, IconToken, BoxCus } from './styled';
import { useGAEContract } from '../../../hooks/useContract';
import { AuthApi } from '../../../config/api/authApi';
import { getPriceGAE } from './api';
import web3 from 'web3';
declare const window: Window & typeof globalThis & { ethereum: any };
const HeaderPage = () => {
	const { showNoti } = useWrap();
	const history = useHistory();
	const typeProfile = history.location.search.replace('?', '');

	const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
	const envChainId = process.env.REACT_APP_CHAIN_ID;
	const boxContractAddress = process.env.REACT_APP_BOX_CONTRACT ?? '';

	const campaignContractAddress = process.env.REACT_APP_CAMPAIGN_CONTRACT ?? '';
	const campaignContract = useCampaignContract(campaignContractAddress);

	const boxContract = useMysteryBoxContract(boxContractAddress);

	const [loading, setLoading] = useState(false);

	const [isRes, setIsRes] = useState<any>();

	const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);
	// const { chainId, account, library } = useActiveWeb3React();
	const [dataProfile, setDataProfile] = useState<any>([]);
	const [classTab, setClassTabs] = useState('');

	const { account } = useActiveWeb3React();
	const [totalRow, setTotalRow] = useState(0);
	const paramReset = {
		ownerAddress: account,
		statusList: ['OWNER'],
		size: 100,
		page: 0
	};
	const [param, setParam] = useState(paramReset);

	let tokenID = window.localStorage.getItem('tokenId');
	const gaeTokenAddress = process.env.REACT_APP_GAE_CONTRACT ?? '';
	const gaeTokenContract = useGAEContract(gaeTokenAddress);

	const getAuthHeader = async () => {
		try {
			let res = await AuthApi.getAuth({ address: account });
			if (res.status == 200) {
				window.localStorage.setItem('tokenId', res.data.id_token);
			}
		} catch (error) {}
	};
	if (tokenID?.length == 0) {
		getAuthHeader();
	}
	const [gaeBalance, setGaeBalance] = useState(0);
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

	const [priceGae, setPriceGae] = useState(0)

	const getPriceGAECoimarketcap = async () => {
		await getPriceGAE().then(res => {
			setPriceGae(res)
		})
	}

	useEffect(() => {
		getGAEBalance();
		getPriceGAECoimarketcap();
	}, [account]);



	const groupElement = (boxes, balanceMap) => {
		// handle group object
		const objArr = boxes.reduce(function (results, org) {
			(results[org.boxNftId] = results[org.boxNftId] || []).push(org);
			return results;
		}, []);

		console.log(objArr);

		// handle group array
		let groupArr: any = [];
		objArr.forEach((item, index) => {
			if (item.length > 0) {
				let claimedBoxIndex = -1;
				let notClaimedBoxIndex = -1;
				let notClaimQty = 0;
				for (let i = 0; i < item.length; i++) {
					if (item[i].claimBox) {
						claimedBoxIndex = i;
					} else {
						notClaimedBoxIndex = i;
						notClaimQty++;
					}
				}
				if (claimedBoxIndex >= 0 && balanceMap[item[claimedBoxIndex].boxNftId] > 0) {
					item[claimedBoxIndex].quantity = balanceMap[item[claimedBoxIndex].boxNftId];
					groupArr.push(item[claimedBoxIndex]);
				}
				if (notClaimedBoxIndex >= 0) {
					item[notClaimedBoxIndex].quantity = notClaimQty;
					groupArr.push(item[notClaimedBoxIndex]);
				}
			}
		});
		console.log(groupArr);
		return groupArr;
	};




	const getDataBox = async (type, account) => {
		setLoading(true);
		const dataFilter = {
			...param,
			statusList: [type]
		};

		try {
			let res = await MyBoxApi.getDataBox(dataFilter, tokenID, account);

			setTotalRow(parseInt(res.headers['x-total-count']));
			if (res.status === 200) {
				if (res.data && res.data.length > 0) {
					// Check cancel balance
					if (type === 'SELLING') {
						// const saleIds = res.data.map((e) => parseInt(e.sellId));
						// const sellingBoxBalance = await getSellBoxListInfo(boxMarketContract, saleIds);
						// let listSellingBox: any = [];
						// res.data.forEach((item, index) => {
						//     if (parseInt(sellingBoxBalance[index].status) === 1) {
						//         listSellingBox.push({
						//             ...item,
						//             quantity: parseInt(sellingBoxBalance[index].quantity),
						//             numSold: parseInt(sellingBoxBalance[index].numSold),
						//             total: parseInt(sellingBoxBalance[index].quantity) + parseInt(sellingBoxBalance[index].numSold),
						//             status: parseInt(sellingBoxBalance[index].status),
						//             quoteToken: parseInt(sellingBoxBalance[index].quoteTokenKey),
						//             sellingPrice: web3.utils.fromWei(sellingBoxBalance[index].price.toString(), 'ether')
						//         });
						//     }
						// });
						// setDataProfile(listSellingBox);
					} else {
						const boxIds = res.data.map((e) => parseInt(e.boxNftId));
						console.log('>>>>>>>', boxIds.length);
						// setIsRes(boxIds.length);

						const accounts = Array.from({ length: boxIds.length }).fill(account);

						const boxBalance = await getBoxBalanceOfBatch(boxContract, accounts, boxIds);

						const balanceMap = boxIds.reduce(function (result, field, index) {
						    result[field] = parseInt(boxBalance[index]);
						    // result[field] = 1;
						    return result;
						}, {});
						var groupBox = groupElement(res.data, balanceMap);

						setDataProfile(groupBox);
					}
				} else {
					setDataProfile([]);
				}
			}
		} catch (error) {
			console.log('Error: ', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (account && classTab) {
			switch (classTab) {
				case 'box':
					getDataBox('OWNER', account);
					break;
				case 'selling-box':
					getDataBox('SELLING', account);
					break;
				default:
					break;
			}
		}
	}, [account, classTab, param]);

	useEffect(() => {
		if (typeProfile) {
			setClassTabs(typeProfile);
		} else {
			setClassTabs('box');
		}
	}, [typeProfile]);

	const onUnload = (event) => {
		event.preventDefault();
		return (event.returnValue = 'Are you sure you want to exit?');
	};

	// const [atfPrice, setAtfPrice] = useState(0);
	// const getPrice = async () => {
	// 	const res = await axios.get(
	// 		'https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=0x5445451C07E20bA1ca887B6c74d66D358F46D083&vs_currencies=usd'
	// 	);

	// 	if (res && res.status == 200) {
	// 		const data = res.data[`${process.env.REACT_APP_GAE_CONTRACT}`]['usd'];
	// 		return parseFloat(data);
	// 	} else {
	// 		return 0;
	// 	}
	// };
	// useEffect(() => {
	// 	getPrice()
	// 		.then((res) => {
	// 			if (res) {
	// 				setAtfPrice(res);
	// 			}
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 		});
	// }, []);

	const initialValue = 0;
	const sumWithInitial = dataProfile
		.map((item) => item.quantity)
		.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
	// setIsRes(sumWithInitial);

	console.log('......', sumWithInitial);

	return (
		<Wrapper>
			<Content>
				<Coin>
					<Item>
						<IconCoin src={require('../../../public/images/Marketplace/header/character.webp').default} alt="character-icon" />0
					</Item>
					<Item>
						<IconCoin src={require('../../../public/images/Marketplace/header/stun-lv5.webp').default} alt="stun-icon" />0
					</Item>
					<Item>
						<IconCoin src={require('../../../public/images/Marketplace/header/icon-box-gold.webp').default} alt="box-icon" />
						{sumWithInitial}
					</Item>
					<Item>
						<IconCoin src={require('../../../public/images/Marketplace/header/gae-token.webp').default} alt="gae-icon" />{' '}
						{gaeBalance.toLocaleString()}
					</Item>
				</Coin>
				<Account>
					<Item>
						<IconToken src={require('../../../public/images/Marketplace/header/icon-token-gae.webp').default} alt="box-icon" />
						{Number(gaeBalance.toLocaleString()) * Number(priceGae)}
					</Item>
					<BoxCus>
						<ConnectWallet />
					</BoxCus>
				</Account>
			</Content>
		</Wrapper>
	);
};

export default HeaderPage;
