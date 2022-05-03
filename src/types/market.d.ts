type IListAsset = {
	burnHash: string;
	catalog: any;
	createdBy: string;
	createdDate: string;
	id: number;
	itemType: string;
	mintHash: string;
	name: string;
	nftId: string;
	nftImage: string;
	ownerAddress: string;
	ownerAddressInGame: string;
	rarity: number;
	refId: number;
	star: number;
	status: string;
	tokenURI: string;
	used: boolean;
	price: string;
	orderBox: any;
	sellingPrice: any;
	saleId: any;
	assetId: any;
	quoteToken: number;
};

type IListBox = {
	createdBy: string;
	createdDate: string;
	id: number;
	ownerAddress: string;
	boxNftId: string;
	quantity: number | any;
	total: number | any;
	boxImage: string;
	boxPrice: number;
	status: string;
	hostAddress: any;
	sellId: any;
	sellingPrice: any;
	sellingHash: any;
	orderBox: any;
	boxName: any;
	myBoxId: any;
	rates: any;
	numSold: any;
	quoteToken: any;
	maxQuantity: any;
	isOwner: boolean;
};