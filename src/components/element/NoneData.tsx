import React, { useState, useEffect } from 'react';

import { useActiveWeb3React } from 'hooks';

import 'antd/dist/antd.css';
import './nonedata.css';

type props = {
	text: string;
};

const NoneData = (props: props) => {
	const { chainId, account } = useActiveWeb3React();

	//Start: Edric
	const [width, setWidth] = useState<number>(window.innerWidth);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 620;

	//End: Edric

	const { text = '' } = props;
	return account && isMobile ? (
		<div className="noData">No Data...</div>
	) : (
		<div className="none-data">
			<img src={require('../../public/images/Marketplace/Nodata/nodata.svg').default} alt="no-data" />
		</div>
	);
};

export default NoneData;
