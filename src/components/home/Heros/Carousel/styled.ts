import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div<{ nextIcon?: any; prevIcon?: any }>`
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 999;
	ul {
		&.slick-dots.slick-thumb {
			top: 50%;
			transform: translate(0%, -50%);
			width: auto;
			li {
				display: flex;
				width: 50px;
				height: 50px;
				margin: 10px 0px;
				opacity: 0.5;
				position: relative;
				:before {
					position: absolute;
					width: 1px;
					height: 12px;
					background: #ceb38b;
					bottom: 0%;
					left: 50%;
					transform: translate(-50%, 93%);
					content: '';
				}
				&:last-child:before {
					position: absolute;
					width: 0px;
					height: 0px;
					background: #ceb38b;
					bottom: 0%;
					left: 50%;
					transform: translate(-50%, 93%);
					content: '';
				}
				&.slick-active {
					opacity: 1;
				}
				img {
					width: 50px;
				}
			}
		}
		&.slick-dots-card.slick-thumb-card {
			margin-bottom: 0;
			padding: 0;
			position: absolute;
			bottom: 13%;
			left: 50%;
			list-style: none;
			display: flex !important;
			transform: translateX(-50%);
			gap: 5px;
			li {
				width: 10px;
				height: 7px;
				&.slick-active {
					width: 20px;
					height: 7px;
				}
				img {
					height: 100%;
					width: 100%;
				}
			}
		}
	}
	.slick-next {
		right: 10%;
		z-index: 19;
		&:before {
			background: url(${require('../../../../public/images/home/heros/next-slide.svg').default});
			color: transparent;
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
	.slick-prev {
		left: 10%;
		z-index: 19;
		&:before {
			background: url(${require('../../../../public/images/home/heros/prev-slide.svg').default});
			color: transparent;
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
	@media (max-width: 1199px) {
		ul {
			&.slick-dots.slick-thumb {
				display: flex !important;
				top: -40px;
				left: 50%;
				transform: translate(-50%, 0%);
				height: 30px;
				li {
					margin: 0px 10px;
					:before {
						position: absolute;
						width: 23px;
						height: 1px;
						background: #ceb38b;
						right: 0%;
						top: 49%;
						left: 68%;
						transform: translate(61%, 35%);
						content: '';
					}
				}
			}
			&.slick-dots-card.slick-thumb-card {
				 {
					bottom: 25%;
				}
			}
		}
	}

	.cusBgTooltip {
		.ant-tooltip-inner {
			background-color: linear-gradient(150deg, #68727c, #14171a) !important;
			padding: 10px 15px;
			border-radius: 2px;
			box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
		}
	}
`;

export const Item = styled.div`
	display: flex !important;
	justify-content: center;
	algin-items: center;
	@media (max-width: 1199px) {
		padding: 56px 0px 0px !important;
	}
	@media (max-width: 991px) {
		padding: 33px 0px 0px;
	}
	position: relative;
`;

export const Card = styled.div`
	width: 30vw;
	overflow: hidden;
	@media (max-width: 991px) {
		width: 50vw;
	}
	@media (max-width: 767px) {
		width: 60vw;
	}
	.card-hero {
		//
	}
`;

export const Img = styled.img`
	width: 100%;
`;

export const InfoTop = styled.div`
	position: absolute;
	top: 8%;
	left: 29%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	max-width: 43%;
	// @media (max-width: 1199px) {
	//     left: 43px;
	//     top: 48px;
	// }
	@media (max-width: 991px) {
		width: 50%;
		left: 25%;
		top: 7%;
	}
`;

export const Thumb = styled.img`
	width: 5vw;
	height: 5vw;
	@media (max-width: 991px) {
		width: 10vw;
		height: 10vw;
	}
`;

export const NameStart = styled.div``;

export const Name = styled.p`
	margin: 0;
	font-size: 1.5rem;
	font-family: Righteous;
	background: linear-gradient(180deg, #ffdf8d 0%, #fe9a03 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@media (max-width: 767px) {
		font-size: 1rem;
	}
`;

export const Start = styled.img`
	width: 5vw;
	margin: auto;
	@media (max-width: 991px) {
		width: 10vw;
	}
`;

export const InfoSkill = styled.div`
	position: absolute;
	left: 29%;
	top: 25%;
	max-width: 43%;
	// @media (max-width: 1199px) {
	//     left: 43px;
	//     top: 120px;
	// }
	@media (max-width: 991px) {
		width: 50%;
	}
`;

export const TitleSection = styled.p`
	text-align: left;
	margin: 0;
	font-size: 1.5rem;
	font-family: Righteous;
	background: linear-gradient(180deg, #ffdf8d 0%, #fe9a03 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@media (max-width: 767px) {
		font-size: 1rem;
	}
`;

export const Combo = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	padding: 5px 10px;
	box-sizing: border-box;
	@media (max-width: 1199px) {
		width: 80%;
	}
	@media (max-width: 991px) {
		width: 100%;
	}

	.cusBgTooltip {
		.ant-tooltip-inner {
			background: linear-gradient(150deg, #68727c, #14171a) !important;
			padding: 10px 15px;

			border-radius: 2px;
			box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
		}
	}
`;

export const DescriptionSkill = styled.div`
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translate(-50%, 0%);
	visibility: hidden;
	background: rgb(255 255 255 / 91%);
	width: 300%;
	padding: 5px;
	box-sizing: border-box;
	z-index: 19;
	border-radius: 5px;
	background: #213353;
	border: 2px solid #fbb44f;
	color: #fff;
`;

export const WrapSkill = styled.div`
	position: relative;
	&:hover ${DescriptionSkill} {
		// visibility: visible;
	}
	width: calc(100% / 3);
`;
export const Skill = styled.img`
	width: 100%;
`;

export const InfoBottom = styled.div`
	position: absolute;
	left: 29%;
	top: 45%;
	max-width: 43%;
	height: 17vw;
	overflow: hidden;
	// @media (max-width: 1199px) {
	//     left: 43px;
	//     max-width: 43%;
	// }
	@media (max-width: 991px) {
		width: 43%;
	}
`;

export const Description = styled.div`
	font-size: 12px;
	padding: 3px;
	color: #fff;
	font-family: Righteous;
	text-align: left;
	font-weight: 100;
	@media (max-width: 767px) {
		font-size: 1.5vw;
	}
`;

export const NameSkill = styled.p`
	font-size: 12px;
	font-weight: 600;
`;

export const Break = styled.div`
	width: 100%;
	height: 1px;
	background: #fab44e;
	margin: 2px 0px;
`;

export const Info = styled.div<{ visibility?: string; frameHero?: any }>`
	width: 30vw;
	height: 38vw;
	overflow: hidden;
	position: relative;
	@media (max-width: 991px) {
		position: absolute;
		z-index: 1;
		bottom: 36px;
		width: 50vw;
		height: 65vw;
		visibility: ${({ visibility }) => visibility};
	}
	@media (max-width: 767px) {
		width: 60vw;
		height: 80vw;
	}
	.info-hero {
		width: 100%;
		height: 100%;
	}
	.info {
		width: 100%;
		height: 100%;
		background: url(${require('../../../../public/images/home/heros/frame-info-hero.svg').default});
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
`;

export const WrapperCard = styled.div`
	position: relative;
`;

export const InfomationCard = styled.div`
	text-align: center;
	position: absolute;
	z-index: 19;
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 0%);
	visibility: hidden;
	@media (max-width: 991px) {
		visibility: visible;
	}
`;

export const StartCard = styled.img`
	margin: auto;
	width: 55px;
`;

export const ViewInfomation = styled.div<{ chevUpIcon?: any }>`
	box-sizing: border-box;
	padding: 9px 49px 9px 19px;
	border: 1px solid #e5ac44;
	color: #e5ac44;
	border-radius: 5px;
	font-weight: 600;
	font-size: 13px;
	position: relative;
	margin: 0px 0px 0px;
	&:after {
		content: '';
		width: 38px;
		height: 100%;
		position: absolute;
		background: #e5ac44;
		top: 0;
		right: 0;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
	}
	&:before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translate(0%, -50%);
		right: 12px;
		background: url(${require('../../../../public/images/home/heros/chev-up.svg').default});
		width: 12px;
		height: 12px;
		z-index: 19;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}
`;

export const GroupCardCharacter = styled.div`
	margin: auto;
	width: 100%;
	margin: auto;
	height: 38vw;
	background: url(${require('../../../../public/images/home/heros/place.svg').default});
	background-size: contain;
	background-position: bottom;
	background-repeat: no-repeat;
	position: relative;
	@media (max-width: 991px) {
		height: 65vw;
	}
	@media (max-width: 767px) {
		height: 80vw;
	}
`;

const blurAnimate = keyframes`
    0% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
`;

export const Blur = styled.div`
	width: 100%;
	height: 100%;
	background: url(${require('../../../../public/images/home/heros/blur.svg').default});
	position: absolute;
	bottom: 0px;
	left: 0;
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	z-index: 5;
	animation: ${blurAnimate} 2s infinite linear;
`;

const rotate = keyframes`
    0% {
        top: 10px;
    }
    50% {
        top: 0px;
    }
    100% {
        top: 10px;
    }
`;
const translate = keyframes`
    0% {
        top: 10px;
    }
    50% {
        top: 0px;
    }
    100% {
        top: 10px;
    }
`;

export const CardGame = styled.div`
	perspective: 1000px;
`;

export const CardCharacter = styled.img`
	margin: auto;
	width: 57%;
	position: relative;
	z-index: 1;
	position: absolute;
	top: 0px;
	left: 20.4%;
	animation: ${rotate} 2s infinite linear;
	@media (max-width: 991px) {
		animation: ${translate} 2s infinite linear;
	}
`;

export const Raity = styled.img`
	position: absolute;
	z-index: 6;
	top: -15px;
	right: 35px;
	width: 80px;
`;
