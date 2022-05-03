import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 0px;
	box-sizing: border-box;
	position: relative;
	z-index: 999;
`;

export const Content = styled.div`
	width: 100%;
	height: 100%;
	padding: 40px 0px;
	box-sizing: border-box;
`;

export const SectionContent = styled.div`
	width: 80%;
	height: 75%;
	margin: auto;
	position: relative;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	padding: 20px 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* border: 3px solid #ffe668; */
	/* background-color: #020223; */
	box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.3);
	/* overflow: hidden; */
	/* border-radius: 20px; */

	:before {
		content: '';
		border-radius: 20px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 4px solid transparent;
		background: linear-gradient(315deg, rgba(255, 230, 104, 0.5), rgba(166, 95, 0, 0) 70%, rgba(254, 154, 3, 1) 100%) border-box;
		-webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		z-index: -1;
	}

	:after {
		content: '';
		border-radius: 20px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 4px solid transparent;
		background: linear-gradient(315deg, rgba(255, 230, 104, 0.5), rgba(166, 95, 0, 0) 100%, rgba(254, 154, 3, 1) 100%) border-box;
		-webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		z-index: -1;
	}

	/* @keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	:before {
		content: '';
		position: absolute;
		width: 150%;
		height: 150%;
		top: -25%;
		left: -25%;
		background: conic-gradient(from 90deg, rgb(255 230 104 / 0%) 70%, rgb(166 95 0 / 9%) 80%, rgb(254 154 3) 100%);
		animation: rotate 5s linear infinite;
	}

	:after {
		content: '';
		position: absolute;
		width: 99%;
		height: 94%;
		background-color: #020223;
		top: 3%;
		border-radius: 30px 0;
	}

	@media (max-width: 1440px) {
		:after {
			width: 98%;
			height: 96%;
			top: 2%;
		}
	}

	@media (max-width: 620px) {
		:after {
			width: 97%;
			height: 96%;
			top: 2%;
		}
	} */

	@media (max-width: 820px) {
		height: 93%;
		width: 100%;
	}
`;

export const ListPartner = styled.div`
	/* display: grid;
    gap: 38px;
    width: 100%;
    grid-template-columns: repeat(6, 1fr);
    @media (max-width: 767px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 479px) {
        grid-template-columns: repeat(3, 1fr);
    } */

	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	column-gap: 16px;
	row-gap: 60px;
	z-index: 10;
	@media (max-width: 650px) {
		gap: 10px;
		width: 100%;
	}

	.cusDev_0 {
		height: 129px;
	}

	@media (max-width: 1024px) {
		column-gap: 20px;

		.cusDev_0 {
			height: 84px;
		}
	}
`;

export const Item = styled.img`
	max-width: 100%;
	height: 80px;

	@media (max-width: 1024px) {
		height: 74px;
	}

	@media (max-width: 820px) {
		height: 74px;
	}

	@media (max-width: 650px) {
		height: 44px;
	}
`;
