import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { bsc, injected, walletconnect, walletconnect1 } from 'connectors';


export default function useConnectWallet() {
	const { connector, account, activate, deactivate, active } = useWeb3React();
	const [currentConnector, setCurrentConnector] = useState();
	const [currentConnectorId, setCurrentConnectorId] = useState();

	useEffect(() => {
		if (currentConnectorId && currentConnector && currentConnector === connector) {
			// Activated
			if (account) {
				window.localStorage.setItem('accountStatus', '1');
				window.localStorage.setItem('connectorId', currentConnectorId);
			}
		}
	}, [account, currentConnectorId, currentConnector, connector]);

	const [tried, setTried] = useState(false);

	async function walletLogin(connectorId) {
		let _connector;

		switch (connectorId) {
			case 'walletconnect':
				_connector = walletconnect1;
				break;
			case 'bsc':
				_connector = bsc;
				break;
			default:
				// injected
				_connector = injected;
				break;
		}

		setCurrentConnectorId(connectorId);
		setCurrentConnector(_connector);

		!active && (await activate(_connector));
	}

	function walletLogout() {
		deactivate();
		window.localStorage.removeItem('accountStatus');
		window.localStorage.removeItem('connectorId');
		window.localStorage.removeItem('refCode');
		window.localStorage.removeItem('walletconnect');
	}

	return { walletLogin, walletLogout };
}
