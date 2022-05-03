import styled, { keyframes } from 'styled-components';

const animateUp = keyframes`
0% {
    transform: translatey(0px);
}
50% {
    transform: translatey(-20px);
}
100% {
    transform: translatey(0px);
    }
`;

const lightStreak = keyframes`
 
  0% {
    top: 200px;
  }
  100% {
    top: -600px;
  }

`;

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	.slick-slider {
		padding: 30px 0px;
	}
	ul {
		&.slick-dots-card.slick-thumb-card {
			padding: 0;
			// position: absolute;
			bottom: 0%;
			left: 50%;
			justify-content: center;
    		align-items: center;
			list-style: none;
			display: flex !important;
			// transform: translateX(-50%);
			gap: 5px;
			li {
				width: 20px;
				height: 7px;
				&.slick-active {
					width: 30px;
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
		right: 5%;
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
		left: 5%;
		z-index: 19;
		&:before {
			background: url(${require('../../../../public/images/home/heros/prev-slide.svg').default});
			color: transparent;
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
	@media (max-width: 991px) {
		ul {
			&.slick-dots-card.slick-thumb-card {
				display: none !important;
			}
		}
	}

	@media (min-width: 500px) {
		.slick-slide > div {
			padding-top: 25px;
		}
	}
`;

export const Card = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Img = styled.img`
	width: 100%;
	transition: all 2s linear;
	position: relative;
	animation: ${animateUp} 6s ease-in-out infinite;

	@media (max-width: 499px) {
		animation: none;
	}
`;

export const WrapImg = styled.div`
	width: 60%;
	padding: 3px 15px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	position: relative;

	.card {
		overflow: hidden;
		width: 90%;
		height: 95%;
		position: absolute;
		z-index: 99;
		border-radius: 30px;

		&:after {
			content: '';
			position: absolute;
			background: #fff;
			top: 200px;
			left: 200px;
			width: 5px;
			height: 700px;
			transform: rotate(45deg);
			box-shadow: 0px 0px 5px 5px #fff;
			filter: blur(15px);
			/* animation: ${lightStreak} 2s infinite ease-in-out; */
			transition: all 0.4s ease-in-out;
		}
	}

	&:hover .card:after {
		top: -600px;
	}

	@media (max-width: 767px) {
		width: 50%;
	}
	@media (max-width: 479px) {
		width: 70%;
	}
	@media (min-width: 992px) {
		:nth-child(odd) {
			justify-self: end;
		}
		:nth-child(even) {
			justify-self: start;
		}
	}
	:hover ${Img} {
	}
`;

export const Slide = styled.div`
	width: 100%;
	display: block;
	@media (max-width: 991px) {
		display: none;
	}
`;

export const Item = styled.div`
	display: grid;
	justify-items: center;
	grid-template-columns: repeat(2, 1fr);
	align-items: center;

	@media (min-width: 992px) {
		${Img}:nth-child(odd) {
			justify-self: end;
		}
		${Img}:nth-child(even) {
			justify-self: start;
		}
	}
	@media (max-width: 991px) {
		grid-template-columns: repeat(1, 1fr);
		width: 70%;
		margin: auto;
		margin-top: 0vw;
	}
`;

export const Description = styled.div`
	height: 100%;
`;

export const ListItem = styled.div``;

export const SlideMobile = styled.div`
	width: 100%;
	display: none;
	@media (max-width: 991px) {
		display: block;
	}
`;
