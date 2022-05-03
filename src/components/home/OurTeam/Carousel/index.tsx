// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { memo, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CardBox, Card, Img, Position, TextGroup, Wrapper, Name, CardGroup } from './styled';
import Team, { Boss, All } from '../globalSetting';

const Carousel = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	const customPaging = () => {
		return <img src={require(`../../../../public/images/home/generals/rec-01.svg`).default} alt="" />;
	};

	const settingsCard: any = {
		customPaging,
		dotsClass: 'slick-dots-card slick-thumb-card',
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const isMobile = width <= 501;

	return (
		<>
			<Wrapper>
				<>
					{isMobile ? (
						<Card>
							<Slider {...settingsCard}>
								{All.map((it, idx) => (
									<CardGroup key={idx}>
										<div className="cusAnimation__coreTeam">
											<Img
												className="cusDev"
												src={require(`../../../../public/images/home/our-team/${it.avatar}.webp`).default}
												alt={it.avatar}
											/>
										</div>
										<TextGroup>
											<Name>{it.name}</Name>
											<Position>{it.position}</Position>
										</TextGroup>
									</CardGroup>
								))}
							</Slider>
						</Card>
					) : (
						<>
							<CardBox>
								{Boss.map((it, idx) => (
									<CardGroup key={idx}>
										<div className="cusAnimation__coreTeam">
											<Img
												className="cusDev"
												src={require(`../../../../public/images/home/our-team/${it.avatar}.webp`).default}
												alt={it.avatar}
											/>
										</div>
										<TextGroup>
											<Name>{it.name}</Name>
											<Position>{it.position}</Position>
										</TextGroup>
									</CardGroup>
								))}
							</CardBox>
							<Card>
								{Team.map((it, idx) => (
									<CardGroup key={idx}>
										<div className="cusAnimation__coreTeam">
											<Img
												className="cusDev"
												src={require(`../../../../public/images/home/our-team/${it.avatar}.webp`).default}
												alt={it.avatar}
											/>
										</div>
										<TextGroup>
											<Name>{it.name}</Name>
											<Position>{it.position}</Position>
										</TextGroup>
									</CardGroup>
								))}
							</Card>
						</>
					)}
				</>
			</Wrapper>
		</>
	);
};

export default memo(Carousel);
