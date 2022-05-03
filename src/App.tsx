import React, { useEffect } from 'react';
import yall from 'yall-js';

import './App.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary, Web3ProviderNetwork } from './context/web3provider';
import { RefreshContextProvider } from './context/RefreshContext';
import { WrapperProvider } from './context/WrapperContext';
import HeaderRouter from './components/common/header';

function App() {
	useEffect(() => {
		document.addEventListener('DOMContentLoaded', function () {
			yall({
				observeChanges: true,
				noPolyfill: true,
				lazyClass: 'lzLoadingLegend'
			});
		});
	}, []);

	return (
		<>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Web3ProviderNetwork getLibrary={getLibrary}>
					<RefreshContextProvider>
						<WrapperProvider>
							<ReactNotification />
							<HeaderRouter />
						</WrapperProvider>
					</RefreshContextProvider>
				</Web3ProviderNetwork>
			</Web3ReactProvider>
		</>
	);
}

export default App;
