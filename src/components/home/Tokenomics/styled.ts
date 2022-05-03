import styled, { keyframes } from 'styled-components';
import BgTotal from '../../../public/images/home/tokenomics/TotalBg.png';
import BgHole from '../../../public/images/home/tokenomics/blackhole.webp';
import AniNumGae from '../../../public/images/home/tokenomics/AniNumGae.png';

export const Wrapper = styled.div`
	padding: 50px 0 0;
	background-repeat: no-repeat;
	background-position: top;
	background-size: cover;

	.AnimaTokennomics {
		animation-name: jackInTheBox;
		animation-duration: 3s;
		transform-origin: top center;
	}

	@keyframes jackInTheBox {
		from {
			opacity: 0;
			transform: scale(0.1);
			transform-origin: center bottom;
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}
`;

export const Container = styled.div<{ background?: any }>`
	width: 100%;
	margin-right: auto;
	margin-left: auto;
	position: relative;
	@media (min-width: 576px) {
		max-width: 540px;
	}
	@media (min-width: 768px) {
		max-width: 720px;
	}
	@media (min-width: 992px) {
		max-width: 960px;
	}
	@media (min-width: 1200px) {
		max-width: 1140px;
	}
	@media (max-width: 479px) {
		display: none;
	}
`;

export const TokenomicsImg = styled.img`
	width: 80%;
	@media (max-width: 479px) {
		display: none;
	}
`;

export const TokenomicsImgMB = styled.img`
	@media (min-width: 480px) {
		display: none;
	}
	@media (max-width: 479px) {
		width: 95%;
	}
`;

export const GroupButton = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

export const Content = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	.percentage-indicator {
	}
`;

export const PercentageIndicator = styled.p`
	position: absolute;
	font-family: 'Agencyfb';
	font-style: normal;
	font-weight: 700;
	font-size: 50px;
	line-height: 168.9%;
	display: flex;
	align-items: center;
	text-align: center;
	color: #ffffff;
	font-size: 50px;
	:first-child {
		right: 34%;
		top: -4%;
	}
	:nth-child(2) {
		right: 16%;
		top: 14%;
	}
	:nth-child(3) {
		right: 24%;
		top: 74%;
	}
	:nth-child(4) {
		right: 63%;
		top: 79%;
	}
	:nth-child(5) {
		right: 72%;
		top: 47%;
	}
	:nth-child(6) {
		right: 72%;
		top: 20%;
	}
	:last-child {
		right: 67%;
		top: 4%;
	}
	@media (min-width: 1300px) and (max-width: 1700px) {
		font-size: 50px;
		:first-child {
			right: 34%;
			top: -4%;
		}
		:nth-child(2) {
			right: 16%;
			top: 14%;
		}
		:nth-child(3) {
			right: 24%;
			top: 74%;
		}
		:nth-child(4) {
			right: 63%;
			top: 79%;
		}
		:nth-child(5) {
			right: 72%;
			top: 47%;
		}
		:nth-child(6) {
			right: 72%;
			top: 20%;
		}
		:last-child {
			right: 67%;
			top: 4%;
		}
	}
	@media (max-width: 1400px) and (min-width: 1200px) {
		font-size: 50px;
		:first-child {
			right: 34%;
			top: -3%;
		}
		:nth-child(2) {
			right: 19%;
			top: 15%;
		}
		:nth-child(3) {
			right: 24%;
			top: 75%;
		}
		:nth-child(4) {
			right: 63%;
			top: 79%;
		}
		:nth-child(5) {
			right: 72%;
			top: 47%;
		}
		:nth-child(6) {
			right: 72%;
			top: 20%;
		}
		:last-child {
			right: 67%;
			top: 4%;
		}
	}
	@media (max-width: 1199px) and (min-width: 992px) {
		font-size: 40px;
		:first-child {
			right: 34%;
			top: -3%;
		}
		:nth-child(2) {
			right: 19%;
			top: 15%;
		}
		:nth-child(3) {
			right: 24%;
			top: 75%;
		}
		:nth-child(4) {
			right: 63%;
			top: 79%;
		}
		:nth-child(5) {
			right: 70%;
			top: 47%;
		}
		:nth-child(6) {
			right: 70%;
			top: 20%;
		}
		:last-child {
			right: 65%;
			top: 5%;
		}
	}
	@media (max-width: 991px) and (min-width: 768px) {
		font-size: 30px;
		:first-child {
			right: 34%;
			top: -3%;
		}
		:nth-child(2) {
			right: 20%;
			top: 15%;
		}
		:nth-child(3) {
			right: 24%;
			top: 75%;
		}
		:nth-child(4) {
			right: 63%;
			top: 79%;
		}
		:nth-child(5) {
			right: 70%;
			top: 47%;
		}
		:nth-child(6) {
			right: 70%;
			top: 20%;
		}
		:last-child {
			right: 65%;
			top: 5%;
		}
	}
	@media (max-width: 767px) and (min-width: 480px) {
		font-size: 20px;
		:first-child {
			right: 34%;
			top: -3%;
		}
		:nth-child(2) {
			right: 19%;
			top: 15%;
		}
		:nth-child(3) {
			right: 24%;
			top: 75%;
		}
		:nth-child(4) {
			right: 63%;
			top: 79%;
		}
		:nth-child(5) {
			right: 70%;
			top: 47%;
		}
		:nth-child(6) {
			right: 70%;
			top: 20%;
		}
		:last-child {
			right: 60%;
			top: 5%;
		}
	}
	@media (max-width: 479px) {
		font-size: 14px;
		:first-child {
			right: 34%;
			top: -3%;
		}
		:nth-child(2) {
			right: 19%;
			top: 15%;
		}
		:nth-child(3) {
			right: 24%;
			top: 75%;
		}
		:nth-child(4) {
			right: 60%;
			top: 79%;
		}
		:nth-child(5) {
			right: 70%;
			top: 47%;
		}
		:nth-child(6) {
			right: 70%;
			top: 20%;
		}
		:last-child {
			right: 65%;
			top: 5%;
		}
	}
`;

export const GroupDesc = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 99;
	left: 0;
`;

const boxAnimate = keyframes`
    0%, 100% {
        box-shadow: 0px 0px 10px #5EE2FF;
    }
    50% {
        box-shadow: 0px 0px 5px #5EE2FF;
    }
`;

export const Desc = styled.p`
	font-family: 'Agencyfb';
	font-style: normal;
	font-weight: 700;
	font-size: 26px;
	line-height: 168.9%;
	color: #ffffff;
	border: 1px solid #0bc4ff;
	box-sizing: border-box;
	border-radius: 10px;
	position: absolute;
	margin: 0;
	padding: 0px 20px;
	:hover {
		animation: ${boxAnimate} linear 1s infinite;
	}
	:first-child {
		right: 22%;
		top: 3%;
	}
	:nth-child(2) {
		right: -5%;
		top: 22%;
	}
	:nth-child(3) {
		right: 5%;
		top: 82%;
	}
	:nth-child(4) {
		right: 73%;
		top: 86%;
	}
	:nth-child(5) {
		right: 80%;
		top: 54%;
	}
	:nth-child(6) {
		right: 80%;
		top: 27%;
	}
	:last-child {
		right: 75%;
		top: 12%;
	}
	@media (min-width: 1300px) and (max-width: 1700px) {
		font-size: 26px;
		:first-child {
			right: 22%;
			top: 3%;
		}
		:nth-child(2) {
			right: -5%;
			top: 22%;
		}
		:nth-child(3) {
			right: 5%;
			top: 82%;
		}
		:nth-child(4) {
			right: 73%;
			top: 86%;
		}
		:nth-child(5) {
			right: 80%;
			top: 54%;
		}
		:nth-child(6) {
			right: 80%;
			top: 27%;
		}
		:last-child {
			right: 75%;
			top: 12%;
		}
	}
	@media (max-width: 1400px) and (min-width: 1200px) {
		font-size: 20px;
		:first-child {
			right: 22%;
			top: 3%;
		}
		:nth-child(2) {
			right: 0%;
			top: 22%;
		}
		:nth-child(3) {
			right: 7%;
			top: 82%;
		}
		:nth-child(4) {
			right: 73%;
			top: 86%;
		}
		:nth-child(5) {
			right: 80%;
			top: 54%;
		}
		:nth-child(6) {
			right: 80%;
			top: 27%;
		}
		:last-child {
			right: 75%;
			top: 12%;
		}
	}
	@media (max-width: 1199px) and (min-width: 992px) {
		font-size: 20px;
		:first-child {
			right: 22%;
			top: 3%;
		}
		:nth-child(2) {
			right: 0%;
			top: 22%;
		}
		:nth-child(3) {
			right: 7%;
			top: 82%;
		}
		:nth-child(4) {
			right: 73%;
			top: 86%;
		}
		:nth-child(5) {
			right: 80%;
			top: 54%;
		}
		:nth-child(6) {
			right: 80%;
			top: 27%;
		}
		:last-child {
			right: 75%;
			top: 12%;
		}
	}
	@media (max-width: 991px) and (min-width: 768px) {
		font-size: 16px;
		:first-child {
			right: 20%;
			top: 3%;
		}
		:nth-child(2) {
			right: -2%;
			top: 22%;
		}
		:nth-child(3) {
			right: 6%;
			top: 82%;
		}
		:nth-child(4) {
			right: 73%;
			top: 86%;
		}
		:nth-child(5) {
			right: 80%;
			top: 54%;
		}
		:nth-child(6) {
			right: 80%;
			top: 27%;
		}
		:last-child {
			right: 75%;
			top: 12%;
		}
	}
	@media (max-width: 767px) and (min-width: 480px) {
		font-size: 12px;
		:first-child {
			right: 15%;
			top: 3%;
		}
		:nth-child(2) {
			right: 2%;
			top: 28%;
		}
		:nth-child(3) {
			right: 2%;
			top: 82%;
		}
		:nth-child(4) {
			right: 73%;
			top: 86%;
		}
		:nth-child(5) {
			right: 80%;
			top: 54%;
		}
		:nth-child(6) {
			right: 80%;
			top: 27%;
		}
		:last-child {
			right: 71%;
			top: 10%;
		}
	}
	@media (max-width: 479px) {
		font-size: 12px;
		:first-child {
			right: 15%;
			top: 3%;
		}
		:nth-child(2) {
			right: 2%;
			top: 28%;
			width: 100px;
		}
		:nth-child(3) {
			right: 4%;
			top: 88%;
		}
		:nth-child(4) {
			right: 68%;
			top: 85%;
		}
		:nth-child(5) {
			right: 77%;
			top: 54%;
		}
		:nth-child(6) {
			right: 80%;
			top: 27%;
		}
		:last-child {
			right: 71%;
			top: 3%;
		}
	}
`;

export const ContainerMobile = styled.div`
	width: 100%;
	margin-right: auto;
	margin-left: auto;
	position: relative;
	@media (min-width: 576px) {
		max-width: 540px;
	}
	@media (min-width: 768px) {
		max-width: 720px;
	}
	@media (min-width: 992px) {
		max-width: 960px;
	}
	@media (min-width: 1200px) {
		max-width: 1140px;
	}
	@media (max-width: 479px) {
		max-width: 100%;
		padding: 0px 0px;
		box-sizing: border-box;
	}
`;

const boxAnimatezz = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        
    }
`;

//
export const BoxTotal = styled.div`
	background: url(${BgTotal});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	padding: 165px 0;
	margin: 100px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 1;

	:after {
		content: '';
		width: 58%;
		height: 100%;
		background: url(${BgHole});
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		position: absolute;
		z-index: 10;
		left: 23%;
		transform: translateX(-48%);
		top: -8px;
		animation: ${boxAnimatezz} linear 30s infinite;
	}

	@media (max-width: 1024px) {
		padding: 80px 0;
		background-size: contain;
		:after {
			content: '';
			width: 50%;
			left: 27%;
		}
	}
`;

export const DescTitle = styled.div`
	margin: 0;
	padding: 0;
	color: #fff;
	position: absolute;
	font-weight: 700;
	font-size: 24px;

	h1 {
		display: inline-block;
		color: #fff;
		font-size: 24px;
		font-weight: 700 !important;
	}

	:nth-child(2) {
		top: 14px;
		left: 0px;
	}

	:nth-child(3) {
		top: 37%;
		left: 7%;
	}
	:nth-child(4) {
		top: 80%;
		left: -10px;
	}
	:nth-child(5) {
		top: 5%;
		left: 83%;
	}
	:nth-child(6) {
		top: 30%;
		right: -12%;
	}
	:nth-child(7) {
		top: 92%;
		right: 2%;
	}

	.typed-cursor {
		opacity: 0;
	}

	@media (max-width: 1280px) {
		:nth-child(6) {
			right: -5%;
		}
	}

	@media (max-width: 1024px) {
		font-size: 20px;

		:nth-child(2) {
			top: 14px;
			left: 48px;
		}

		:nth-child(3) {
			top: 37%;
			left: 14%;
		}
		:nth-child(4) {
			top: 80%;
			left: 72px;
		}
		:nth-child(5) {
			top: 5%;
			left: 74%;
		}
		:nth-child(6) {
			top: 30%;
			right: -2%;
		}
		:nth-child(7) {
			top: 92%;
			right: 7%;
		}
	}
`;

const boxAnimatez = keyframes`
    0%, 100% {
        box-shadow: 0px 0px 10px #5EE2FF;
    }
    50% {
        box-shadow: 0px 0px 5px #5EE2FF;
    }
`;

export const DescTotal = styled.h1`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 222px;
	font-family: 'Agencyfb';
	font-style: normal;
	font-weight: 700 !important;
	font-size: 40px;
	color: #ffffff;
	border: 1px solid #0bc4ff;
	box-sizing: border-box;
	border-radius: 10px;
	margin: 0;
	padding: 0px 20px;
	animation: ${boxAnimatez} linear 4s infinite;
`;

export const BoxAfter = styled.div`
	width: 100%;
	height: 100%;
	z-index: 99;
	margin-left: 40px;
`;

export const Containerz = styled.div<{ background?: any }>`
	width: 100%;
	margin-right: auto;
	margin-left: auto;
	position: relative;
	min-height: 50px;
	@media (min-width: 576px) {
		max-width: 540px;
	}
	@media (min-width: 768px) {
		max-width: 720px;
	}
	@media (min-width: 992px) {
		max-width: 960px;
	}
	@media (min-width: 1200px) {
		max-width: 1140px;
	}

	h1 {
		display: inline-block;
		color: #fff;
		font-size: 24px;
		font-weight: 700 !important;
	}
`;

