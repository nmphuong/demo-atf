import styled from 'styled-components';
import BackgroundWraperPagez from '../../public/images/home/bgAbso.png';

export const Wrapper = styled.div<{ loading?: boolean }>`
	${({ loading }) =>
		loading === true
			? `
        height: 0;
        overflow: hidden;
        opacity: 0;
    `
			: ''};
	.wraper-page {
		background-color: rgb(22, 6, 44);
		background-size: cover;
		background-position: top;
		background-repeat: no-repeat;
		position: relative;
		top: -2px;

		&:after {
			content: '';
			position: absolute;
			top: -205px;
			left: 0;
			width: 100%;
			height: 100%;
			background: url(${BackgroundWraperPagez});
			background-size: contain;
			background-position: top;
			background-repeat: no-repeat;
			opacity: 0.4;

			@media (max-width: 1440px) {
				top: -150px;
			}

			@media (max-width: 1280px) {
				top: -108px;
			}

			@media (max-width: 820px) {
				top: 0px;
			}
		}
	}
`;
