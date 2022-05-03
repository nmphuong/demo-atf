import { Contract } from '@ethersproject/contracts';

import { useMemo } from 'react';

import { getContract } from 'utils';
import boxAbi from 'config/abi/boxAbi.json';
import marketAbi from 'config/abi/marketAbi.json';
import campaignAbi from 'config/abi/campaignAbi.json';
import factoryAbi from 'config/abi/factoryAbi.json';
import boxMarketAbi from 'config/abi/boxMarketAbi.json';
import assetMarketAbi from 'config/abi/assetMarketAbi.json';
import abiJoinPresale from 'config/abi/abiJoinPresale.json';
import assetAbi from 'config/abi/assetAbi.json';
import zwzAbi from 'config/abi/tokenAbi.json';
import atfAbi from 'config/abi/atfTokenAbi.json';
import openBoxAbi from 'config/abi/openBoxAbi.json';
import bookingVRAbi from 'config/abi/bookingVRAbi.json';
import nftAbi from 'config/abi/nftAbi.json';
import stakingAbi from 'config/abi/stakingAbi.json';
import stakeNFTAbi from 'config/abi/stakeNFTAbi.json';
import gameAbi from 'config/abi/AbiGameContract.json';
import brainTokenAbi from 'config/abi/brainTokenAbi.json';
import gamePlayAbi from 'config/abi/gamePlayAbi.json';
import gemTokenAbi from 'config/abi/gemTokenAbi.json';
import gaeTokenAbi from 'config/abi/gaeTokenAbi.json';
import characterNFTAbi from 'config/abi/characterNFTAbi.json';
import gemNFTAbi from 'config/abi/gemNFTAbi.json';
import characterMarketAbi from 'config/abi/characterMarketAbi.json';
import gemMarketAbi from 'config/abi/gemMarketAbi.json';

import { useActiveWeb3React } from './index';
// returns null on errors
export function useContract(address, ABI, withSignerIfPossible = true) {
	const { library, account } = useActiveWeb3React();

	return useMemo(() => {
		if (!address || !ABI || !library) return null;
		try {
			return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
		} catch (error) {
			console.error('Failed to get contract', error);
			return null;
		}
	}, [address, ABI, library, withSignerIfPossible, account]);
}

export function useMysteryBoxContract(scAddr) {
	return useContract(scAddr, boxAbi);
}
export function useMarketContract(scAddr) {
	return useContract(scAddr, marketAbi);
}

export function useCampaignContract(scAddr) {
	return useContract(scAddr, campaignAbi);
}

export function useFactoryContract(scAddr) {
	return useContract(scAddr, factoryAbi);
}

export function useBoxMarketContract(scAddr) {
	return useContract(scAddr, boxMarketAbi);
}

export function useJoinPoolContract(scAddr) {
	return useContract(scAddr, abiJoinPresale, true);
}

export function useAssetContract(scAddr) {
	return useContract(scAddr, assetAbi);
}

export function useAssetMarketContract(scAddr) {
	return useContract(scAddr, assetMarketAbi);
}

export function useZWZContract(scAddr) {
	return useContract(scAddr, zwzAbi);
}
export function useBookingVRContract(scAddr) {
	return useContract(scAddr, bookingVRAbi);
}

export function useStakingNFTContract(scAddr) {
	return useContract(scAddr, stakeNFTAbi);
}
export function useStakingContract(scAddr) {
	return useContract(scAddr, stakingAbi);
}
export function useGameContract(scAddr) {
	return useContract(scAddr, gameAbi);
}
export function useBrainContract(scAddr) {
	return useContract(scAddr, brainTokenAbi);
}

export function useATFContract(scAddr) {
	return useContract(scAddr, atfAbi);
}

export function useOpenBoxContract(scAddr) {
	return useContract(scAddr, openBoxAbi);
}

export function useGamePlayContract(scAddr) {
	return useContract(scAddr, gamePlayAbi);
}

export function useGAEContract(scAddr) {
	return useContract(scAddr, gaeTokenAbi);
}

export function useGEMContract(scAddr) {
	return useContract(scAddr, gemTokenAbi);
}

export function useCharacterNFTContract(scAddr) {
	return useContract(scAddr, characterNFTAbi);
}


export function useGemNFTContract(scAddr) {
	return useContract(scAddr, gemNFTAbi);
}

export function useCharacterMarketContract(scAddr) {
	return useContract(scAddr, characterMarketAbi);
}

export function useGemrMarketContract(scAddr) {
	return useContract(scAddr, gemMarketAbi);
}

