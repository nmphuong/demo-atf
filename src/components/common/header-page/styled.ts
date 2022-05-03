import styled from 'styled-components';

export const Wrapper = styled.div`
	border-radius: 10px;
	background: #16062c;
	box-shadow: 0 3px 6px rgb(0 0 0 / 16%);
	padding: 15px 20px;
	border: 1px solid rgba(246, 206, 105, 1);
	position: sticky;
	top: 10px;
	width: calc(100% - 210px);
	margin-left: auto;
	margin-right: 10px;
	z-index: 98;
	@media (max-width: 991px) {
		width: 96vw;
		margin: 10px 2vw;
	}

	@media (max-width: 620px) {
		position: relative;
	}
`;

export const Content = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 600px) {
		display: block;
		justify-content: center;
	}
	@media (max-width: 767px) {
		justify-content: center;
	}
`;

export const Coin = styled.div`
	display: flex;
	color: #fff;
	@media (max-width: 600px) {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		justify-content: center;
	}
`;

export const Account = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	@media (max-width: 767px) and (min-width: 601px) {
		position: absolute;
		top: 43px;
		right: 50px;
		z-index: 99;
	}
	@media (max-width: 600px) {
		padding-top: 20px;
		display: none;
	}
	/* @media (max-width: 479px) {
		display: flex;
		justify-content: center;
		padding-top: 20px;
	} */
`;

export const Item = styled.div`
	display: flex;
	justifify-content: center;
	align-items: center;
	padding: 0px 10px;
	gap: 4px;
	font-weight: bold;
	font-size: 24px;
	color: #fff;

	@media (max-width: 620px) {
		padding: 0px;
		font-size: 18px;
	}

	@media (max-width: 420px) {
		padding: 0px;
	}
`;

export const IconCoin = styled.img`
	width: 40px;
	height: 40px;
`;

export const ContentWallet = styled.div`
	height: 45px;
	bottom: 0;
	// background: linear-gradient(#fd9c00 0,#fdc325 100%);
	background: url('/assets/images/mysterybox/button-connect-wallet.svg');
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	padding: 0 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
`;

export const TextWallet = styled.p`
	font-size: 18px;
	font-weight: bold;
	background: linear-gradient(180deg, #fe9a03 0%, #502f03 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

export const IconToken = styled.img`
	width: 80px;
`;

export const BoxCus = styled.div`
	display: inline-block;
	@media (max-width: 990px) {
		display: none;
	}
`;
