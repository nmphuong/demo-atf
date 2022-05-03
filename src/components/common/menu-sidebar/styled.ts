import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.div<{ mobileShow?: boolean }>`
	max-width: 190px;
	height: 100vh;
	width: 100%;
	overflow: auto;
	position: fixed;
	background-size: cover;
	transition: all 0.5s ease;
	z-index: 99;
	top: 0;
	@media (max-width: 991px) {
		transition: all 0.5s ease;
		left: ${({ mobileShow }) => (mobileShow ? '0' : '-200px')};
		background: #16062c;
	}

	:before {
		background: linear-gradient(to bottom, rgba(254, 204, 104, 0), #f8d28a, rgba(127, 114, 94, 0));
		background-size: 3px 90%;
		background-position: center right;
		background-repeat: no-repeat;
		position: absolute;
		width: 3px;
		height: 100%;
		right: 0;
		content: '';
	}
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
		background-color: rgba(0, 0, 0, 0);
	}
	::-webkit-scrollbar {
		width: 10px;
		background-color: rgba(0, 0, 0, 0);
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0);
		border: 3px solid rgba(0, 0, 0, 0);
	}
`;

export const BackgroundNone = styled.div<{ mobileShow?: boolean }>`
	position: fixed;
	height: 100%;
	width: calc(100% - 190px);
	right: 0;
	top: 0;
	background: transparent;
	display: none;
	z-index: 99;
	@media (max-width: 991px) {
		display: ${({ mobileShow }) => (mobileShow ? 'block' : 'none')};
	}
`;

export const LinkLogo = styled(NavLink)`
	@media (max-width: 991px) {
		// display: none;
	}
`;

export const Logo = styled.div`
	height: auto;
	padding-top: 20px;
	padding-bottom: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Img = styled.img`
	// filter: drop-shadow(0 0 25px #17afff);
	width: 80%;
`;

export const MenuContent = styled.div`
	//
`;

export const Menu = styled.ul`
	padding: 0;
	padding-bottom: 50px;
	.link-blank {
		font-weight: bold;
		width: 100%;
		font-size: 20px;
		color: #fff;
		height: 60px;
		display: flex;
		align-items: center;
		padding-left: 36px;
		:hover {
			color: rgba(255, 230, 104, 1) !important;
		}
	}
`;

export const Item = styled.li`
	background: linear-gradient(to right, rgba(254, 204, 104, 0), #f8d28a, rgba(127, 114, 94, 0));
	background-size: 90% 3px;
	background-position: center bottom;
	background-repeat: no-repeat;
	display: flex;
	align-items: center;
	padding: 0px 0px;
`;

export const ItemActive = styled.li`
	position: relative;
	background: linear-gradient(to right, rgba(254, 204, 104, 0), #f8d28a, rgba(127, 114, 94, 0));
	background-size: 90% 3px;
	background-position: center bottom;
	background-repeat: no-repeat;
	display: flex;
	align-items: center;
	padding: 0px 0px;
	a {
		color: rgba(255, 230, 104, 1) !important;
	}
`;

export const LinkItem = styled(NavLink)`
	font-weight: bold;
	width: 100%;
	font-size: 20px;
	color: #fff;
	height: 60px;
	display: flex;
	align-items: center;
	padding-left: 36px;
	:hover {
		color: rgba(255, 230, 104, 1) !important;
	}
`;

export const CloseMenuMobile = styled.div`
	display: flex;
	justify-content: end;
	padding: 10px;
	align-items: center;
	height: 15px;
	position: relative;
	@media (min-width: 992px) {
		display: none;
	}
`;

export const ImgClose = styled.img`
	position: absolute;
	right: 15px;
	width: 15px;
	height: 15px;
`;
