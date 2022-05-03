import web3 from 'web3';
// import { BookingApi } from 'components/bookingvr/bookingApi';

export const depositToken = async (gameSC, amount, tokenNameDeposit, ownerAddress, tokenID) => {

	const zwzTokenAddress = process.env.REACT_APP_ZWZ_CONTRACT ?? '';
	const brainTokenAddress = process.env.REACT_APP_BRAIN_CONTRACT ?? '';

	let tokenAddress = tokenNameDeposit == "BRAIN" ? brainTokenAddress : zwzTokenAddress;
	let amountWei = web3.utils.toWei(amount, 'ether');
	const transaction = await gameSC.depositGameToken(tokenAddress, amountWei);
	const receipt = await transaction.wait(1);
	return receipt;
};




export const craftNFT = async (gameSC, address, item) => {
	let zwzFee = web3.utils.toWei(item.zwzFee.toString(), 'ether');
	// let brainFee = web3.utils.toWei(item.brainFee.toString(), 'ether');
	let uri = `${item.nftId}.json`;

	const transaction = await gameSC.craftNFT(address, item.nftId, uri, item.rarity, item.star, zwzFee, item.signature);
	return transaction;
};

export const claimNFT = async (gameSC, account, item) => {
	console.log('CALLL');
	let uri = `${item.gameItemNftId}.json`;
	const args =[account, parseInt(item.gameItemNftId), uri, item.color, item.claimSign]
	console.log(args);
	const transaction = await gameSC.testClaimNft(...args);
	// const receipt = await transaction.wait(1);
	return transaction;
};

export const bringNftToGame = async (gameSC, address, tokenID, item) => {
	let nftAddress = process.env.REACT_APP_ASSET_CONTRACT;

	const transaction = await gameSC.depositNFT(item.nftId, nftAddress);
	// const receipt = await transaction.wait(1);
	return transaction;
};

export const approveBrain = async (brainContract, spender) => {
	const args = [spender, web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1)).toString()];
	const transaction = await brainContract.approve(...args);
	return transaction;
};
export const approveZWZ = async (zwzContract, spender) => {
	const args = [spender, web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1)).toString()];
	const transaction = await zwzContract.approve(...args);
	return transaction;
};
export const approveBringAsset = async (itemContract, operator) => {
	const args = [operator, true];
	const transaction = await itemContract.setApprovalForAll(...args);
	return transaction;
};
// export const vrPriceSC = async (bookingVRSC) => {
//     return bookingVRSC.vrPrice();
// }

export const approveGAE = async (GAEContract, spender) => {
	const args = [spender, web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1)).toString()];
	const transaction = await GAEContract.approve(...args);
	return transaction;
};

export const approveGEM = async (GEMContract, spender) => {
	const args = [spender, web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1)).toString()];
	const transaction = await GEMContract.approve(...args);
	return transaction;
};


export const depositGameToken = async (gamePlaySC, amount, tokenAddress) => {
	let amountWei = web3.utils.toWei(`${amount}`, 'ether');
	const transaction = await gamePlaySC.depositGameToken(tokenAddress, amountWei);
	return transaction;
};

export const depositCharacter = async (gamePlaySC, nftId, nftAddress) => {
	const args = [nftId, nftAddress];

	const transaction = await gamePlaySC.depositNFT(...args);
	return transaction;
};

export const depositGem = async (gamePlaySC, nftId, quantity, nftAddress) => {
	const args = [nftId, quantity,nftAddress];
	console.log(nftId);
	console.log(nftAddress);

	const transaction = await gamePlaySC.depositNFT1155(...args);
	return transaction;
};

export const approveCharacterNFT = async (characterNFTSC, operator) => {
	const args = [operator, true];
	const transaction = await characterNFTSC.setApprovalForAll(...args);
	return transaction;
};


export const approveGemNFT = async (gemNFTSc, operator) => {
	const args = [operator, true];
	const transaction = await gemNFTSc.setApprovalForAll(...args);
	return transaction;
};


export const claimGameToken = async (gameSC, tokenAddress, signature, amount, address, idClaim) => {
	let amountWei = web3.utils.toWei(amount.toString(), 'ether');
	const transaction = await gameSC.claimGameToken(tokenAddress, address, amountWei, idClaim, signature);
	return transaction;
};


export const unlockNFTFromGame = async (gameSC, item) => {
	let nftAddress = process.env.REACT_APP_CHARACTER_NFT_CONTRACT;
	const transaction = await gameSC.withdrawNFT(item.gameItemNftId, nftAddress, item.signature);
	return transaction;
};


export const unlockNFT1155FromGame = async (gameSC, item) => {
	let nftAddress = process.env.REACT_APP_ASSET_CONTRACT;
	const transaction = await gameSC.withdrawNFT1155(item.nftId,item.quantity ,nftAddress, item.signature);
	return transaction;
};


export const getBoxBalanceOfBatch = async (boxContract, accounts, ids) => {
	if (!accounts || !ids || accounts.length != ids.length) {
		return [];
	}
	const res = await boxContract.balanceOfBatch(accounts, ids);
	return res;
};


export const sellCharacter = async (characterMarketContract, nftId, price) => {
	const assetMarketQuoteToken = process.env.REACT_APP_ASSET_MARKET_TOKEN_KEY ?? 1;
	const args = [nftId, price, assetMarketQuoteToken];
	const transaction = await characterMarketContract.list(...args);
	return transaction;
};


export const getSellCharacterInfo = async (characterMarketContract, saleId) => {
	return characterMarketContract.getSaleInfoById(saleId);
};

export const cancelSellCharacter = async (characterMarketContract, saleId) => {
	const args = [saleId];
	const transaction = await characterMarketContract.cancelListed(...args);
	return transaction;
};

export const buyCharacter = async (characterMarketContract, saleId, price, quoteTokenKey) => {
	let options = {
		value: web3.utils.toWei('0', 'ether')
	};

	if (quoteTokenKey === 0) {
		options['value'] = (price).toString();
	}

	const args = [saleId];
	const transaction = await characterMarketContract.buy(...args, options);
	return transaction;
};

export const getItemBalance = async (gemContract, account, id) => {
	const res = await gemContract.balanceOf(account, id);
	return res;
};

export const sellGemItem = async (gemMarketContract, gemId, quantity, price) => {
	const gemMarketQuoteToken = process.env.REACT_APP_GEM_MARKET_TOKEN_KEY ?? 1;

	const args = [gemId, quantity, price, gemMarketQuoteToken];
	const transaction = await gemMarketContract.list(...args);
	return transaction;
};


export const cancelSellGemItem = async (gemMarketContract, saleId) => {
	const args = [saleId];
	const transaction = await gemMarketContract.cancelListed(...args);
	return transaction;
};

export const getSellGemInfo = async (gemMarketContract, saleId) => {
	return gemMarketContract.getSaleInfoById(saleId);
};


export const buyGem = async (gemMarketContract, saleId, quantity, price) => {
	const gemMarketQuoteToken = process.env.REACT_APP_GEM_MARKET_TOKEN_KEY ?? 1;
	let options = {
		value: web3.utils.toWei('0', 'ether')
	};

	if (gemMarketQuoteToken === 0) {
		options['value'] = (price * quantity).toString();
	}

	const args = [saleId, quantity];
	const transaction = await gemMarketContract.buy(...args, options);
	return transaction;
};
