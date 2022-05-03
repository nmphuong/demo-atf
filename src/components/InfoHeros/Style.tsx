import styled, { keyframes } from 'styled-components';

import bgIconHeroes from '../../public/images/HerosDetail/BgIconHeroes.webp';
import ImgFocus from '../../public/images/HerosDetail/class-focus.webp';

import IconBg from '../../public/images/home/banner/planets2.svg';

const AnimaStar = keyframes`
  from {
	    transform: translateY(0px);
	}
	to {
	    transform: translateY(-2000px);
	}
`;

const AnimaScale = keyframes`
  from {
	    transform: scale(0.9);
	}
	to {
	    transform:  scale(1);
	}
`;

export const Star = styled.div`
	width: 2px;
	height: 2px;
	background: transparent;
	box-shadow: 849px 4022px #fff, 525px 1557px #fff, 1857px 1674px #fff, 1695px 258px #fff, 7px 1616px #fff, 934px 767px #fff,
		812px 390px #fff, 1485px 661px #fff, 1361px 784px #fff, 177px 1421px #fff, 779px 171px #fff, 716px 177px #fff, 174px 1834px #fff,
		1792px 1349px #fff, 1282px 136px #fff, 650px 126px #fff, 808px 994px #fff, 1680px 1158px #fff, 282px 869px #fff, 1823px 569px #fff,
		281px 520px #fff, 622px 380px #fff, 570px 851px #fff, 1433px 1334px #fff, 1020px 1100px #fff, 196px 822px #fff, 310px 1464px #fff,
		1436px 759px #fff, 457px 190px #fff, 1110px 1696px #fff, 360px 747px #fff, 297px 626px #fff, 1004px 372px #fff, 1154px 85px #fff,
		1938px 1234px #fff, 574px 979px #fff, 417px 570px #fff, 952px 1116px #fff, 859px 1207px #fff, 1577px 1292px #fff, 224px 205px #fff,
		523px 1101px #fff, 62px 466px #fff, 1987px 1947px #fff, 884px 621px #fff, 375px 530px #fff, 1327px 358px #fff, 1042px 1865px #fff,
		1869px 531px #fff, 1123px 643px #fff, 827px 1030px #fff, 1451px 1661px #fff, 1847px 484px #fff, 418px 1424px #fff,
		1133px 1524px #fff, 1361px 13px #fff, 913px 1335px #fff, 1576px 363px #fff, 957px 1008px #fff, 905px 714px #fff, 353px 624px #fff,
		1006px 671px #fff, 691px 963px #fff, 1953px 79px #fff, 1938px 736px #fff, 1120px 1346px #fff, 257px 513px #fff, 541px 1605px #fff,
		1974px 1375px #fff, 275px 421px #fff, 1410px 485px #fff, 1878px 795px #fff, 1069px 1329px #fff, 1360px 341px #fff, 240px 451px #fff,
		714px 1579px #fff, 1740px 70px #fff, 1263px 765px #fff, 1497px 1722px #fff, 1767px 174px #fff, 453px 1742px #fff, 140px 911px #fff,
		1356px 1745px #fff, 12px 237px #fff, 1428px 1882px #fff, 1923px 293px #fff, 23px 678px #fff, 528px 1532px #fff, 14px 36px #fff,
		1538px 1091px #fff, 62px 1457px #fff, 1060px 508px #fff, 268px 1479px #fff, 465px 38px #fff, 1112px 1512px #fff, 1630px 1110px #fff,
		1147px 1149px #fff, 1030px 1277px #fff, 172px 953px #fff, 214px 1109px #fff;
	animation: ${AnimaStar} 50s linear infinite;

	&:after {
		content: ' ';
		position: absolute;
		top: 100%;
		width: 2px;
		/* height: 2px; */
		background: transparent;
		z-index: 1;
	}
`;

export const Wrapper = styled.div`
	background-color: rgb(22, 6, 44);
	width: 100%;
	overflow-x: hidden;
	min-height: 250vh;
	position: relative;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url(${IconBg});
		background-repeat: no-repeat;
		background-size: contain;
		background-position: -50px 250px;
		filter: grayscale(1);
		opacity: 0.3;
		z-index: 0;
	}

	.ant-tabs-tab-active {
		background-image: url(${ImgFocus});
		background-size: cover;

		background-position: center;
		background-repeat: no-repeat;
		z-index: 9999;
		position: relative;
		height: 76px;
		animation: ${AnimaScale} 0.3s linear;
	}

	/* .cusBg {
		background-image: url(${ImgFocus});
		background-size: cover;

		background-position: center;
		background-repeat: no-repeat;
		z-index: 9999;
		position: relative;
		height: 83px;
	} */

	.bgIconHeroes {
		/* background-image: url(${bgIconHeroes}); */
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		display: block;
		width: 47px;
		height: 44px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar,
	.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-ink-bar,
	.ant-tabs-top > .ant-tabs-nav::before,
	.ant-tabs-top > div > .ant-tabs-nav::before {
		display: none !important;
	}

	.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
		color: #f8d28a !important;
	}

	.ant-tabs-top > .ant-tabs-nav,
	.ant-tabs-bottom > .ant-tabs-nav,
	.ant-tabs-top > div > .ant-tabs-nav,
	.ant-tabs-bottom > div > .ant-tabs-nav {
		margin: 0;

		background: linear-gradient(
			91.59deg,
			#16062c -0.31%,
			#3b2657 9.13%,
			#2f1b49 33.83%,
			#16062c 48.29%,
			#281641 63.61%,
			#3b2657 88.11%,
			#16062c 101.96%
		);
		box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.8);
		border-radius: 10px;
	}

	.ant-tabs-tab + .ant-tabs-tab {
		margin: 0;
	}

	.ant-tabs-tab:hover,
	.ant-tabs-tab-btn:focus,
	.ant-tabs-tab-remove:focus,
	.ant-tabs-tab-btn:active,
	.ant-tabs-tab-remove:active {
		color: #f8d28a !important;
	}

	.ant-tabs {
		color: #fff;
	}

	.ant-tabs-tab {
		padding: 0;
	}

	.cusImgArr {
		width: calc(2 / 10 * 100%);
		display: inline-block;
		transition: all 0.4s ease-out;
		filter: saturate(0.8);

		img {
			padding: 10px;
		}

		&:hover {
			transform: scale(1.1);
			/* box-shadow: 3px 3px 8px #000; */
			background-size: 100%;
			filter: saturate(1);
			z-index: 4;

			img {
				box-shadow: 3px 3px 8px #000;
				border-radius: 20px;
				z-index: 99;
			}
		}
	}

	.cusSpan {
		font-size: 24px;
	}

	.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
		gap: 8px;

		@media (max-width: 1024px) {
			padding-right: 0px;
		}
	}

	@media (max-width: 730px) {
		.cusImgArr {
			width: calc(3 / 12 * 100%);
		}
	}

	@media (max-width: 600px) {
		.cusImgArr {
			width: calc(4 / 12 * 100%);
		}
	}

	.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap {
		padding: 6px 0;
		justify-content: flex-start;
		margin-left: 100px;
		@media (min-width: 1440px) {
			min-width: 1000px;
		}

		@media (max-width: 768px) {
			min-width: 100%;
			margin-left: 50px;
		}

		@media (max-width: 425px) {
			margin-left: 4px;
		}
	}

	.ant-tabs-content-animated {
		transition: margin 0.7s;
	}

	.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn div img {
		position: relative;
	}

	.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn bgIconHeroes {
		position: relative;
	}

	.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn bgIconHeroes:after {
		content: '';
		position: absolute;
		background: blue;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}

	.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn div img:after {
		content: '';
		position: absolute;
		background: blue;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}

	.ant-tabs-nav {
		border: 10px solid;
		border-image-slice: 1;
		border-width: 4px;
		border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
		border-radius: 12px;
	}
`;

export const BoxFlex = styled.div<{ align?: string; justify?: string; direc?: boolean; gap?: string; mt?: string; pt?: string }>`
	display: flex;
	flex-direction: ${({ direc }) => (direc ? 'column' : 'row')};
	align-items: ${({ align }) => align || 'center'};
	justify-content: ${({ justify }) => justify && justify};
	margin-top: ${({ mt }) => mt && mt};
	padding-top: ${({ pt }) => pt && pt};
	gap: ${({ gap }) => gap && gap};
`;

export const Title = styled.h1`
	font-family: 'Rodfattwo-Demo';
	padding-bottom: 40px;
	font-size: 70px;
	color: #f8d28a;
	font-weight: 700;
	margin-bottom: 10px;
	text-transform: uppercase;
	letter-spacing: 3px;
	line-height: 112%;

	@media (max-width: 767px) {
		font-size: 30px;
	}

	@media (max-width: 390px) {
		font-size: 26px;
	}
`;

export const Desc = styled.p`
	font-size: 18px;
	font-family: 'Agencyfb';
	color: #ddd;
	font-weight: 700;
	margin-bottom: 30px;
	letter-spacing: 3px;
	line-height: 112%;
	max-width: 54%;
	text-align: center;

	@media (max-width: 767px) {
		font-size: 16px;
		text-align: center;
		max-width: 90%;
	}
`;

export const BoxSelectRace = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 20px;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #11111190;
	margin-top: 20px;
	color: #fff;
	position: relative;
	overflow-x: hidden;

	h3 {
		color: #fff !important;
		margin: 0;
		z-index: 1;
	}
	.ant-tabs-content-holder {
		// position: absolute;
		// top: 0;
		// left: 0;
		margin-top: 50px;
		width: 100%;
		height: 100%;
	}
	.ant-tabs-nav-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.ant-tabs-nav {
		padding: 4px 0px;
		box-shadow: 0px 0px 30px #00000050;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
	}
`;

export const BoxTabsCus = styled.div`
	min-height: 250vh;
	position: relative;
	.filter-hero {
		display: none !important;
		position: absolute;
		top: 10px;
		left: 20px;
	}
	.search-hero {
		position: absolute;
		top: 28px;
		right: 4%;
		z-index: 99;
		width: 20%;

		.ant-input-affix-wrapper {
			background-color: #25282a;
			border-color: #25282a;
		}

		.ant-input-affix-wrapper > input.ant-input {
			height: 30px;
			width: 100%;
			border: 0px solid transparent;
			background-color: #25282a;
			outline: none;
			color: #f8d28a !important;
			font-size: 18px;
			padding: 4px;
		}

		.ant-input-affix-wrapper > input.ant-input:focus {
			background-color: #505050;
		}

		.ant-input-affix-wrapper::before {
			width: 40px;
		}

		.ant-input-suffix {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 8px;
			margin-left: 0;
		}
		.ant-input-affix-wrapper:focus,
		.ant-input-affix-wrapper-focused,
		.ant-input-affix-wrapper:hover {
			border-color: #f8d28a;
		}
	}
	.title-race {
		font-size: 24px;
		margin: 0;
		padding-right: 5px;
		color: #fff;
	}

	@media (max-width: 730px) {
		.filter-hero {
			position: relative;
			padding-bottom: 20px;
		}

		.search-hero {
			position: relative;
			width: 300px;
			display: inline-block;
			margin-left: 40px;
		}

		.ant-tabs {
			margin-top: 50px;
		}
	}

	@media (max-width: 600px) {
		.search-hero {
			width: 80%;
		}
	}

	@keyframes fade-in-keyframesz {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	.cusBoxAni {
		animation: fade-in-keyframesz 1.2s;
	}

	@keyframes fade-in-keyframes {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}

	.cusAnimated {
		animation: fade-in-keyframes 1.2s;
	}
`;

export const Container = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	position: relative;
`;

export const ClickRarity = styled.button`
	position: absolute;
	top: 0;
	right: 20%;
`;

export const BoxRace = styled.div`
	position: absolute;
	top: 22px;
	right: 28%;
	z-index: 999;

	img {
		width: 44px;
		margin-top: 4px;
	}

	@media (max-width: 1024px) {
		display: none;
	}
`;

export const StyleButton = styled.button`
	background-color: transparent;
	outline: none;
	border: none;
	z-index: 999;
`;

export const Header = styled.div`
	height: 150px;
	width: 100%;
	/* border: 4px solid rgb(166, 95, 0); */
	border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
	border-radius: 12px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	justify-content: center;
	align-items: center;
`;

export const Ratity = styled.div``;

export const Race = styled.div``;

export const InputSearch = styled.input`
	height: 30px;
	padding: 20px;
	width: 70%;
	border: 5px;
	margin: auto;
`;

export const Character = styled.img`
	width: 10%;
`;
