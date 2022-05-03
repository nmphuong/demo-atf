import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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

export const Wrapper = styled.div<{ mobileShow?: boolean }>`
	max-width: 250px;
	width: 100%;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	position: fixed;
	height: 100vh;
	display: none;
	top: 0;
	z-index: 99999;
	transition: all 0.5s ease;
	background: rgb(22,6,44);
	@media (max-width: 991px) {
		display: block;
		left: ${({ mobileShow }) => (mobileShow ? '0' : '-300px')};
	}

	.cusItemsMB {
		font-weight: bold;
		font-size: 20px;
		color: #fff;
		height: 60px;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		font-family: 'Agencyfb';
		margin: 0;
	}
`;

export const BackgroundNone = styled.div<{ mobileShow?: boolean }>`
	position: fixed;
	height: 100%;
	width: calc(100% - 250px);
	right: 0;
	top: 0;
	background: rgb(0 0 0 / 0%);
	display: none;
	z-index: 99;
	@media (max-width: 991px) {
		display: ${({ mobileShow }) => (mobileShow ? 'block' : 'none')};
	}
`;

export const LinkLogo = styled(NavLink)`
	:hover {
		color: #fff;
		text-decoration: none;
	}
`;

export const Logo = styled.div`
	height: auto;
	padding-top: 10px;
	padding-bottom: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Img = styled.img`
	filter: #fff;
	width: 80%;
`;

export const MenuContent = styled.div`
	//
`;

export const Menu = styled.ul`
	padding-left: 0px;
	padding-bottom: 50px;
`;

export const Item = styled.li`
	display: flex;
	justify-content: center;
	algin-items: center;
	position: relative;
	:hover {
		// background: linear-gradient(to right, rgba(254, 204, 104, 0) , #F8D28A, rgba(127, 114, 94, 0));
		// -webkit-background-clip: text;
		// -webkit-text-fill-color: transparent;
		color: #f8d28a;
	}
	// :hover {
	//     background: linear-gradient(to right, rgba(254, 204, 104, 0) , #F8D28A, rgba(127, 114, 94, 0));
	//     background-size: 100%;
	//     background-position: center bottom;
	//     background-repeat: no-repeat;
	// }
`;

export const Children = styled.div<{ show?: boolean }>`
	background: rgba(30, 31, 40, 0.8);
	height: ${({ show }) => (show ? 'auto' : '0')};
	overflow: hidden;
	box-sizing: border-box;
	padding-left: 5px;
	a,
	p {
		font-size: 15px;
	}
`;

export const WrapperItem = styled.div`
	// border-bottom: 1px solid #fff;
	background: linear-gradient(to right, rgba(254, 204, 104, 0), #f8d28a, rgba(127, 114, 94, 0));
	background-size: 90% 3px;
	background-position: center bottom;
	background-repeat: no-repeat;
`;

export const ItemCollapse = styled.p<{ show?: boolean }>`
	font-weight: bold;
	font-size: 20px;
	color: #fff;
	height: 60px;
	display: flex;
	align-items: center;
	:before {
		content: '';
		background: #fff;
		position: absolute;
		height: 5px;
		width: 10px;
		top: 50%;
		right: 15px;
		clip-path: ${({ show }) => (show ? 'polygon(50% 0, 0 100%, 100% 100%);' : 'polygon(50% 100%, 0 0, 99% 0)')};
	}
`;

export const ItemActive = styled.li`
	position: relative;
	display: flex;
	justify-content: center;
	algin-items: center;
	a {
		color: #f8d28a;
	}
	// background: linear-gradient(to right, rgba(254, 204, 104, 0) , #F8D28A, rgba(127, 114, 94, 0));
	// -webkit-background-clip: text;
	// -webkit-text-fill-color: transparent;
	// background-size: 100%;
	// background-position: center bottom;
	// background-repeat: no-repeat;
	// :after {
	//     height: 100%;
	//     border-radius: 2px;
	//     background: #fff;
	//     position: absolute;
	//     content: "";
	//     width: 4px;
	//     left: 0;
	//     top: 0;
	// }
	// :before {
	//     height: 100%;
	//     border-radius: 2px;
	//     background: #fff;
	//     position: absolute;
	//     content: "";
	//     width: 4px;
	//     right: 0;
	//     top: 0;
	// }
`;

export const LinkItem = styled(NavLink)`
	font-weight: bold;
	font-size: 20px;
	color: #fff;
	height: 60px;
	display: flex;
	align-items: center;
	font-family: 'Agencyfb';
	:hover {
		color: #f8d28a;
		text-decoration: none;
	}
`;

export const LinkInPage = styled.p`
	font-weight: bold;
	font-size: 20px;
	color: #fff;
	height: 60px;
	display: flex;
	align-items: center;
	font-family: 'Agencyfb';
	margin: 0;
	:hover {
		color: #f8d28a;
		text-decoration: none;
	}
`;

export const CloseMenuMobile = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px 0px;
	align-items: center;
	height: 15px;
	position: relative;
`;

export const ImgClose = styled.img`
	width: 15px;
	height: 15px;
`;

