import React, { memo, useRef, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Typed from 'react-typed';

import { FadeScrollV2 } from '../animation/FadeScroll';

import NumTotal from '../../../public/images/home/tokenomics/numTotal.png';

import {
	Wrapper,
	TokenomicsImg,
	Container,
	GroupButton,
	Content,
	PercentageIndicator,
	GroupDesc,
	Desc,
	ContainerMobile,
	TokenomicsImgMB,
	BoxTotal,
	DescTotal,
	BoxAfter,
	DescTitle,
	Containerz
} from './styled';

const Tokenomics = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const [srcoll, setScroll] = useState('');
	const refPrevOffset = useRef(7200);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			let activeClass = 'normal';
			if (window.pageYOffset >= refPrevOffset.current) {
				activeClass = 'AnimaTokennomics';
			}
			return setScroll(activeClass);
		});
	}, [srcoll]);

	console.log(window.pageYOffset);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 820;

	return (
		<>
			<>
				{isMobile ? (
					<Containerz>
						<>
							<Typed
								strings={[
									`<h1 style="color:#33DAFF" >Total supply: </h1> <h1 style="color:#FFF"> 500,000,000 GAE</h1>`,
									`<h1 style="color:#33DAFF" >Name: </h1> <h1 style="color:#FFF">  Legend Of Galaxy</h1>`,
									`<h1 style="color:#33DAFF" >Precision: </h1> <h1 style="color:#FFF">18</h1>`,
									`<h1 style="color:#33DAFF" >Smart Contract Address</h1> <h1 style="color:#FFF"> TBA</h1>`,
									`<h1 style="color:#33DAFF" >Symbol: </h1> <h1 style="color:#FFF">GAE</h1>`,
									`<h1 style="color:#33DAFF" >Network: </h1> <h1 style="color:#FFF">Binance Smart Chain</h1>`,
									`<h1 style="color:#33DAFF" >Standard: </h1> <h1 style="color:#FFF">BEP-20</h1>`
								]}
								typeSpeed={50}
								backSpeed={50}
								backDelay={100}
								loop
								smartBackspace
							/>
						</>
					</Containerz>
				) : (
					<Container>
						<BoxTotal>
							<BoxAfter>
								<DescTotal>Total supply:</DescTotal>
								<div>
									<img src={NumTotal} alt="..." />
								</div>
							</BoxAfter>
							<DescTitle>
								<Typed
									strings={[`<h1 style="color:#33DAFF" >Name: </h1> <h1> Legend Of Galaxy</h1>`]}
									typeSpeed={50}
									backSpeed={50}
									backDelay={13000}
									loop
									fadeOut
									smartBackspace
								/>
							</DescTitle>
							<DescTitle>
								<Typed
									strings={[`<h1 style="color:#33DAFF" >Precision: </h1> <h1>18</h1>`]}
									typeSpeed={100}
									backSpeed={100}
									startDelay={5000}
									backDelay={15000}
									loop
									fadeOut
									smartBackspace
								/>
							</DescTitle>
							<DescTitle>
								<Typed
									strings={[`<h1 style="color:#33DAFF" >Smart Contract Address: </h1> <h1> TBA</h1>`]}
									typeSpeed={50}
									backSpeed={50}
									startDelay={8000}
									backDelay={18000}
									loop
									fadeOut
									smartBackspace
								/>
							</DescTitle>
							<DescTitle>
								<Typed
									strings={[`<h1 style="color:#33DAFF" >Symbol: </h1> <h1>GAE</h1>`]}
									typeSpeed={100}
									backSpeed={100}
									backDelay={13000}
									loop
									fadeOut
									smartBackspace
								/>
							</DescTitle>
							<DescTitle>
								<Typed
									strings={[`<h1 style="color:#33DAFF" >Network: </h1> <h1>Binance Smart Chain</h1>`]}
									typeSpeed={50}
									backSpeed={50}
									startDelay={5000}
									backDelay={15000}
									loop
									fadeOut
									smartBackspace
								/>
							</DescTitle>
							<DescTitle>
								<Typed
									strings={[`<h1 style="color:#33DAFF" >Standard: </h1> <h1>BEP-20</h1>`]}
									typeSpeed={50}
									backSpeed={50}
									startDelay={8000}
									backDelay={18000}
									loop
									fadeOut
									smartBackspace
								/>
							</DescTitle>
						</BoxTotal>
					</Container>
				)}
			</>
			<Wrapper>
				<Container>
					<TokenomicsImg
						className={`${srcoll}`}
						src={require('../../../public/images/home/tokenomics/tokenomics.webp').default}
						alt="tokenomics"
					/>
					<GroupButton>
						<Content>
							<PercentageIndicator>
								<CountUp end={6} redraw={true}>
									{({ countUpRef, start }) => (
										<>
											<VisibilitySensor onChange={start} delayedCall>
												<span ref={countUpRef} />
											</VisibilitySensor>
											<span>%</span>
										</>
									)}
								</CountUp>
							</PercentageIndicator>
							<PercentageIndicator>
								<CountUp end={30} redraw={true}>
									{({ countUpRef, start }) => (
										<>
											<VisibilitySensor onChange={start} delayedCall>
												<span ref={countUpRef} />
											</VisibilitySensor>
											<span>%</span>
										</>
									)}
								</CountUp>
							</PercentageIndicator>
							<PercentageIndicator>
								<CountUp end={10} redraw={true}>
									{({ countUpRef, start }) => (
										<>
											<VisibilitySensor onChange={start} delayedCall>
												<span ref={countUpRef} />
											</VisibilitySensor>
											<span>%</span>
										</>
									)}
								</CountUp>
							</PercentageIndicator>
							<PercentageIndicator>
								<CountUp end={15} redraw={true}>
									{({ countUpRef, start }) => (
										<>
											<VisibilitySensor onChange={start} delayedCall>
												<span ref={countUpRef} />
											</VisibilitySensor>
											<span>%</span>
										</>
									)}
								</CountUp>
							</PercentageIndicator>
							<PercentageIndicator>
								<CountUp end={15} redraw={true}>
									{({ countUpRef, start }) => (
										<>
											<VisibilitySensor onChange={start} delayedCall>
												<span ref={countUpRef} />
											</VisibilitySensor>
											<span>%</span>
										</>
									)}
								</CountUp>
							</PercentageIndicator>
							<PercentageIndicator>
								<CountUp end={12} redraw={true}>
									{({ countUpRef, start }) => (
										<>
											<VisibilitySensor onChange={start} delayedCall>
												<span ref={countUpRef} />
											</VisibilitySensor>
											<span>%</span>
										</>
									)}
								</CountUp>
							</PercentageIndicator>
							<PercentageIndicator>
								<CountUp end={7} redraw={true}>
									{({ countUpRef, start }) => (
										<>
											<VisibilitySensor onChange={start} delayedCall>
												<span ref={countUpRef} />
											</VisibilitySensor>
											<span>%</span>
										</>
									)}
								</CountUp>
							</PercentageIndicator>
						</Content>
					</GroupButton>
					<GroupDesc>
						<Content>
							<Desc>
								<FadeScrollV2 isTrans>Public</FadeScrollV2>
							</Desc>
							<Desc>
								<FadeScrollV2 isTrans>Play to earn reward</FadeScrollV2>
							</Desc>
							<Desc>
								<FadeScrollV2 isTrans>Staking reward</FadeScrollV2>
							</Desc>
							<Desc>
								<FadeScrollV2 isTrans={false}>Community &#38; marketing</FadeScrollV2>
							</Desc>
							<Desc>
								<FadeScrollV2 isTrans={false}>Ecosystem</FadeScrollV2>
							</Desc>
							<Desc>
								<FadeScrollV2 isTrans={false}>Team</FadeScrollV2>
							</Desc>
							<Desc>
								<FadeScrollV2 isTrans={false}>Advisor &#38; partnership</FadeScrollV2>
							</Desc>
						</Content>
					</GroupDesc>
				</Container>
				<ContainerMobile>
					<TokenomicsImgMB src={require('../../../public/images/home/tokenomics/tokenomics-mb.webp').default} alt="tokenomics" />
				</ContainerMobile>
			</Wrapper>
		</>
	);
};

export default memo(Tokenomics);
