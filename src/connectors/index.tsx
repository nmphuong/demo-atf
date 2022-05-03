import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { BscConnector } from './bsc';
import { WalletConnector } from './walletConnect';

const NETWORK_URL = process.env.REACT_APP_BSC_NETWORK_URL;
const NETWORK_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID ?? '56');

export const walletconnect = new WalletConnectConnector({
	//@ts-ignore
	rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
	infuraId:'6b8d72d49ea944a487fbb532f17c0009',
	bridge: 'https://bridge.walletconnect.org',
	qrcode: true,
	pollingInterval: 15000
});

export const walletconnect1 = new WalletConnector({});


export const injected = new InjectedConnector({
	supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 137, 80001]
});

export const bsc = new BscConnector({
	supportedChainIds: [1, 3, 4, 5, 42, 56, 97, 137, 80001]
});
