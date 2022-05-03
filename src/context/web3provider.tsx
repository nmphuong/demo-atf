import { createWeb3ReactRoot } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { NetworkContextName } from '../constants';

export function getLibrary(provider) {
	const library = new Web3Provider(provider);
	library.pollingInterval = 15000;
	return library;
}

export const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
