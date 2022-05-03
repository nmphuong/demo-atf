import React from 'react';
import styled from 'styled-components';
import kentHunt from '../../../public/images/home/our-team/KenHunt.webp';
import xavierTaylor from '../../../public/images/home/our-team/XavierTaylor.webp';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 26px 0px 0px;
	position: relative;
	z-index: 999;
`;

const Flex = styled.div`
	display: flex;
	align-items: center;
	gap: 60px;

	@media (max-width: 768px) {
		gap: 40px;
	}

	@media (max-width: 500px) {
		gap: 40px;
		flex-direction: column;
	}
`;

const BoxImg = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 14px;

	.cusBoder {
		width: 100%;
		height: 100%;
		position: relative;
		top: 0;
		left: 0;
		z-index: 0;
		border: 4px solid rgba(219, 145, 37, 1);
		transition: 0.4s;
		transform: none;

		&:hover {
			transform: scale(1.03);
		}

		.border-top {
			:after {
				content: '';
				position: absolute;
				top: -10px;
				left: -10px;
				width: 25%;
				height: 10px;
				background: linear-gradient(to right, rgb(219 145 37), rgb(172 117 31), rgb(246 206 105));
			}
			:before {
				content: '';
				position: absolute;
				top: -10px;
				left: -10px;
				width: 10px;
				height: 25%;
				background: linear-gradient(to bottom, rgb(219 145 37), rgb(172 117 31), rgb(246 206 105));
			}
		}
		.border-bottom {
			:after {
				content: '';
				position: absolute;
				bottom: -10px;
				right: -10px;
				width: 25%;
				height: 10px;
				background: linear-gradient(to right, rgb(219 145 37), rgb(172 117 31), rgb(246 206 105));
			}
			:before {
				content: '';
				position: absolute;
				bottom: -10px;
				right: -10px;
				width: 10px;
				height: 25%;
				background: linear-gradient(to bottom, rgb(219 145 37), rgb(172 117 31), rgb(246 206 105));
			}
		}
	}

	.text {
		color: #f9c549;
		font-family: 'KoHo';
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		line-height: 31px;
		text-align: center;
	}
`;

const index = () => {
	return (
		<Wrapper>
			<Flex>
				<BoxImg>
					<div className="cusBoder">
						<div className="border-top" />
						<img src={kentHunt} alt="kent hunt" />
						<div className="border-bottom" />
					</div>
					<p className="text">Kent Hunt</p>
				</BoxImg>
				<BoxImg>
					<div className="cusBoder">
						<div className="border-top" />
						<img src={xavierTaylor} alt="xavier taylor" />
						<div className="border-bottom" />
					</div>
					<p className="text">Xavier Taylor</p>
				</BoxImg>
			</Flex>
		</Wrapper>
	);
};

export default index;
