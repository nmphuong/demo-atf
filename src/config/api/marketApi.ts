import { instance } from './../../apiBase/instance';

export const MarketApi = {
	// Get data asset
	getListAsset(params, type) {
		return instance.get(`my-assets/list-to-market/${type}`, { params });
	},

	// Get data box
	getListMarketBox(params) {
		return instance.get(`my-boxes/list-to-sell`, { params });
	},

	buyBox(data, tokenID) {
		return instance.post(`order-boxes/buy-box-market`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},

	buyAsset(data, tokenID) {
		return instance.post(`orders/buy-asset`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	// GET AUTH
	getAuth(data) {
		return instance.post(`auth-joker`, data);
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
