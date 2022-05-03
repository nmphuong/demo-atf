import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
	display: none;
	@media (max-width: 991px) {
		display: block;
	}
`;

export const Content = styled.div`
	padding: 15px;
	display: flex;
	justify-content: space-between;
`;

export const Link = styled(NavLink)`
	//
`;

export const Logo = styled.div`
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Img = styled.img`
	width: 80%;
	width: 150px;
`;

export const OpenMenu = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ImgOpenMenu = styled.img`
	width: 25px;
	height: 100%;
`;

export const BoxCustom = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
    gap: 10px;
    color: #fff;
`;

export const BoxMenu = styled.div`
	display: flex;
	align-items: center;
`
