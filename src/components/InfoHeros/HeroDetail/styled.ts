import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: rgb(22, 6, 44);
	padding-bottom: 100px;
`;

const AnimaStar = keyframes`
  from {
	    transform: translateY(0px);
	}
	to {
	    transform: translateY(-2000px);
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

export const Content = styled.div`
	max-width: 1200px;
	margin: auto;
	padding: 138px 20px 0px;
	color: #fff;
	position: relative;
	@media (max-width: 991px) {
		padding: 55px 20px 0px;
	}
`;

export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	width: 100%;
	@media (max-width: 991px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const BackHome = styled.button`
	@media (max-width: 991px) {
		display: none;
	}
	background: none;
	border: none;
	color: #fff;
`;

export const BackHomeMobile = styled.button`
	background: none;
	border: none;
	color: #fff;
	@media (min-width: 992px) {
		display: none;
	}
`;

export const ImgBack = styled.img`
	width: 30px;
`;

export const InfoHero = styled.div``;

export const Race = styled.div`
	text-transform: uppercase;
	letter-spacing: 2px;
	font-weight: 100;
	font-size: 24px;
	display: flex;
	gap: 10px;
	align-items: center;
`;

export const ImgClass = styled.img`
	width: 40px;
`;

export const NameHero = styled.div`
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 2px;
	line-height: 110%;
	font-size: 80px;
	@media (max-width: 1600px) {
		font-size: 60px;
		line-height: 62px;
	}
`;

export const History = styled.p`
	font-weight: 200;
	font-size: 24px;
	letter-spacing: 0px;
`;

export const Hero = styled.div`
	@media (max-width: 991px) {
		display: none;
	}
`;

export const GroupHero = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	padding: 15px;
	box-sizing: border-box;
	gap: 20px;

	@media (max-width: 420px) {
		flex-direction: column;
	}
`;

const CharacterAnimate = keyframes`
    0%, 100% {
        transform: translateY(30px);
    }
    50% {
        transform: translateY(0px);
    }
`;

export const Character = styled.img`
	width: 100%;
	animation: ${CharacterAnimate} 5s infinite linear;
`;

export const Combos = styled.div`
	padding-top: 30px;
`;

export const TitleCombos = styled.div`
	text-align: center;
	padding: 10px 0px;
	font-size: 18px;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 2px;
	@media (max-width: 991px) {
		text-align: left;
	}
`;

export const GroupInfo = styled.div``;

export const Mode = styled.div`
	color: #fff;
	text-align: center;
`;

export const Title = styled.div`
	text-align: left;
	padding: 10px 0px;
	font-size: 18px;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 2px;
	@media (max-width: 991px) {
		text-align: left;
	}
`;

export const Modes = styled.div<{ active }>`
	${({ active }) =>
		active === true
			? 'filter: grayscale(0);'
			: `
        opacity: 0.3;
        filter: grayscale(1);
    `}
`;

export const IconMode = styled.img`
	width: 30px;
	height: 30px;
`;

export const GroupMode = styled.div`
	padding-bottom: 20px;
	display: flex;
	align-items: center;
	gap: 30px;
`;

export const GroupCharacter = styled.div`
	width: 50%;
	font-size: 1.2rem;
	padding-bottom: 20px;
	@media (max-width: 991px) {
		width: 30%;
	}
	@media (max-width: 600px) {
		width: 35%;
	}
	@media (max-width: 479px) {
		width: 40%;
	}

	@media (max-width: 420px) {
		width: 80%;
	}
`;

export const Combo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	@media (max-width: 991px) {
		justify-content: start;
	}
`;

export const Skill = styled.div<{ background?: any }>`
	width: 80px;
	height: 80px;
	border-radius: 50%;
	box-shadow: 0px 0px 15px 2px #000;
	background: url(${({ background }) => background});
	background-size: 100% 100%;
	background-position: center;
	background-repeat: no-repeat;
	position: relative;
	@media (max-width: 991px) {
		width: 60px;
		height: 60px;
	}
	:before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: 50%;
		z-index: 24;
		box-shadow: inset 0px 0px 10px 5px #000;
	}
`;

export const SkillBlock = styled.div<{ background?: any }>`
	width: 80px;
	height: 80px;
	border-radius: 50%;
	box-shadow: 0px 0px 15px 2px #000;
	background: #cdcdcd;
	position: relative;
	z-index: 25;
	@media (max-width: 991px) {
		width: 60px;
		height: 60px;
	}
	:before {
		content: '';
		background: url(${({ background }) => background});
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: 50%;
		z-index: 24;
		box-shadow: inset 0px 0px 10px 5px #636363;
	}
`;

export const GSkill = styled.div`
	position: relative;
	.ant-tooltip-inner {
		padding: 15px;
	}
`;

export const TooltipInner = styled.div``;

//
export const HeroPage = styled.div`
	width: 80px;
	height: 64px;
	border: 2px solid #fff;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 10px;
	justify-content: space-between;
	align-items: center;
	transition-property: opacity;
	transition-timing-function: ease-in-out;
	transition-duration: 0.1s;
	opacity: 0.4;
	cursor: pointer;
	position: absolute;
	top: 0;
	right: 0;
`;

export const Square = styled.div`
	width: 16px;
	height: 16px;
	background-color: #fff;
`;

export const TitleSkill = styled.div`
	color: #fff;
	font-size: 20px;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 2px;
`;

export const DescSkill = styled.div`
	color: #ddd;
	margin-top: 3px;
	font-size: 17px;
	letter-spacing: 0px;
`;

export const HeroMobile = styled.div`
	@media (min-width: 992px) {
		display: none;
	}
`;

export const Infomation = styled.div`
	width: 50%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-content: flex-start;
	align-items: center;
	gap: 20px;
	padding-bottom: 20px;
	@media (max-width: 991px) {
		width: 25%;
	}
	@media (max-width: 600px) {
		width: 50%;
	}
`;

export const GrInfo = styled.div`
	display: flex;
	justify-content: flex-start;
	algin-items: center;
	gap: 10px;
`;

export const TypeInfo = styled.img`
	width: 30px;
	height: 30px;
	filter: invert(95%) sepia(97%) saturate(14%) hue-rotate(213deg) brightness(104%) contrast(104%);
`;

export const Info = styled.div`
	font-size: 1.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const TypeSkill = styled.p`
	margin: 0;
	font-size: 23px;
`;

export const WrapSkill = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	padding: 10px 0px;
`;

export const PrevHero = styled(NavLink)`
	width: 30px;
	height: 64px;
	border: 2px solid #fff;
	position: relative;
	background-size: 50%;
	background-position: center;
	background-repeat: no-repeat;
	transition-property: opacity;
	transition-timing-function: ease-in-out;
	transition-duration: .1s;
	opacity: .4;
	cursor: pointer;
	background-image: url(https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/arrow_solid_left.png);
	display: inline-block;
`;

export const NextHero = styled(PrevHero)`
	transform: rotate(180deg);
`;

export const GroupSlide = styled.div`
	display: flex;
	gap: 10px;
`;

export const PrevDisable = styled.div`
	width: 30px;
	height: 64px;
	border: 2px solid #fff;
	position: relative;
	background-size: 50%;
	background-position: center;
	background-repeat: no-repeat;
	transition-property: opacity;
	transition-timing-function: ease-in-out;
	transition-duration: .1s;
	opacity: .4;
	cursor: pointer;
	background-image: url(https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/arrow_solid_left.png);
	display: inline-block;
`;

export const NextHeroDisable = styled(PrevDisable)`
	transform: rotate(180deg);
`;