import styled from 'styled-components';
import Img from '../../public/images/home/LogoGAE.svg';

const Box = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	min-height: 100vh;

	img {
		height: 400px;
	}
`;

const TokenPng = () => {
	return (
		<Box>
			<img src={Img} alt="" />
		</Box>
	);
};

export default TokenPng;
