import { instance } from '../../apiBase/instance';

type paramAsset = {
	gameItemTypeList: Array<string>;
	ownerAddress: string | null | undefined;
	statusList: Array<string>;
	page: number;
	size: number;
};

export const MyBoxApi = {
	// Get data box
	// getDataBox(params, address) {
	// 	return instance.get<IListItemProfile[]>(`my-boxes/${address}/client`, {
	// 		params
	// 	});
	// },
	getMysteryBox() {
		return instance.get<any>(`/boxes/client`, {
			params: { sort: 'id' },
			// headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	getDataBox(params, tokenID, account) {
		const dataF = {
			ownerAddress: account,
			statusList: params.statusList
		}
		return instance.post<IListItemProfile[]>(`my-boxes/filter?page=${params.page}&size=${params.size}&sort=id,desc`, dataF, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getDataBoxClaim(params, tokenID) {
		return instance.post<IListItemProfile[]>(`claim-boxes/filter`, params, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	// Get data asset
	getDataAsset(data: paramAsset, tokenID, account) {
		const dataF = {
			gameItemTypeList: data.gameItemTypeList,
			ownerAddress: account,
			statusList: data.statusList
		}
		return instance.post(`my-assets/filter?page=${data.page}&size=${data.size}&sort=id,desc`, dataF, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	getMyBox(params, address, id, tokenID) {
		return instance.get<IListItemProfile>(`my-boxes/${id}/address/${address}/client`, {
			params,
			// headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getDataWithdrawal(address, type, tokenID) {
		return instance.get<any>(`account-balances/${address}/action/${type}?sort=id,desc`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getDataClaims(address, type, tokenID) {
		return instance.get<any>(`account-balances/${address}/action/${type}?sort=id,desc`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getRequestUnlockByNftId(address, tokenType, tokenID) {
		return instance.get<any>(`withdraw-tokens/${address}/type/${tokenType}`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getDataDeposits(address, type, tokenID) {
		return instance.get<any>(`account-balances/${address}/action/${type}?sort=id,desc`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	minDeposits(address, tokenID) {
		return instance.get<any>(`/settings/mine`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	depositToken(data, tokenID) {
		return instance.put<any>(`account-balances/process-deposit`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	requestDepositToken(data, tokenID) {
		return instance.post<any>(`account-balances/deposit`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	processwithdraw(data, id, tokenID) {
		return instance.put<any>(`account-balances/process-withdraw`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	nftToGame(data, id, tokenID) {
		return instance.put<any>(`my-assets/to-game/${id}`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	nftToMarket(data, id, tokenID) {
		return instance.put<any>(`/my-assets/process-to-market/${id}`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	craftNFT(data, id, tokenID) {
		return instance.put<any>(`craft-nft/after-mint/${id}`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	mintNFT(data, id, tokenID) {
		return instance.put<any>(`my-assets/after-claim`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	beforeMintNFT(data, id, tokenID) {
		return instance.put<any>(`my-assets/before-claim`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getBoxDetail(id, tokenID) {
		return instance.get<IListItemProfile>(`boxes/${id}`, {
			// headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getBoxDetailClient(id, account, refCode) {
		const queryAccount = account ? `address=${account}` : ''
		const queryRefCode = refCode ? `&refCode=${refCode}` : ''
		if (!account) {
			return instance.get<IListItemProfile>(`boxes/${id}/client`, {
				// headers: { Authorization: `Bearer ${tokenID}` }
			});
		} else {
			return instance.get<IListItemProfile>(`boxes/${id}/client?${queryAccount}${queryRefCode}`, {
				// headers: { Authorization: `Bearer ${tokenID}` }
			});
		}

	},
	getMyBoxDetailClient(id, tokenID) {
		return instance.get<IListItemProfile>(`my-boxes/${id}`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	randomItem(address, id, tokenID) {
		return instance.get<any>(`my-boxes/open-box/${id}/address/${address}/open`, {
			headers: { Authorization: `Bearer ${tokenID}` },
		});
	},
	getItemDetailByAddress(id, account, tokenID) {
		return instance.get(`my-assets/address/${account}/nft-id/${id}/client`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getItem(itemId) {
		return instance.get<any>(`my-assets/${itemId}/client`);
	},

	updateAfterRandom(data, tokenID) {
		return instance.put<any>(`game-items/after-mint`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	buyBox(data, tokenID) {
		return instance.post<any>(`/order-boxes/buy-box`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	claimBox(data, id,tokenID) {
		return instance.put<any>(`/my-boxes/${id}/claim`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	buyComboBox(data) {
		return instance.post<any>(`/order-boxes/buy-combo-box`, data);
	},

	transferBox(data, tokenID) {
		return instance.post<any>(`/order-boxes/transfer`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	transferAsset(data, tokenID) {
		return instance.post<any>(`/my-assets/transfer`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	sellMyBox(data, tokenID) {
		return instance.put<any>(`/my-boxes/to-sell`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	sellMyAsset(data, tokenID) {
		return instance.put<any>(`/my-assets/to-sell`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	buyAsset(data, tokenID) {
		return instance.put<any>(`/order-items/buy-item`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	cancelMyBox(data, tokenID) {
		return instance.put<any>(`/my-boxes/cancel-sell`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	cancelMyAsset(data, tokenID) {
		return instance.put<any>(`/my-assets/cancel-sell`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	getWhitelist(params, address) {
		return instance.get<any>(`white-lists/${address}/client`, {
			params
		});
	},
	getMyCraftNFT(address, tokenID) {
		return instance.get<any>(`my-craft-nft/${address}`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getMintNFT(address, tokenID) {
		return instance.get<any>(`my-craft-nft/${address}`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getLuckySpinInfo() {
		return instance.get<any>(`/lucky-draw/info`, {
			// headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	claimSpinRoundReward(data, tokenID) {
		return instance.post<any>(`/lucky-draw/claim`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	}

	// Thêm mới data
	// add(data) {
	// 	return instance.post(url, data);
	// },
	// update mới data
	// update(data) {
	// 	return instance.put(url, data);
	// },
};
