import React, { useEffect, useState, Suspense } from 'react';

import { Layout, Row, Col } from 'antd';
import 'antd/dist/antd.css';

// Component
import HeaderHome from 'components/common/header-home';
import Banner from './Banner';
import VideoBlock from './VideoBlock';
import GameComingSoon from './GameComingSoon';
import HoldGae from './HoldGae';
import GameComingSoon2 from './FeatureComingSoon2';

import NFTItems from './NFTItems';
import Heros from './Heros/Carousel';
import Roadmap from './Roadmap';
import Advisior from './Advisior';
import OurTeam from './OurTeam';
import Tokenomics from './Tokenomics';
import InvestorPartner from './InvestorPartner';
import Footer from './FooterIndex';
import { useHome } from 'hooks/useHome';

// Utils
import { fadeRight, fadeLeft } from './animation/animation.js';
// import { DownloadApp } from './Banner/setting';

// Styled Component
import { Wrapper } from './styled';

// Css
import './home.scss';
import './animate.css';
import './animation/animation.css';

const { Content } = Layout;

const Home = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [balance, setBalance] = useState<any>(undefined);

	const { getBalanceAPIBscscan } = useHome();

	useEffect(() => {
		const fadeRightData = document.querySelectorAll("[cus-fade='right']");
		fadeRight(fadeRightData);
		const fadeLeftData = document.querySelectorAll("[cus-fade='left']");
		fadeLeft(fadeLeftData);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			getBalanceAPIBscscan().then((res) => {
				// console.log('==============>', res);
				setBalance(Number(res));
			});
		}, 3000);
	}, []);

	return (
		<>
			<Wrapper loading={loading}>
				<HeaderHome />
				<Content className="content">
					<div className="banner-Box">
						<div className="banner-Char">
							<img src={require('../../public/images/home/banner/stone/Char2.webp').default} alt="hero" />
						</div>

						<div className="banner-Char2">
							<img src={require('../../public/images/home/banner/stone/Char1.webp').default} alt="hero" />
						</div>

						<div className="banner-Char cusChar7">
							<img src={require('../../public/images/home/banner/stone/bg02.webp').default} alt="stone" />
						</div>
						<div className="banner-Char2 cusChar8">
							<img src={require('../../public/images/home/banner/stone/bg04.webp').default} alt="stone" />
						</div>
					</div>
					<div className="download-group">
						<div className="download-desktop">
							<div className="bgToken">
								<img src={require('../../public/images/home/banner/bgToken.png').default} alt="bg-token" />
								<p className="textCus">0x3F33e49BfeE74c3E665087CB7EcD67C8Fb8e31b6</p>
							</div>
						</div>
						<div className="download-mobile"></div>
					</div>
					<Banner />
					<Suspense fallback={<div />}>
						<div className="wraper-page" id="wraper-page">
							<div className="container">
								<VideoBlock />

								<HoldGae />
								<div className="stars"></div>

								<GameComingSoon />
								<div className="stars"></div>

								<Suspense fallback={<div />}>
									<div className="character-block">
										<h1 className="title-gold">HEROES</h1>
										<div className="character-desc">
											<p>
												In Legend of Galaxy, there are more than 100 characters divided into 5 races: Human, Beast,
												Monster, Devil and Fairy. Each race has its own characteristics, powers and special
												abilities.
											</p>
										</div>
										<div className="character-content">
											<Heros />
										</div>
										<div className="stars"></div>
									</div>

									<div id="nft-items" className="nft-block">
										<NFTItems />
										<div className="stars"></div>
									</div>
								</Suspense>
							</div>
							<Suspense fallback={<div />}>
								<GameComingSoon2 />

								<div className="roadmap-block">
									<div className="w-100">
										<div className="roadmap-content">
											<h1 className="title-gold">ROAD MAP</h1>
											<div className="roadmap-list">
												<Roadmap />
											</div>
										</div>
									</div>
									<div className="stars"></div>
								</div>

								<div className="tokenomics">
									<div className="w-100">
										<div className="tokenomics-content">
											<h1 className="title-gold">TOKENOMICS</h1>
											<div className="tokenomics-list">
												<Tokenomics />
											</div>
										</div>
									</div>
									<div className="stars"></div>
								</div>

								<div id="team" className="our-team-block advisior">
									<h1 className="title-gold">ADVISOR</h1>
									<div className="our-team-content">
										<Advisior />
									</div>
									<div className="stars"></div>
								</div>

								<div className="our-team-block core-team">
									<h1 className="title-gold">CORE TEAM</h1>
									<div className="our-team-content">
										<OurTeam />
									</div>
									<div className="stars"></div>
								</div>

								<div className="investor-block">
									<h1 className="title-gold">Investor & Partner </h1>
									<div className="investor-content">
										<InvestorPartner />
									</div>
									<div className="stars"></div>
								</div>

								<div className="footer-block">
									<div className="container">
										<Footer />
									</div>
									<div className="stars"></div>
								</div>
							</Suspense>
						</div>
					</Suspense>
				</Content>
			</Wrapper>
		</>
	);
};

export default Home;
