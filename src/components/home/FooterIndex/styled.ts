import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	// background: rgb(25 13 4);
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index: 999;
	padding-top: 80px;

	.cusLink {
		color: #dddddd;
		font-weight: normal;
		font-size: 14px;
	}
`;

export const Content = styled.div`
	padding-top: 50px;
	width: 80%;
	position: relative;
	z-index: 999;
`;

export const ContentFooter = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 991px) {
		display: block;
	}
`;

export const FooterLetf = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	@media (max-width: 991px) {
		display: none;
	}
`;

export const ContentLeft = styled.div`
	width: 100%;
	text-align: center;
`;

export const Logo = styled.img`
	width: 380px;
	@media (max-width: 1199px) {
		width: 200px;
	}
`;

export const FooterRight = styled.div`
	width: 50%;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	@media (max-width: 991px) {
		width: 100%;
		display: flex;
		justify-content: around;
		padding: 10px 0px;
	}
	@media (max-width: 600px) {
		display: flex;
	}
`;

export const CopyRight = styled.p`
	color: #fff;
	font-size: 13px;
`;

export const GroupItem = styled.div`
	@media (max-width: 500px) {
		&.box-2 {
			width: 20%;

			.icon-2 {
				flex-wrap: wrap;
				align-items: center;
			}
		}
	}
`;

export const Item = styled.div``;

export const Title = styled.p`
	color: #fff;
	font-weight: 600;
	font-size: 16px;
	padding: 20px 0px;
	padding-top: 0;
	margin: 0;
`;

export const GroupLink = styled.div<{ display?: string }>`
	display: ${({ display }) => display};
	gap: 5px;
`;

export const WrapperLink = styled.div`
	margin: 5px 0px;
`;

export const LinkInPage = styled.p`
	color: #dddddd;
	font-weight: normal;
	font-size: 14px;
	margin: 0;
	:hover {
		color: #fff;
		text-decoration: none;
	}
`;

export const Link = styled(NavLink)`
	color: #dddddd;
	font-weight: normal;
	font-size: 14px;
	:hover {
		color: #fff;
		text-decoration: none;
	}
`;

export const Icon = styled.img``;

export const Divider = styled.div`
	height: 1px;
	width: 100%;
	margin: 20px 0px;
	background: #fff;
`;

export const FooterLetfCover = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	@media (min-width: 992px) {
		display: none;
	}
	@media (max-width: 991px) {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10px 0px;
	}
`;

export const TitleCty = styled.h6`
	max-width: 300px;
	margin: 10px 0;
	color: #dddddd;
	font-weight: normal;
	font-size: 14px;
`;

export const BoxCty = styled.h6`
	display: inline-block;

	@media (max-width: 767px) {
		display: none;
	}
`;

export const BoxCtyx = styled.h6`
	display: none;

	@media (max-width: 768px) {
		padding-bottom: 40px;
		display: block;
		p {
			margin: 20px 0;
			color: #dddddd;
			font-weight: normal;
			font-size: 14px;
		}
	}
`;
