import React, { memo, useState } from 'react';

import { Tooltip } from 'antd';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FadeScrollV2 } from '../../animation/FadeScroll';

import {
	Card,
	Img,
	Info,
	Item,
	Wrapper,
	Thumb,
	InfoTop,
	NameStart,
	Name,
	Start,
	InfoSkill,
	TitleSection,
	InfoBottom,
	Combo,
	Skill,
	Description,
	WrapSkill,
	DescriptionSkill,
	NameSkill,
	Break,
	WrapperCard,
	InfomationCard,
	StartCard,
	ViewInfomation,
	GroupCardCharacter,
	CardCharacter,
	Blur,
	Raity,
	CardGame
} from './styled';

import { Character, TemporaryDataHero } from './temporaryData';
import Star from '../../../../public/images/home/heros/star.webp';

const Carousel = () => {
	const [showInfo, setShowInfo] = useState(false);

	const customPaging = (i) => {
		return <img src={require(`../../../../public/images/home/heros/class/class-${i + 1}.webp`).default} alt={`class-${i + 1}`} />;
	};

	const customPagingSettingCard = () => {
		return <img src={require(`../../../../public/images/home/generals/rec-01.svg`).default} alt="rec" />;
	};

	const settings = {
		customPaging,
		dotsClass: 'slick-dots slick-thumb',
		dots: true,
		infinite: true,
		// autoplay: true,
		autoplaySpeed: 4000,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
	};

	const settingsCard = {
		customPaging: customPagingSettingCard,
		dotsClass: 'slick-dots-card slick-thumb-card',
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

  const text = <span>Deals 200% ATK on an enemy and heals self a total of 30% of max HP.</span>

	return (
		<>
			<Wrapper id="ss-hero">
				<Slider {...settings}>
					{TemporaryDataHero.map((item, index) => (
						<Item key={index}>
							<Info visibility={showInfo ? 'visible' : 'hidden'} className="info-character">
								{/* <FadeScrollV2> */}
								<div className="info-hero">
									<div className="info">
										<InfoTop>
											<Thumb
												src={require(`../../../../public/images/home/heros/thumb/${item.thumb}`).default}
												alt={item.thumb}
											/>
											<NameStart>
												<Name>{item.name}</Name>
												<Start className="Legend" src={Star} alt="" />
											</NameStart>
										</InfoTop>
										<InfoSkill>
											<TitleSection>Skill</TitleSection>
											<Combo>
												{item.combo.map((skill, idx) => (
													<WrapSkill key={idx}>
														<Tooltip className="cusBgTooltip" placement="topLeft" title={skill.text}>
															<Skill
																src={
																	require(`../../../../public/images/home/heros/skill/${skill.thumb}`)
																		.default
																}
																alt="skill"
															/>
														</Tooltip>

														<DescriptionSkill>
															<NameSkill>Macros</NameSkill>
															<Break />
															<Description>
																Emitting electric beams around yourself that randomly shock 2 enemies for
																[18] (+[7] per level) magic damage and 40% chance of stunning them for 2
																turns.
															</Description>
														</DescriptionSkill>
													</WrapSkill>
												))}
											</Combo>
										</InfoSkill>
										<InfoBottom>
											<TitleSection>Information</TitleSection>
											<Description dangerouslySetInnerHTML={{ __html: item.description }} />
										</InfoBottom>
									</div>
								</div>
								{/* </FadeScrollV2> */}
							</Info>
							<Card>
								{/* <FadeScrollV2 isTrans={false}> */}
								<div className="card-hero">
									<Slider {...settingsCard}>
										{Character[item.groupName].items.map((it, key) => (
											<WrapperCard key={key}>
												<GroupCardCharacter>
													<Blur />
													<CardGame>
														<CardCharacter
															src={require(`../../../../public/images/home/heros/${it.card}`).default}
															alt="hero"
														/>
													</CardGame>
												</GroupCardCharacter>
												<InfomationCard>
													<Name>{item.name}</Name>
													<Start className="Legend" src={Star} alt="" />
													<ViewInfomation
														onClick={() => {
															setShowInfo(!showInfo);
														}}
													>
														Information
													</ViewInfomation>
												</InfomationCard>
											</WrapperCard>
										))}
									</Slider>
								</div>
								{/* </FadeScrollV2> */}
							</Card>
						</Item>
					))}
				</Slider>
			</Wrapper>
		</>
	);
};

export default memo(Carousel);
