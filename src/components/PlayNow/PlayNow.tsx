import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import HeroLoading from '../../public/images/ComingSoon/bgCommingSoon.svg';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${HeroLoading});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: left;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	overflow: hidden;
`;

const GotoHome = styled.div`
	position: absolute;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 10px 30px;
	align-self: flex-end;
	gap: 10px;
	transition: 0.3s ease-in-out;
	z-index: 999;
	white-space: now-wrap;
	width: 100%;
	cursor: pointer;
	&:hover {
		color: #f6d873;
	}

	@media (max-width: 500px) {
		margin-top: 20px;
		// margin-right: 20px;
	}
`;

const Popup = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.6);

	@media (max-width: 500px) {
		align-items: flex-start;
	}
`;

const Content = styled.div`
	max-width: 600px;
	width: 100%;
	position: relative;

	@media (max-width: 500px) {
		width: 50%;
		margin-top: 80px;
	}
`;

const Img = styled.img`
	width: 100%;
`;

const GroupButton = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
`;

const ContentButton = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

const Buttons = styled.div`
	width: 100%;
	position: absolute;
	bottom: 30px;
	left: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 479px) {
		bottom: 15px;
	}
	@media (max-width: 300px) {
		bottom: 10px;
	}
`;

const Action = styled.button`
	background: url(${require('../../public/images/ComingSoon/button.svg').default});
	background-size: 100% 100%;
	background-position: center;
	border: none;
	width: 30%;
	height: 60px;
	color: #fff;
	font-weight: 300;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Gemunu Libre;
	font-weight: 600;
	font-size: 16px;
	&.btn-connect-pn > button {
		background: none !important;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: auto;
		font-family: inherit;
		padding: 0 !important;
		:hover {
			box-shadow: none;
		}
		span {
			color: #fff !important;
			background: none !important;
			-webkit-background-clip: initial;
			-webkit-text-fill-color: initial;
			font-family: inherit;
		}
	}
	@media (max-width: 479px) {
		font-size: 13px;
		width: 40%;
		&.btn-connect-pn > button {
			font-size: 13px;
		}
	}
	@media (max-width: 300px) {
		font-size: 10px;
		&.btn-connect-pn > button {
			font-size: 10px;
		}
	}
`;

const ContentNgang = styled.div`
	max-width: 360px;
	width: 100%;
	position: relative;
`;

const GotoHomeNgang = styled.div`
	position: absolute;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	align-self: flex-end;
	gap: 10px;
	margin-right: 30px;
	margin-top: 10px;
	transition: 0.3s ease-in-out;
	z-index: 999;
	&:hover {
		color: #f6d873;
	}

	@media (max-width: 500px) {
		margin-top: 20px;
		margin-right: 20px;
	}
`;

const ActionNgang = styled.button`
	background: url(${require('../../public/images/ComingSoon/button.svg').default});
	background-size: 100% 100%;
	background-position: center;
	border: none;
	width: 30%;
	height: 60px;
	color: #fff;
	font-weight: 300;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: Gemunu Libre;
	font-weight: 600;
	font-size: 12px;
	&.btn-connect-pn > button {
		font-size: 12px;
		background: none !important;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: auto;
		font-family: inherit;
		padding: 0 !important;
		:hover {
			box-shadow: none;
		}
		span {
			color: #fff !important;
			background: none !important;
			-webkit-background-clip: initial;
			-webkit-text-fill-color: initial;
			font-family: inherit;
		}
	}
	@media (max-width: 479px) {
		font-size: 10px;
		width: 40%;
		&.btn-connect-pn > button {
			font-size: 10px;
		}
	}
	@media (max-width: 300px) {
		font-size: 8px;
		&.btn-connect-pn > button {
			font-size: 8px;
		}
	}
`;

const CusTransform = styled.div`
	position: relative;

	@media (max-width: 500px) {
		transform: rotate(90deg);
		transform-origin: bottom left;
		top: -100vw;
		height: 100vw;
		width: 100vh;
		position: absolute;
	}
`;

declare global {
	interface Window {
		resizeLag: any;
	}
}

const PlayNowNgang = () => {
	const history = useHistory();

	return (
		<Wrapper>
			<GotoHomeNgang onClick={() => history.goBack()}>
				<img height="26px" src={require('../../public/images/home/backHome.png').default} alt="..." />
				Back to home
			</GotoHomeNgang>
			<Popup>
				<ContentNgang>
					<Img src={require('../../public/images/ComingSoon/popupn.svg').default} alt="popup" />
					<GroupButton>
						<ContentButton>
							<Buttons>
								<ActionNgang>Import Heroes</ActionNgang>
								<ActionNgang className="btn-connect-pn">
									<ConnectWallet>Connect Metamask</ConnectWallet>
								</ActionNgang>
							</Buttons>
						</ContentButton>
					</GroupButton>
				</ContentNgang>
			</Popup>
		</Wrapper>
	);
};

const PlayNowDoc = () => {
	const history = useHistory();

	return (
		<Wrapper>
			<GotoHome onClick={() => history.goBack()}>
				<img height="26px" src={require('../../public/images/home/backHome.png').default} alt="..." />
				Back to home
			</GotoHome>
			<Popup>
				<Content>
					<Img src={require('../../public/images/ComingSoon/popupn.svg').default} alt="popup" />
					<GroupButton>
						<ContentButton>
							<Buttons>
								<Action>Import Heroes</Action>
								<Action className="btn-connect-pn">
									<ConnectWallet>Connect Metamask</ConnectWallet>
								</Action>
							</Buttons>
						</ContentButton>
					</GroupButton>
				</Content>
			</Popup>
		</Wrapper>
	);
};

const PlayNowz = () => {
	const history = useHistory();

	return (
		<Wrapper>
			<GotoHome onClick={() => history.goBack()}>
				<img height="26px" src={require('../../public/images/home/backHome.png').default} alt="..." />
				Back to home
			</GotoHome>
			<Popup>
				<Content>
					<Img src={require('../../public/images/ComingSoon/popupn.svg').default} alt="popup" />
					<GroupButton>
						<ContentButton>
							<Buttons>
								<Action>Import Heroes</Action>
								<Action className="btn-connect-pn">
									<ConnectWallet>Connect Metamask</ConnectWallet>
								</Action>
							</Buttons>
						</ContentButton>
					</GroupButton>
				</Content>
			</Popup>
		</Wrapper>
	);
};

const Check = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 700;

	const isLandscape = () => window.matchMedia('(orientation:landscape)').matches,
		[orientation, setOrientation] = useState(isLandscape() ? isMobile ? <PlayNowNgang /> : <PlayNowz /> : <PlayNowDoc />),
		onWindowResize = () => {
			clearTimeout(window.resizeLag);
			window.resizeLag = setTimeout(() => {
				delete window.resizeLag;
				setOrientation(isLandscape() ? isMobile ? <PlayNowNgang /> : <PlayNowz /> : <PlayNowDoc />);
			}, 200);
		};

	useEffect(
		() => (
			onWindowResize(), window.addEventListener('resize', onWindowResize), () => window.removeEventListener('resize', onWindowResize)
		),
		[]
	);

	return <CusTransform>{orientation}</CusTransform>;
};

const PlayNow = () => {
	return (
		<div style={{ height: '100%' }}>
			<Check />
		</div>
	);
};

export default PlayNow;
