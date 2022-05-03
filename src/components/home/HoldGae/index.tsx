import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';

import BgHolder from '../../../public/images/Holder/BgHolder.png';
import BgHolderMb from '../../../public/images/Holder/BgHolderMB.png';
import IconGae from '../../../public/images/Holder/newToken.png';

import { useHome } from 'hooks/useHome';

const BoxBg = styled.div`
	background-image: url(${BgHolder});
	max-width: 1170px;
	margin: auto;
	height: 100%;
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center center;
	position: relative;

	.TitleHolder {
		font-family: Gelasio;
		font-style: normal;
		font-weight: 700;
		font-size: 35px;
		line-height: 44px;
		text-align: center;
		letter-spacing: 0.01em;
		padding-top: 14px;
		/* padding-bottom: 65px; */
		margin: 0;
		padding-top: 86px;
		padding-bottom: 20px;

		background: linear-gradient(180deg, #ffffff -42.23%, #ffe668 133.84%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;

		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	p {
		font-style: normal;
		font-family: Gelasio;
		font-weight: 700;
		font-size: 30px;
		line-height: 38px;
		text-align: center;
		letter-spacing: 0.01em;
		margin: 0;

		color: #ffffff;
	}

	.textHolder {
		font-family: 'Gemunu Libre';
		font-style: normal;
		font-weight: 400;
		font-size: 60px;
		line-height: 168.9%;
		align-items: center;
		color: #ffe668;
		padding-bottom: 60px;

		@media (max-width: 960px) {
			font-size: 40px;
		}

		@media (max-width: 768px) {
			font-size: 30px;
		}
	}

	.newToken {
		height: 120px;

		@media (max-width: 960px) {
			height: 100px;
		}

		@media (max-width: 768px) {
			height: 60px;
		}
	}

	@media (max-width: 1024px) {
		width: 90%;
	}

	@media (max-width: 690px) {
		width: 100%;
		background-image: url(${BgHolderMb});
	}

	@media (max-width: 440px) {
		p {
			font-size: 16px;
		}

		.TitleHolder,
		.textHolder {
			font-size: 28px;
		}

		.TitleHolder {
			padding-bottom: 20px;
		}
	}
`;

const Flex = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	padding: 46px 80px;
	border: 2px solid #6074ba;
	background: linear-gradient(145deg, rgba(46, 45, 101, 1) 0%, rgba(6, 5, 47, 1) 100%, rgba(46, 45, 101, 1) 100%);
	border-radius: 8px;
	margin-bottom: 40px;

	h1 {
		font-family: 'Gemunu Libre';
		font-size: 70px;
		font-weight: 600;
		margin: 0;
		padding: 0;
		padding-left: 20px;
		/* background: linear-gradient(180deg, #ffe668 0%, #a36700 64.58%, #ffe668 81.77%, #fe9a03 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent; */
		background: linear-gradient(180deg, #ffffff -42.23%, #ffe668 133.84%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;

		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	@media (max-width: 1024px) {
		padding: 14px 40px;
	}

	@media (max-width: 884px) and (min-width: 770px) {
		margin-bottom: 8px;
	}

	@media (max-width: 820px) {
		padding: 8px 20px;

		h1 {
			font-size: 50px;
		}
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 40px;
		}
	}

	@media (max-width: 690px) {
		margin-bottom: 10px;
		h1 {
			padding: 0;
			padding-top: 8px;
			font-size: 60px;
		}
	}

	@media (max-width: 460px) {
		h1 {
			padding: 0;
			padding-top: 8px;
			font-size: 40px;
		}
	}

	@media (max-width: 380px) {
		h1 {
			padding: 0;
			padding-top: 8px;
		}
	}
`;

const DFlex = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: 690px) {
		flex-direction: column;
	}
`;

const HoldGae = () => {
	const [balance, setBalance] = useState<any>(undefined);

	const { getBalanceAPIBscscan } = useHome();

	useEffect(() => {
		setTimeout(() => {
			getBalanceAPIBscscan().then((res) => {
				setBalance(Number(res));
			});
		}, 3000);
	}, []);

	return (
		<div className="mode-block" id="game-coming-soon">
			<div className="title-gold">Just hold GAE & Earn</div>
			<BoxBg>
				<>
					<h1 className="TitleHolder">Passive Reward Pool</h1>
					<Flex>
						<DFlex>
							<div>
								<img className="newToken" src={IconGae} alt="..." />
							</div>
							{balance && Number(balance > 0) ? <h1>{Number(balance.toFixed(2) / 2).toLocaleString()}</h1> : <h1>0</h1>}
						</DFlex>
					</Flex>
					<p>First distribution on</p>
					<p className="textHolder">5 May 2022</p>
				</>
			</BoxBg>
		</div>
	);
};

export default memo(HoldGae);
