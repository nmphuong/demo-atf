import { AbstractConnector } from '@web3-react/abstract-connector';
import warning from 'tiny-warning';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';

declare let window: any;

function parseSendReturn(sendReturn: any) {
	// eslint-disable-next-line no-prototype-builtins
	return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn;
}

export class NoBscProviderError extends Error {
	constructor() {
		super();
		this.name = this.constructor.name;
		this.message = 'No BSC provider was found on window.BinanceChain.';
	}
}

export class UserRejectedRequestError extends Error {
	constructor() {
		super();
		this.name = this.constructor.name;
		this.message = 'The user rejected the request.';
	}
}

export class WalletConnector extends AbstractConnector {

	provider: any;

	constructor(kwargs: any) {
		super(kwargs);

		this.handleNetworkChanged = this.handleNetworkChanged.bind(this);
		this.handleChainChanged = this.handleChainChanged.bind(this);
		this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleChainChanged(chainId: any) {
		this.emitUpdate({ chainId, provider: this.provider });
	}

	handleAccountsChanged(accounts: any) {
		if (accounts.length === 0) {
			this.emitDeactivate();
		} else {
			this.emitUpdate({ account: accounts[0] });
		}
	}

	handleClose() {
		this.emitDeactivate();
	}

	handleNetworkChanged(networkId: any) {
		this.emitUpdate({ chainId: networkId, provider: this.provider });
	}



	async activate() {
		this.provider = new WalletConnectProvider({
			rpc: {
				56: 'https://bsc-dataseed.binance.org',
				97: 'https://data-seed-prebsc-1-s1.binance.org:8545'
			},
			infuraId: '6b8d72d49ea944a487fbb532f17c0009',
			bridge: 'https://bridge.walletconnect.org',
			qrcode: true,
			pollingInterval: 15000,
			qrcodeModalOptions: {
				mobileLinks: [
				  "rainbow",
				  "metamask",
				  "argent",
				  "trust",
				  "imtoken",
				  "pillar",
				],
			}
		});

		this.provider.enable();


		const web3 = new Web3(this.provider as any);
		const accounts = await web3.eth.getAccounts();

		if (this.provider.on) {
			this.provider.on('chainChanged', this.handleChainChanged);
			this.provider.on('accountsChanged', this.handleAccountsChanged);
			// this.provider.on('disconnect', this.handleClose);
			this.provider.on('connect', this.handleNetworkChanged);
		}

		let account = accounts[0];

		return { provider: this.provider, ...(account ? { account } : {}) };
	}

	async getProvider() {
		return this.provider;
	}

	async getChainId() {
		if (!this.provider) {
			throw new NoBscProviderError();
		}

		let chainId;
		try {
			const web3 = new Web3(this.provider as any);
			chainId = await await web3.eth.getChainId();
		} catch {
			warning(false, 'eth_chainId was unsuccessful, falling back to net_version');
		}

		return chainId;
	}

	async getAccount() {
		if (!this.provider) {
			throw new NoBscProviderError();
		}

		let account;
		try {
			const web3 = new Web3(this.provider as any);
			const accounts = await web3.eth.getAccounts();
			account = accounts && accounts.length > 0 ? accounts[0] : null;
		} catch {
			warning(false, 'eth_accounts was unsuccessful, falling back to enable');
		}


		return account;
	}

	deactivate() {
		// this.provider.disconnect();
	}

	async isAuthorized() {
		if (!this.provider) {
			return false;
		}

		try {
			const web3 = new Web3(this.provider as any);
			const accounts = await web3.eth.getAccounts();
			return accounts.length > 0;
		} catch {
			return false;
		}
	}
}
