type IListItemProfile = {
	boxImage: string;
	boxNftId: string;
	campaignId: string;
	boxName: string;
	boxType: string;
	description: string;
	boxPrice: numeber;
	createdBy: string;
	createdDate: string;
	id: number;
	openedBox: number;
	ownerAddress: string;
	quantity: number;
	orderBox: IOrderBox;
	saleId: any;
	sellId: any;
	sellingHash: any;
	sellingPrice: any;
	numSold: any;
	status: any;
	box?: any;
	openRates?: any;
};

type IItemDetail = {
	hostAddress: string;
	id: number;
	itemType: string;
	name: string;
	gameItemNftId: string;
	assetImage: string;
	ownerAddress: string;
	description: string;
	price: number;
	quantity: number;
	rarity: number;
	star: number;
	status: string;
	inGame: any;
	saleId: any;
};

type IOrderBox = {
	box: IBox;
	sellerAddress: string;
};

type IBox = {
	boxName: string;
	description: string;
	openRates: Array<any>;
	buyByToken: string;
};

type IWalletAuthenticate = {
	createdBy: string;
	createdDate: string;
	id: number;
	secretCode: string;
	userAddress: string;
};
