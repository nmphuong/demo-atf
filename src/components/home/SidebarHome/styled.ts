import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const settingCss = {
	fontSizeLink: '20px',
	gapSize: '18px'
};

const animateDropShadow = keyframes`
    0% {
        filter: drop-shadow(0px 0px 5px #00FF66);
    }
    50% {
        filter: drop-shadow(0px 0px 10px #00FF66);
    }
    100% {
        filter: drop-shadow(0px 0px 5px #00FF66);
    }
`;

export const Wrapper = styled.div`
	/* position: fixed; */
	top: 0;
	left: 0;
	z-index: 9999;
	padding: 17px 20px 14px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	/* background: linear-gradient(270deg, #1E1F28 8.54%, rgba(30, 31, 40, 0) 71.42%); */
	@media (max-width: 991px) {
		padding: 5px;
	}
`;

export const Logo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 12%;
	height: 100%;
	@media (min-width: 1200px) {
		padding-left: 81px;
	}
	@media (max-width: 991px) {
		display: none;
	}
	svg {
		height: 100%;
		width: 100%;
	}
`;

export const TheLordOfGalaxy = styled.img`
	width: 100%;
`;

export const Menu = styled.div`
	display: flex;
	align-items: center;
	gap: 60px;
	@media (min-width: 1200px) {
		padding-right: 46px;
	}

	@media (max-width: 1280px) {
		gap: 40px;
	}
`;

export const WrapperLink = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	box-sizing: border-box;
	gap: ${settingCss.gapSize};

	@media (max-width: 1024px) {
		gap: 10px !important;
	}

	@media (max-width: 991px) {
		display: none;
	}

	.cusItems {
		font-family: 'Rodfattwo-Demo';
		color: #fff;
		font-weight: 500;
		text-transform: uppercase;
		min-height: 36px;
		line-height: 36px;
		vertical-align: middle;
		padding: 0 8px;
		margin: 6px 8px;
		font-size: ${settingCss.fontSizeLink};
		text-shadow: 0 0 4px rgb(0 0 0 / 90%);
		letter-spacing: 0.01em;

		:hover {
			color: #f8d28a;
			text-decoration: none;
		}

		@media (max-width: 1024px) {
			font-size: 14px;
		}
	}
`;

export const Link = styled(NavLink)<{ activate?: boolean }>`
	font-family: 'Rodfattwo-Demo';
	color: ${({ activate }) => (activate === true ? '#F8D28A' : '#fff')};
	font-weight: 500;
	text-transform: uppercase;
	min-height: 36px;
	line-height: 36px;
	vertical-align: middle;
	padding: 0 8px;
	margin: 6px 8px;
	font-size: ${settingCss.fontSizeLink};
	text-shadow: 0 0 4px rgb(0 0 0 / 90%);
	letter-spacing: 0.01em;

	:hover {
		color: #f8d28a;
		text-decoration: none;
	}

	@media (max-width: 1024px) {
		font-size: 14px !important;
	}
`;

export const LinkInPage = styled.p`
	font-family: 'Rodfattwo-Demo';
	color: #fff;
	font-weight: 500;
	text-transform: uppercase;
	min-height: 36px;
	line-height: 36px;
	vertical-align: middle;
	padding: 0 8px;
	margin: 6px 8px;
	font-size: ${settingCss.fontSizeLink};
	text-shadow: 0 0 4px rgb(0 0 0 / 90%);
	letter-spacing: 0.01em;

	:hover {
		color: #f8d28a;
		text-decoration: none;
	}

	@media (max-width: 1024px) {
		font-size: 14px !important;
	}
`;

export const Playnow = styled(NavLink)`
	font-family: 'Rodfattwo-Demo' !important;
	background: url(${require('../../../public/images/home/sidebar/button-play-now.svg').default});
	text-transform: uppercase;
	width: 179px;
	height: 43px;
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	border: 0;
	border-radius: 5px;
	box-shadow: none;
	font-size: 16px;
	font-weight: 500;
	display: flex;
	justify-content: center;
	align-items: center;
	filter: drop-shadow(0px 0px 10px #00ff66);
	color: #fff;
	:hover {
		color: #fff;
		text-decoration: none;
	}
	animation: ${animateDropShadow} 1s infinite;
	// @media (max-width: 479px) {
	//     display: none;
	// }
`;

export const LabelDropdown = styled.span`
	font-size: 16px;
	font-weight: 700;
`;

export const DropdownListIcon = styled.img`
	padding: 0px 2px;
`;

export const WrapperSubMenu = styled.div`
	position: absolute;
	background: red;
	width: 200px;
	border-radius: 12px;
	top: 100%;
	left: -100%;
	visibility: hidden;
	overflow: hidden;
	background: linear-gradient(to right, rgba(30, 31, 40, 1), rgba(30, 31, 40, 0.8), rgba(30, 31, 40, 1));
`;

export const SubLink = styled.div`
	font-family: 'Rodfattwo-Demo' !important;
	padding: 15px 20px;
	white-space: nowrap;
	&:hover {
		background: linear-gradient(180deg, #fed12e, #d45d27);
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
	}
`;

export const DropdownList = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	color: #fff;
	position: relative;
	&:hover ${WrapperSubMenu} {
		visibility: visible;
	}
`;

export const OpenMenu = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	@media (min-width: 992px) {
		display: none;
	}
`;

export const ImgOpenMenu = styled.img`
	width: 25px;
	height: 100%;
`;

export const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
	position: fixed;
	top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
	left: 0;
	transition: top 0.3s ease-out;
	height: ${({ height }) => `${height}px`};
	width: 100%;
	z-index: 99999;
	@media (max-width: 991px) {
		height: 55px;
	}
`;
