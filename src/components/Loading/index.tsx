import React from 'react';
import styled from 'styled-components';
import HeroLoading from '../../public/images/home/LoadingV1.png';

const index = () => {
	return (
		// <StyledLoader>
		// 	<div className="stars" />
		// 	<div className="loading">
		// 		<img className="cusLdImg" src={HeroLoading} alt="logo" />
		// 		<p>Loading...</p>
		// 	</div>
		// </StyledLoader>

		<StyledLoader>
			<div className="center-loading">
				<img className="cusLdImg" src={HeroLoading} alt="logo" />
				<p className="cusAniText">Loading...</p>
			</div>
		</StyledLoader>
	);
};

const StyledLoader = styled.div`
	/* width: 100%;
	height: 100%;
	background-color: #15191e; */
	/* position: relative; */
	/* z-index: 100; */

	/* &:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(22, 6, 44);
		z-index: 100;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
	} */
	@keyframes zoomIn {
		from {
			opacity: 0;
			transform: scale3d(0.3, 0.3, 0.3);
		}
		50% {
			opacity: 1;
		}
	}
	.loading {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 200;
		transform: translate(-50%, -50%);
		color: #fff;

		@media (max-width: 600px) {
			.cusLdImg {
				width: 70vw;
			}
		}
	}
	.container {
		margin: auto;
		padding: 20px 0px;
		position: relative;
		width: 500px;
	}
	.loading-2 {
		position: relative;
		display: flex;
		justify-content: center;
	}
	@keyframes animateLight {
		0%,
		49% {
			background: #22e4e3;
			box-shadow: 0 0 5px #22e4e3, 0 0 10px #22e4e3, 0 0 40px #22e4e3;
		}
		100%,
		50% {
			background: #111;
			box-shadow: none;
		}
	}
	.text {
		position: relative;
		width: 80px;
		color: #fff;
		text-align: right;
		letter-spacing: 1px;
	}
	.percent {
		position: relative;
		top: 2px;
		width: calc(100% - 120px);
		height: 20px;
		background: #151515;
		border-radius: 20px;
		margin: 0 10px;
		box-shadow: inset 0 0 10px #000;
		overflow: hidden;
		box-shadow: 0 0 10px #00264a;
	}
	.progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 20px;
		background: linear-gradient(45deg, #22ffde, #2196f3);
		animation: animate 2s linear;
	}
	@keyframes animate {
		0% {
			width: 0;
			left: 0;
		}
		40% {
			width: 20%;
			left: 0;
		}
		80% {
			width: 80%;
			left: 0;
		}
		100% {
			width: 100%;
			left: 0;
		}
	}

	.stars {
		z-index: 999;
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
	}

	@keyframes animStar {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-2000px);
		}
	}

	.center-loading {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		position: fixed;
		left: 0;
		top: 0px;
		background-color: rgb(22, 6, 44);
		width: 100%;
		z-index: 9999;
	}

	.ring-loading {
		position: absolute;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		animation: ringLoading 2s linear infinite;
		/* background: rgba(9, 120, 139, 0.45); */
	}

	@keyframes ringLoading {
		0% {
			transform: rotate(0deg);
			box-shadow: 1px 5px 2px #0eaaa2;
		}

		50% {
			transform: rotate(180deg);
			box-shadow: 1px 5px 2px #0bc779;
		}

		100% {
			transform: rotate(360deg);
			box-shadow: 1px 5px 2px #03879e;
		}
	}

	.ring-loading:before {
		position: absolute;
		content: '';
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		border-radius: 50%;
		box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
	}

	.center-loading p {
		background: -webkit-linear-gradient(#cc2f00, #ffea56);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		color: #737373;
		font-size: 18px;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
		/* line-height: 200px; */
		animation: textLoading 3s ease-in-out infinite;
	}

	@keyframes textLoading {
		50% {
			color: #fff;
		}
	}

	.cusLdImg {
		animation: zoomIn 2s;
	}

	@keyframes textLoading {
		from {
			width: 0px;
		}
		to {
			width: 130px;
		}
	}

	.cusAniText {
		width: fit-content;
		animation: textwidth 2s linear infinite;
	}

	.cusLdImg {
		width: 750px;

		@media (max-width:760px) {
			width: 400px ;
		}
	}
`;

export default index;
