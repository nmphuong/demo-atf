import { BinanceWallet, Metamask, SafePalWallet, TrustWallet, WalletConnect } from '../components/icons';

export const NetworkContextName = 'NETWORK';
export const API_KDG = 'https://hub.hubecom.com/api';

// wallet list
export const WALLET_LIST = [
	{ icon: Metamask, title: 'Metamask', connectorId: 'injected' },
	{ icon: SafePalWallet, title: 'SalePal Wallet', connectorId: 'injected' },
	{ icon: WalletConnect, title: 'Wallet Connect', connectorId: 'walletconnect' },
	{ icon: TrustWallet, title: 'Trust Wallet', connectorId: 'injected' }
];
export const ADDRESS_BUSD_ADDRESS = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
export const ADDRESS_RECEVIE_BUSD = '0x9a5D956C9FBc8Bd51a08DFC31441A2cCff2584aE';
export const NEED_A_PLACEHOLDER = WALLET_LIST.length % 2 !== 0;

export const MAINNET_BSC_URL = 'https://bsc-dataseed.binance.org';
export const MAINNET_CHAIN_ID = 56;

export const marketContractAddress = '0x7c76E1344A79fFe41Dd43239e30D60C57981dbF2';

export const bscTokens = [
	// stake pool
	{
		id: 'wbnb',
		symbol: 'wbnb',
		contract: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
	},
	{
		id: 'binance-usd',
		symbol: 'busd',
		contract: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
	},
	{
		id: 'tether',
		symbol: 'USDT',
		contract: '0x55d398326f99059fF775485246999027B3197955'
	},
	{
		id: 'ethereum',
		symbol: 'ETH',
		contract: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
	},
	{
		id: 'dai',
		symbol: 'DAI',
		contract: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3'
	},
	{
		id: 'polis',
		symbol: 'POLIS',
		contract: '0xb5bea8a26d587cf665f2d78f077cca3c7f6341bd'
	},
	{
		id: 'tether',
		symbol: 'USDT',
		contract: '0x049d68029688eAbF473097a2fC38ef61633A3C7A'
	},
	{
		id: 'usd-coin',
		symbol: 'USDC',
		contract: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
	},
	{
		id: 'bsc-station',
		symbol: 'BSCS',
		contract: '0xbcb24afb019be7e93ea9c43b7e22bb55d5b7f45d'
	},
	{
		id: 'kingdom-game-4-0',
		symbol: 'KDG',
		contract: '0x87a2d9a9a6b2d61b2a57798f1b4b2ddd19458fb6'
	}
];
