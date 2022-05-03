import React, { memo } from 'react';
import FadeScroll from '../animation/FadeScroll';
import HerosLoading from '../../../public/images/home/bgVideoChar_1.webp';

// Css
import './video-block.scss';

const VideoBlock = () => {
	return (
		<div className="video-block">
			<div className="title-gold">Introduction</div>
			<div className="video-desc">
				<p>
					Legend Of Galaxy is a crossroad game combined with general card role-playing; players will have the opportunity to
					recruit more than 100 characters and build the most powerful squad to participate in campaigns to conquer new
					territories in the galaxy.
				</p>
			</div>
			<div className="cusFlex">
				<FadeScroll>
					<div>
						<img className="cusAnimation" width="100%" src={HerosLoading} alt="gr-hero" />
					</div>
				</FadeScroll>
				<FadeScroll isTrans={false}>
					<div className="tl-video-content">
						<div className="custom-video">
							<iframe
								className="lzLoadingLegen"
								width="100%"
								height="100%"
								src="https://www.youtube.com/embed/H0QpA-O-BsQ"
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								frameBorder="0"
							/>
						</div>
					</div>
				</FadeScroll>
			</div>
		</div>
	);
};

export default memo(VideoBlock);
