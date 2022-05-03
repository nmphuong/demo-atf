import { Provider } from 'react-redux';
import store from './store/index';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary, Web3ProviderNetwork } from './context/web3provider';
import { RefreshContextProvider } from './context/RefreshContext';

const Providers = ({ children }) => {
	return (
		<Provider store={store}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Web3ProviderNetwork getLibrary={getLibrary}>
					<RefreshContextProvider>{children}</RefreshContextProvider>
				</Web3ProviderNetwork>
			</Web3ReactProvider>
		</Provider>
	);
};

export default Providers;
