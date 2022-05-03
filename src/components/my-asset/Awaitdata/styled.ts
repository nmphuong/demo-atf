import styled from 'styled-components';

import IconBg from '../../../public/images/home/banner/planets2.svg';
import BtnBox from '../../../public/images/bg-btn-gold.png';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@keyframes zoomInDown {
		from {
			opacity: 0;
			transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}

		60% {
			opacity: 1;
			transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
			animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
		}
	}

	.ImgAnimation {
		animation: zoomInDown 3s linear;
		z-index: 99;
	}

	@keyframes bounceInUp {
		from,
		60%,
		75%,
		90%,
		to {
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}

		from {
			opacity: 0;
			transform: translate3d(0, 3000px, 0) scaleY(5);
		}

		60% {
			opacity: 1;
			transform: translate3d(0, -20px, 0) scaleY(0.9);
		}

		75% {
			transform: translate3d(0, 10px, 0) scaleY(0.95);
		}

		90% {
			transform: translate3d(0, -5px, 0) scaleY(0.985);
		}

		to {
			transform: translate3d(0, 0, 0);
		}
	}

	.btn-gold,
	.btn-gold:focus,
	.btn-gold:disabled {
		background: url(${BtnBox}) no-repeat;
		background-position: top;
		background-size: 100% 100%;
		width: auto;
		height: auto;
		border: 1px solid transparent;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: 0.01em;
		padding: 10px 15px;
		z-index: 999;
		position: relative;
		min-width: 100px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #502f03;
		font-family: 'Montserrat' !important;
		animation: bounceInUp 3s ease-in-out;
		/* transition: all 0.3s ease; */
	}
	.btn-gold:hover,
	.btn-gold:disabled:hover {
		box-shadow: 2px 2px 20px green;
		background: url(${BtnBox}) no-repeat;
		background-position: top;
		background-size: 100% 100%;

		border: 1px solid transparent;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: 0.01em;
		padding: 10px 15px;
	}
	.btn-gold:disabled {
		opacity: 0.5;
	}
	.btn-gold span {
		color: #502f03;
		font-family: 'Montserrat' !important;
	}
	.btn-gold .icon-down {
		font-size: 20px;
		margin-right: 10px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}
`;

export const BoxWrapper = styled.div`
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

	.asset-block {
		.page-container {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.stars {
		width: 2px;
		height: 2px;
		background: transparent;
		box-shadow: 849px 4022px #fff, 525px 1557px #fff, 1857px 1674px #fff, 1695px 258px #fff, 7px 1616px #fff, 934px 767px #fff,
			812px 390px #fff, 1485px 661px #fff, 1361px 784px #fff, 177px 1421px #fff, 779px 171px #fff, 716px 177px #fff, 174px 1834px #fff,
			1792px 1349px #fff, 1282px 136px #fff, 650px 126px #fff, 808px 994px #fff, 1680px 1158px #fff, 282px 869px #fff,
			1823px 569px #fff, 281px 520px #fff, 622px 380px #fff, 570px 851px #fff, 1433px 1334px #fff, 1020px 1100px #fff,
			196px 822px #fff, 310px 1464px #fff, 1436px 759px #fff, 457px 190px #fff, 1110px 1696px #fff, 360px 747px #fff, 297px 626px #fff,
			1004px 372px #fff, 1154px 85px #fff, 1938px 1234px #fff, 574px 979px #fff, 417px 570px #fff, 952px 1116px #fff,
			859px 1207px #fff, 1577px 1292px #fff, 224px 205px #fff, 523px 1101px #fff, 62px 466px #fff, 1987px 1947px #fff,
			884px 621px #fff, 375px 530px #fff, 1327px 358px #fff, 1042px 1865px #fff, 1869px 531px #fff, 1123px 643px #fff,
			827px 1030px #fff, 1451px 1661px #fff, 1847px 484px #fff, 418px 1424px #fff, 1133px 1524px #fff, 1361px 13px #fff,
			913px 1335px #fff, 1576px 363px #fff, 957px 1008px #fff, 905px 714px #fff, 353px 624px #fff, 1006px 671px #fff, 691px 963px #fff,
			1953px 79px #fff, 1938px 736px #fff, 1120px 1346px #fff, 257px 513px #fff, 541px 1605px #fff, 1974px 1375px #fff,
			275px 421px #fff, 1410px 485px #fff, 1878px 795px #fff, 1069px 1329px #fff, 1360px 341px #fff, 240px 451px #fff,
			714px 1579px #fff, 1740px 70px #fff, 1263px 765px #fff, 1497px 1722px #fff, 1767px 174px #fff, 453px 1742px #fff,
			140px 911px #fff, 1356px 1745px #fff, 12px 237px #fff, 1428px 1882px #fff, 1923px 293px #fff, 23px 678px #fff, 528px 1532px #fff,
			14px 36px #fff, 1538px 1091px #fff, 62px 1457px #fff, 1060px 508px #fff, 268px 1479px #fff, 465px 38px #fff, 1112px 1512px #fff,
			1630px 1110px #fff, 1147px 1149px #fff, 1030px 1277px #fff, 172px 953px #fff, 214px 1109px #fff;
		animation: animStar 50s linear infinite;
	}

	.stars:after {
		content: ' ';
		position: absolute;
		top: 100%;
		width: 2px;
		/* height: 2px; */
		background: transparent;
		z-index: 1;
		/* box-shadow: 849px 4022px #FFF , 525px 1557px #FFF , 1857px 1674px #FFF , 1695px 258px #FFF , 7px 1616px #FFF , 934px 767px #FFF , 812px 390px #FFF , 1485px 661px #FFF , 1361px 784px #FFF , 177px 1421px #FFF , 779px 171px #FFF , 716px 177px #FFF , 174px 1834px #FFF , 1792px 1349px #FFF , 1282px 136px #FFF , 650px 126px #FFF , 808px 994px #FFF , 1680px 1158px #FFF , 282px 869px #FFF , 1823px 569px #FFF , 281px 520px #FFF , 622px 380px #FFF , 570px 851px #FFF , 1433px 1334px #FFF , 1020px 1100px #FFF , 196px 822px #FFF , 310px 1464px #FFF , 1436px 759px #FFF , 457px 190px #FFF , 1110px 1696px #FFF , 360px 747px #FFF , 297px 626px #FFF , 1004px 372px #FFF , 1154px 85px #FFF , 1938px 1234px #FFF , 574px 979px #FFF , 417px 570px #FFF , 952px 1116px #FFF , 859px 1207px #FFF , 1577px 1292px #FFF , 224px 205px #FFF , 523px 1101px #FFF , 62px 466px #FFF , 1987px 1947px #FFF , 884px 621px #FFF , 375px 530px #FFF , 1327px 358px #FFF , 1042px 1865px #FFF , 1869px 531px #FFF , 1123px 643px #FFF , 827px 1030px #FFF , 1451px 1661px #FFF , 1847px 484px #FFF , 418px 1424px #FFF , 1133px 1524px #FFF , 1361px 13px #FFF , 913px 1335px #FFF , 1576px 363px #FFF , 957px 1008px #FFF , 905px 714px #FFF , 353px 624px #FFF , 1006px 671px #FFF , 691px 963px #FFF , 1953px 79px #FFF , 1938px 736px #FFF , 1120px 1346px #FFF , 257px 513px #FFF , 541px 1605px #FFF , 1974px 1375px #FFF , 275px 421px #FFF , 1410px 485px #FFF , 1878px 795px #FFF , 1069px 1329px #FFF , 1360px 341px #FFF , 240px 451px #FFF , 714px 1579px #FFF , 1740px 70px #FFF , 1263px 765px #FFF , 1497px 1722px #FFF , 1767px 174px #FFF , 453px 1742px #FFF , 140px 911px #FFF , 1356px 1745px #FFF , 12px 237px #FFF , 1428px 1882px #FFF , 1923px 293px #FFF , 23px 678px #FFF , 528px 1532px #FFF , 14px 36px #FFF , 1538px 1091px #FFF , 62px 1457px #FFF , 1060px 508px #FFF , 268px 1479px #FFF , 465px 38px #FFF , 1112px 1512px #FFF , 1630px 1110px #FFF , 1147px 1149px #FFF , 1030px 1277px #FFF , 172px 953px #FFF , 214px 1109px #FFF; */
	}

	@keyframes animStar {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-2000px);
		}
	}
`;

export const ButtonBox = styled.div`
	padding-top: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
`;
