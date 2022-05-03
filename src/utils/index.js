import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';

import erc20Abi from 'config/abi/erc20Abi.json';
import { ethers } from 'ethers';
import web3 from 'web3';

import BigNumber from 'bignumber.js';
import CountUp from 'react-countup';

export const BIG_ZERO = new BigNumber(0);
export const BIG_ONE = new BigNumber(1);
export const BIG_NINE = new BigNumber(9);
export const BIG_TEN = new BigNumber(10);

// account is not optional
export function getSigner(library, account) {
	return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library, account) {
	return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address, ABI, library, account) {
	if (!isAddress(address) || address === AddressZero) {
		throw Error(`Invalid 'address' parameter '${address}'.`);
	}

	return new Contract(address, ABI, getProviderOrSigner(library, account));
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
	try {
		return getAddress(value);
	} catch {
		return false;
	}
}

export const approveContract = async (contract, poolAddress, account) => {
	const args = [poolAddress, web3.utils.toBN(2).pow(web3.utils.toBN(256)).sub(web3.utils.toBN(1)).toString()];
	const transaction = await contract.approve(...args);
	return transaction;
};

export const approveAsset = async (itemContract, operator) => {
	const args = [operator, true];
	const transation = await itemContract.setApprovalForAll(...args);
	const receipt = await transation.wait(1);
	return receipt;
};

export const approveStakeAsset = async (itemContract, operator) => {
	const args = [operator, true];
	const transaction = await itemContract.setApprovalForAll(...args);

	return transaction;
};

export const handleStake = async (amount, decimals, account, library, stakeContract) => {
	// const stakeContract = getContract('0x53232F4c41Bf938B4ec82e92e505385e52709EB9', stakingAbi, library);
	let value = web3.utils.toWei(`${amount}`, 'ether');
	console.log('Contract is: ', stakeContract);
	console.log('Amount: ', amount);
	return await stakeContract.deposit(value);
};

export const formatValue = (value, amountFixed) => {
	let newValue = 0;
	value = parseFloat(value);
	if (parseFloat(value) > 0) {
		newValue = value.toFixed(amountFixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	} else {
		newValue = '0,00';
	}

	return newValue;

	// console.log('VAlue Format: ', value);

	// return <CountUp end={value} duration={0.5} separator="," decimals={amountFixed} decimal="," />;
};

export const getSignature = async (account, library, message) => {
	const provider =  getProviderOrSigner(library, account);
	const signature = await provider.signMessage(message);
	return signature;
};
