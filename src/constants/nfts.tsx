const nfts = {
	// add pool stake
	asset: {
		symbol: 'NFT-NAME',
		address: process.env.REACT_APP_ASSET_CONTRACT ?? '',
		decimals: 18,
		projectLink: 'https://app.zombieworldz.io/'
	}
};

export default nfts;
