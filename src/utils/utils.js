import web3 from 'web3';
import { ethers } from 'ethers';


export const approveATF = async (atfContract, spender) => {
	const args = [spender, web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1)).toString()];
	const transaction = await atfContract.approve(...args);
	return transaction;
};


export const buyMysteryBox = async (campaignContract, mysteryBoxId, quantity, signature, price, quoteTokenKey) => {

	const args = [mysteryBoxId, quantity, signature];
	console.log(args);
	let options = {
		value: web3.utils.toWei('0', 'ether')
	};
	if (quoteTokenKey === 0) {
		options['value'] = (price * quantity).toString();
	}
	const transaction = await campaignContract.buyMysteryBox(...args, options);
	return transaction;
};


export const buyComboBox = async (campaignContract, comboId, quantity, price, quoteTokenKey) => {

	const args = [comboId, quantity];
	let options = {
		value: web3.utils.toWei('0', 'ether')
	};
	if (quoteTokenKey === 0) {
		options['value'] = (price * quantity).toString();
	}
	const transaction = await campaignContract.buyComboBox(...args, options);
	return transaction;
};

export const getCampaignBoxInfo = async (campaignContract, boxId) => {
	return campaignContract.getCampaignBoxInfo(boxId);
};

export const getComboBoxInfo = async (campaignContract, comboId) => {
	return campaignContract.comboInfo(comboId);
};

export const openBox = async (openBoxContract, boxId, receiptId, erc20TokenAddress, erc20Amount, nftAddress, nftId, nftRarity, nftLevel, uri, sig) => {
	const args = [boxId, receiptId, erc20TokenAddress, erc20Amount, nftAddress, nftId, nftRarity, nftLevel, uri, sig];

	const transaction = await openBoxContract.open(...args);
	return transaction;
};


export const openBoxCharacter = async (openBoxContract, boxId, receiptId, nftId, color, uri, sig) => {
	const args = [boxId, receiptId, nftId, color, uri, sig];

	const transaction = await openBoxContract.openCharacter(...args);
	return transaction;
};

export const openBoxGem = async (openBoxContract, boxId, receiptId, nftId, amount, sig) => {
	const args = [boxId, receiptId, nftId, amount, sig];

	const transaction = await openBoxContract.openGem(...args);
	return transaction;
};

export const openBoxMainToken = async (openBoxContract, boxId, receiptId, amount, sig) => {

	let amountWei = web3.utils.toWei(`${amount}`, 'ether');
	const args = [boxId, receiptId, amountWei, sig];
	const transaction = await openBoxContract.openMainToken(...args);
	return transaction;
};

export const openBoxGameToken = async (openBoxContract, boxId, receiptId, amount, sig) => {
	let amountWei = web3.utils.toWei(`${amount}`, 'ether');
	const args = [boxId, receiptId, amountWei, sig];

	const transaction = await openBoxContract.openGameToken(...args);
	return transaction;
};

export const claimReceipt = async (openBoxContract, receiptId) => {
	const args = [receiptId];

	const transaction = await openBoxContract.claim(...args);
	return transaction;
};

export const approveBox = async (boxContract, spender) => {
	const args = [spender, true];
	const transaction = await boxContract.setApprovalForAll(...args);
	return transaction;
};


export const claimRefBox = async (campaignContract, receiptId, boxRefId, signature) => {
	const args = [receiptId, boxRefId, 1, signature];
	const transaction = await campaignContract.claimReward(...args);
	return transaction;
};
