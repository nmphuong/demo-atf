import React, { memo, useState, useEffect, useRef } from 'react';
import BackgroundLogoB64 from '../images-b64/background-logo.b64.json';
import { Wrapper } from './styled';
import './banner.css';
// Import Media
import POSTER_BANNER from '../../../public/images/home/banner/BannerMain.webp'

const Banner = () => {
	const [zoom, setZoom] = useState(0);

	const video = window.document.querySelector<HTMLElement>('#video-banner');

	useEffect(() => {
		function handleScroll() {
			setZoom(window.pageYOffset);
			const scale = 1 + zoom / 2500;

			if (scale < 20) {
				return (video!.style.transform = `scale(${scale})`);
			}
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [zoom]);

	return (
		<Wrapper backgroundLogoMobile={BackgroundLogoB64.source}>
			<div className="banner">
				<div className="banner-content">
					<div className="video-container">
						<div className="video-background">
							<video
								id="video-banner"
								className="banner-desktop"
								autoPlay={true}
								loop={true}
								controls={false}
								muted
								preload="auto"
								playsInline
								poster={POSTER_BANNER}
								width="100%"
								height="100%"
							>
								<source src="https://s3.ap-southeast-1.amazonaws.com/legendofgalaxy.io/video/bg.mp4" type="video/mp4" />
							</video>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default memo(Banner);
