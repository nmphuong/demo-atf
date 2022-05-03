import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.slick-slider {
		padding: 30px 0px;
	}
	ul {
		&.slick-dots-card.slick-thumb-card {
			display: none !important;

			/* padding: 0;
			margin: 0;
			position: absolute;
			bottom: 0%;
			left: 50%;
			list-style: none;
			display: flex !important;
			transform: translateX(-50%);
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
			} */
		}
	}

	.slick-next {
		right: -5%;
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
		left: -5%;
		z-index: 19;
		&:before {
			background: url(${require('../../../../public/images/home/heros/prev-slide.svg').default});
			color: transparent;
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
	}
`;

export const Card = styled.div`
	width: 100%;
	gap: 60px;
	row-gap: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: wrap;

	& > * {
		width: 250px;
	}

	@media (max-width: 1440px) {
		gap: 0px !important;

		& > * {
			width: calc(3 / 12 * 100%);
		}
	}

	@media (max-width: 769px) {
		& > * {
			width: calc(4 / 12 * 100%);
		}
	}

	@media (max-width: 500px) {
		& > * {
			width: 100%;
		}
	}
`;

export const CardBox = styled.div`
	width: 100%;
	gap: 60px;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: wrap;

	& > * {
		width: 255px;
	}

	@media (max-width: 1024px) {
		gap: 0px !important;

		& > * {
			width: calc(3 / 12 * 100%);
		}
	}

	@media (max-width: 769px) {
		& > * {
			width: calc(4 / 12 * 100%);
		}
	}

	@media (max-width: 500px) {
		& > * {
			width: 100%;
		}
	}
`;

export const Img = styled.img`
	width: 100%;
	border-radius: 10px;
`;

export const CardGroup = styled.div`
	padding: 16px 10px;
	box-sizing: border-box;

	.cusAnimation__coreTeam {
		position: relative; ;
		overflow hidden;
        box-shadow: 0 5px 10px rgba( #000, .8 );
        transform-origin: center top;
        transform-style: preserve-3d;
        transform : translateZ(0);
        transition: .3s;
		border-radius: 8px;
		border: none;
    	outline: none;


		&:after {
			position: absolute;
			content :'';
            z-index: 10;
            width: 200%;
            height: 100%;
            top: -90%;
            left: -20px;
            opacity .1;
            transform: rotate( 45deg);
            background: linear-gradient(to top,transparent,#fff 15%,rgba(255,255,255,0.8));
            transition: 0.4s;
		}

		&:hover {
			box-shadow: 0 8px 16px 3px rgb(166 195 0 / 60%);
            transform: translateY( -3px ) scale( 1.05 ) rotateX( 15deg );


			&:after {
				transform: rotate( 25deg );
                top: -40%;
                opacity: .15;
			}
	}
}
	

	@media (max-width: 768px) {
		padding: 10px 10px;
	}
`;

export const TextGroup = styled.div`
	text-align: center;
	padding: 10px 0px;
`;

export const Name = styled.p`
	font-family: 'KoHo', sans-serif;
	color: rgba(249, 197, 73, 1);
	font-weight: bold;
	font-size: 24px;

	@media (max-width: 1024px) {
		font-size: 20px;
	}
	margin-bottom: 6px !important ;
	@media (max-width: 991px) {
		font-size: 13px;
	}
	@media (max-width: 500px) {
		font-size: 24px;
	}
`;

export const Position = styled.p`
	font-family: 'KoHo', sans-serif;
	color: #ffffff;
	font-weight: bold;
	font-size: 20px;

	@media (max-width: 1442px) {
		font-size: 17px;
	}

	@media (max-width: 1024px) {
		font-size: 14px;
	}
	@media (max-width: 991px) {
		font-size: 13px;
	}
	@media (max-width: 500px) {
		font-size: 18px;
	}
`;
