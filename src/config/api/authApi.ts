import { instance } from '../../apiBase/instance';

type paramAsset = {
	itemTypeEnumList: Array<string>;
	ownerAddress: string | null | undefined;
	statusList: Array<string>;
	page: number;
	size: number;
};

export const AuthApi = {
	getAuth(data) {
		return instance.post(`auth-joker`, data);
	}
};
