import { instance } from '../../apiBase/instance';

export const RefCodeApi = {
	genRefCode(data, tokenID) { // gen-ref-code
		return instance.post<any>(`/user-references/gen-ref-code`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	updateRefCode(data, tokenID) { // gen-ref-code
		return instance.post<any>(`/user-references/update-ref-code`, data, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	},
	getMyRefCode(address, tokenID) {
		return instance.get<any>(`/referal-codes/by-address/${address}`, {
			headers: { Authorization: `Bearer ${tokenID}` }
		});
	}
};
