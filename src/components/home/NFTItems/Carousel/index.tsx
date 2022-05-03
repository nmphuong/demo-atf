import React, { memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, Img, Item, ListItem, Slide, SlideMobile, WrapImg, Wrapper } from './styled';

const Carousel = () => {
	const customPaging = () => {
		return (
			<img src={require(`../../../../public/images/home/generals/rec-01.svg`).default} alt="" />
		)
	};

	const settingsCard: any = {
		customPaging,
		dotsClass: 'slick-dots-card slick-thumb-card',
		dots: true,
		infinite: true,
        autoplay: true,
		autoplaySpeed: 2000,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	const characterMobile = [
		{
			card: require('../../../../public/images/home/nft-items/SSR/SSRCelixa.webp').default
		},
		{
			card: require('../../../../public/images/home/nft-items/SS/SSDeath.webp').default
		},
		{
			card: require('../../../../public/images/home/nft-items/S/SFiona.webp').default
		},
		{
			card: require('../../../../public/images/home/nft-items/A/ABelius.webp').default
		},
		{
			card: require('../../../../public/images/home/nft-items/B/BLily.webp').default
		}
	];

	const characterDesktop = [
		{
			group: [
				{
					card: 'SSR/SSRCelixa.webp'
				},
				{
					card: 'SSR/SSRVlader.webp'
				},
				{
					card: 'SSR/SSRXavia.webp'
				},
				{
					card: 'SSR/SSRYena.webp'
				},
			],
		},
		{
			group: [
				{
					card: 'SS/SSChinZao.webp'
				},
				{
					card: 'SS/SSDeath.webp'
				},
				{
					card: 'SS/SSKlarius.webp'
				},
				{
					card: 'SS/SSSephera.webp'
				},
			]
		},
		{
			group: [
				{
					card: 'S/SPegamus.webp'
				},
				{
					card: 'S/SMonkeyking.webp'
				},
				{
					card: 'S/SFiona.webp'
				},
				{
					card: 'S/SAllian.webp'
				},
			]
		},
		{
			group: [
				{
					card: 'A/ABelius.webp'
				},
				{
					card: 'A/ARichter.webp'
				},
				{
					card: 'A/ASkeleton.webp'
				},
				{
					card: 'A/AVivian.webp'
				},
			]
		},
		{
			group: [
				{
					card: 'B/BAlma.webp'
				},
				{
					card: 'B/BArdum.webp'
				},
				{
					card: 'B/BLily.webp'
				},
				{
					card: 'B/BCloeries.webp'
				}
			]
		}
	]

	return (
		<>
			<Wrapper>
				<Card>
					<Slide>
						<Slider {...settingsCard}>
							{
								characterDesktop.map((item, idex) => (
									<ListItem key={idex}>
										<Item>
											{
												item.group.map((i, id) => (
													<WrapImg key={id}>
														<div className="card" />
														<Img className="cusDev" src={require(`../../../../public/images/home/nft-items/${i.card}`).default} alt="hero" />
													</WrapImg>
												))
											}
										</Item>
									</ListItem>
								))
							}
						</Slider>
					</Slide>
					<SlideMobile>
						<Slider {...settingsCard}>
							{characterMobile.map((item: any, idex) => (
								<ListItem key={idex}>
									<Item>
										<Img className="cusDev" src={item.card} alt="hero" />
									</Item>
								</ListItem>
							))}
						</Slider>
					</SlideMobile>
				</Card>
			</Wrapper>
		</>
	);
};

export default memo(Carousel);
