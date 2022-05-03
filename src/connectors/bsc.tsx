import { AbstractConnector } from '@web3-react/abstract-connector';
import warning from 'tiny-warning';

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

export class BscConnector extends AbstractConnector {
	constructor(kwargs: any) {
		super(kwargs);

		this.handleNetworkChanged = this.handleNetworkChanged.bind(this);
		this.handleChainChanged = this.handleChainChanged.bind(this);
		this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleChainChanged(chainId: any) {
		this.emitUpdate({ chainId, provider: window.BinanceChain });
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
		this.emitUpdate({ chainId: networkId, provider: window.BinanceChain });
	}

	async activate() {
		if (!window.BinanceChain) {
			throw new NoBscProviderError();
		}

		if (window.BinanceChain.on) {
			window.BinanceChain.on('chainChanged', this.handleChainChanged);
			window.BinanceChain.on('accountsChanged', this.handleAccountsChanged);
			window.BinanceChain.on('close', this.handleClose);
			window.BinanceChain.on('networkChanged', this.handleNetworkChanged);
		}

		if (window.BinanceChain.isMetaMask) {
			window.BinanceChain.autoRefreshOnNetworkChange = false;
		}

		// try to activate + get account via eth_requestAccounts
		let account;
		try {
			account = await window.BinanceChain.send('eth_requestAccounts').then((sendReturn: any) => parseSendReturn(sendReturn)[0]);
		} catch (error: any) {
			if (error.code === 4001) {
				throw new UserRejectedRequestError();
			}
			warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable');
		}

		// if unsuccessful, try enable
		if (!account) {
			// if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
			account = await window.BinanceChain.enable().then((sendReturn: any) => sendReturn && parseSendReturn(sendReturn)[0]);
		}

		return { provider: window.BinanceChain, ...(account ? { account } : {}) };
	}

	async getProvider() {
		return window.BinanceChain;
	}

	async getChainId() {
		if (!window.BinanceChain) {
			throw new NoBscProviderError();
		}

		let chainId;
		try {
			chainId = await window.BinanceChain.send('eth_chainId').then(parseSendReturn);
		} catch {
			warning(false, 'eth_chainId was unsuccessful, falling back to net_version');
		}

		if (!chainId) {
			try {
				chainId = await window.BinanceChain.send('net_version').then(parseSendReturn);
			} catch {
				warning(false, 'net_version was unsuccessful, falling back to net version v2');
			}
		}

		if (!chainId) {
			try {
				chainId = parseSendReturn(window.BinanceChain.send({ method: 'net_version' }));
			} catch {
				warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties');
			}
		}

		if (!chainId) {
			if (window.BinanceChain.isDapper) {
				chainId = parseSendReturn(window.BinanceChain.cachedResults.net_version);
			} else {
				chainId =
					window.BinanceChain.chainId ||
					window.BinanceChain.netVersion ||
					window.BinanceChain.networkVersion ||
					window.BinanceChain._chainId;
			}
		}

		return chainId;
	}

	async getAccount() {
		if (!window.BinanceChain) {
			throw new NoBscProviderError();
		}

		let account;
		try {
			account = await window.BinanceChain.send('eth_accounts').then((sendReturn: any) => parseSendReturn(sendReturn)[0]);
		} catch {
			warning(false, 'eth_accounts was unsuccessful, falling back to enable');
		}

		if (!account) {
			try {
				account = await window.BinanceChain.enable().then((sendReturn: any) => parseSendReturn(sendReturn)[0]);
			} catch {
				warning(false, 'enable was unsuccessful, falling back to eth_accounts v2');
			}
		}

		if (!account) {
			account = parseSendReturn(window.BinanceChain.send({ method: 'eth_accounts' }))[0];
		}

		return account;
	}

	deactivate() {
		if (window.BinanceChain && window.BinanceChain.removeListener) {
			window.BinanceChain.removeListener('chainChanged', this.handleChainChanged);
			window.BinanceChain.removeListener('accountsChanged', this.handleAccountsChanged);
			window.BinanceChain.removeListener('close', this.handleClose);
			window.BinanceChain.removeListener('networkChanged', this.handleNetworkChanged);
		}
	}

	async isAuthorized() {
		if (!window.BinanceChain) {
			return false;
		}

		try {
			return await window.BinanceChain.send('eth_accounts').then((sendReturn: any) => {
				return parseSendReturn(sendReturn).length > 0;
			});
		} catch {
			return false;
		}
	}
}
