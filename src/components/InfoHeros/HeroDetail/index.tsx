import React, { memo, useCallback, useLayoutEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import SideBarHome from 'components/home/SidebarHome';
import SideBarMobile from 'components/home/SidebarHome/Mobile';
import { ArrCharSSR, ArrCharSS, ArrCharS, ArrCharA, ArrCharB, ArrAll } from '../congfig';
import {
	Content,
	Hero,
	InfoHero,
	NameHero,
	Race,
	Star,
	History,
	Wrapper,
	Character,
	GroupHero,
	Combo,
	Skill,
	Combos,
	TitleCombos,
	ImgClass,
	HeroPage,
	Square,
	Container,
	GSkill,
	TitleSkill,
	DescSkill,
	TooltipInner,
	HeroMobile,
	BackHome,
	ImgBack,
	SkillBlock,
	Infomation,
	GrInfo,
	Info,
	TypeInfo,
	BackHomeMobile,
	TypeSkill,
	WrapSkill,
	Mode,
	GroupCharacter,
	GroupMode,
	IconMode,
	GroupInfo,
	Modes,
	Title,
	PrevHero,
	NextHero,
	GroupSlide,
	PrevDisable,
	NextHeroDisable
} from './styled';

import './styled.css';

enum TypeClick {
	PREV = 'prev',
	NEXT = 'next'
}

const TooltipSkill = ({ title, info, type, image }: { title: any; info: any; type: any; image: any }) => {
	return (
		<>
			<TooltipInner>
				<WrapSkill>
					<Skill background={image} />
					<TypeSkill>{type}</TypeSkill>
				</WrapSkill>
				<TitleSkill>{title}</TitleSkill>
				<DescSkill>{info}</DescSkill>
			</TooltipInner>
		</>
	);
};

const HerosDetail = () => {
	const history = useHistory();

	const handleBack = () => {
		const path = '/gallery';
		history.push(path);
	};

	// const [event, setEvent] = useState({ prevHero: '', nextHero: '' })

	const Raity = {
		ssr: ArrCharSSR,
		ss: ArrCharSS,
		s: ArrCharS,
		a: ArrCharA,
		b: ArrCharB
	};
	const ClassHero = {
		devil: require('../../../public/images/home/heros/class/class-1.webp').default,
		fairy: require('../../../public/images/home/heros/class/class-4.webp').default,
		monster: require('../../../public/images/home/heros/class/class-3.webp').default,
		human: require('../../../public/images/home/heros/class/class-5.webp').default,
		beast: require('../../../public/images/home/heros/class/class-2.webp').default
	};

	const mode = {
		ATF: require('../../../public/images/Gallery/other/atf.svg').default,
		DEF: require('../../../public/images/Gallery/other/def.svg').default,
		SP: require('../../../public/images/Gallery/other/sp.svg').default
	};
	const { name }: any = useParams();
	
	const Detail: any = ArrAll.find((item) => item.name.replace(/\s/g, '-').toLowerCase() === name.replace(/\s/g, '-').toLowerCase());

	const onHandleHero = useCallback((event: string) => {
		const prevHero = ArrAll.indexOf(Detail) === 0 ? ArrAll[ArrAll.length - 1].name.toLowerCase() : ArrAll[ArrAll.indexOf(Detail) - 1].name.toLocaleLowerCase();
		const nextHero = ArrAll.indexOf(Detail) === ArrAll.length - 1 ? ArrAll[0].name.toLowerCase() : ArrAll[ArrAll.indexOf(Detail) + 1].name.toLocaleLowerCase();
		if (event == TypeClick.PREV) {
			history.push(`/heros/${prevHero}`)
		}
		else if (event == TypeClick.NEXT) {
			history.push(`/heros/${nextHero}`)
		}
	}, [Detail])

	// console.log('==============>', '123');

	return (
		<>
			<Wrapper>
				<SideBarHome />
				<SideBarMobile />
				<Star />
				<Content>
					<BackHomeMobile onClick={handleBack}>
						<ImgBack src={require('../../../public/images/arrow-left.svg').default} alt="arrow" />
						Back to Gallery
					</BackHomeMobile>
					{Detail ? (
						<>
							<Container>
								<HeroMobile>
									<GroupHero className="hero">
										<GroupCharacter>
											<Character src={Detail.thumb} alt="character" />
										</GroupCharacter>
										<GroupInfo>
											<GroupSlide>
												<PrevDisable onClick={() => onHandleHero(TypeClick.PREV)}></PrevDisable>
												<NextHeroDisable onClick={() => onHandleHero(TypeClick.NEXT)}></NextHeroDisable>
											</GroupSlide>
											<Title>ATTACK TYPE</Title>
											<GroupMode>
												<Modes active={Detail.mode.toUpperCase() === 'ATF'}>
													<IconMode src={mode.ATF} />
													<Mode>ATF</Mode>
												</Modes>
												<Modes active={Detail.mode.toUpperCase() === 'DEF'}>
													<IconMode src={mode.DEF} />
													<Mode>DEF</Mode>
												</Modes>
												<Modes active={Detail.mode.toUpperCase() === 'SP'}>
													<IconMode src={mode.SP} />
													<Mode>SP</Mode>
												</Modes>
											</GroupMode>
											<Title>STATS</Title>
											<Infomation>
												<GrInfo>
													<TypeInfo
														src={require('../../../public/images/Gallery/other/attack.png').default}
														alt="attack"
													/>
													<Info>{Detail.dame}</Info>
												</GrInfo>
												<GrInfo>
													<TypeInfo
														src={require('../../../public/images/Gallery/other/hp.png').default}
														alt="defense"
													/>
													<Info>{Detail.health}</Info>
												</GrInfo>
												<GrInfo>
													<TypeInfo
														src={require('../../../public/images/Gallery/other/defense.png').default}
														alt="defense"
													/>
													<Info>{Detail.armo}</Info>
												</GrInfo>
												<GrInfo>
													<TypeInfo
														src={require('../../../public/images/Gallery/other/power.png').default}
														alt="defense"
													/>
													<Info>{Detail.power}</Info>
												</GrInfo>
											</Infomation>
										</GroupInfo>
									</GroupHero>
									<Combos>
										<TitleCombos>Abilities</TitleCombos>
										<Combo>
											{Detail.skill.map((skill, idx) => (
												<GSkill key={idx}>
													{skill.kill === '' ? (
														<SkillBlock
															background={
																require(`../../../public/images/Gallery/other/skill-block.png`).default
															}
														/>
													) : (
														<Tooltip
															placement="top"
															title={
																<TooltipSkill
																	title={skill.kill}
																	info={skill.info}
																	type={skill.type}
																	image={
																		skill.kill === ''
																			? require(`../../../public/images/Gallery/other/skill-block.png`)
																					.default
																			: require(`../../../public/images/Gallery/${Detail.name
																					.replace(/\s/g, '-')
																					.toUpperCase()}/${idx + 1}.png`).default
																	}
																/>
															}
														>
															<Skill
																background={
																	require(`../../../public/images/Gallery/${Detail.name
																		.replace(/\s/g, '-')
																		.toUpperCase()}/${idx + 1}.png`).default
																}
															/>
														</Tooltip>
													)}
												</GSkill>
											))}
										</Combo>
									</Combos>
								</HeroMobile>
								<InfoHero>
									<Race>
										<ImgClass src={ClassHero[Detail.race.toLowerCase()]} alt="class" />
										{Detail.race}
									</Race>
									<NameHero>{Detail.name}</NameHero>
									<History>{Detail.description ? Detail.description : ``}</History>
								</InfoHero>
								<Hero>
									<GroupHero>
										<GroupCharacter>
											<Character src={Detail.thumb} alt="character" />
										</GroupCharacter>
										<GroupInfo>
											<GroupSlide>
												<PrevDisable onClick={() => onHandleHero(TypeClick.PREV)}></PrevDisable>
												<NextHeroDisable onClick={() => onHandleHero(TypeClick.NEXT)}></NextHeroDisable>
											</GroupSlide>
											<Title>ATTACK TYPE</Title>
											<GroupMode>
												<Modes active={Detail.mode.toUpperCase() === 'ATF'}>
													<IconMode src={mode.ATF} />
													<Mode>ATF</Mode>
												</Modes>
												<Modes active={Detail.mode.toUpperCase() === 'DEF'}>
													<IconMode src={mode.DEF} />
													<Mode>DEF</Mode>
												</Modes>
												<Modes active={Detail.mode.toUpperCase() === 'SP'}>
													<IconMode src={mode.SP} />
													<Mode>SP</Mode>
												</Modes>
											</GroupMode>
											<Title>STATS</Title>
											<Infomation>
												<GrInfo>
													<TypeInfo
														src={require('../../../public/images/Gallery/other/attack.png').default}
														alt="attack"
													/>
													<Info>{Detail.dame}</Info>
												</GrInfo>
												<GrInfo>
													<TypeInfo
														src={require('../../../public/images/Gallery/other/hp.png').default}
														alt="defense"
													/>
													<Info>{Detail.health}</Info>
												</GrInfo>
												<GrInfo>
													<TypeInfo
														src={require('../../../public/images/Gallery/other/defense.png').default}
														alt="defense"
													/>
													<Info>{Detail.armo}</Info>
												</GrInfo>
												<GrInfo>
													<TypeInfo
														src={require('../../../public/images/Gallery/other/power.png').default}
														alt="defense"
													/>
													<Info>{Detail.power}</Info>
												</GrInfo>
											</Infomation>
										</GroupInfo>
									</GroupHero>
									<Combos>
										<TitleCombos>Abilities</TitleCombos>
										<Combo>
											{Detail.skill.map((skill, idx) => (
												<GSkill key={idx}>
													{skill.kill === '' ? (
														<SkillBlock
															background={
																require(`../../../public/images/Gallery/other/skill-block.png`).default
															}
														/>
													) : (
														<Tooltip
															placement="top"
															title={
																<TooltipSkill
																	title={skill.kill}
																	info={skill.info}
																	type={skill.type}
																	image={
																		skill.kill === ''
																			? require(`../../../public/images/Gallery/other/skill-block.png`)
																					.default
																			: require(`../../../public/images/Gallery/${Detail.name
																					.replace(/\s/g, '-')
																					.toUpperCase()}/${idx + 1}.png`).default
																	}
																/>
															}
														>
															<Skill
																background={
																	require(`../../../public/images/Gallery/${Detail.name
																		.replace(/\s/g, '-')
																		.toUpperCase()}/${idx + 1}.png`).default
																}
															/>
														</Tooltip>
													)}
												</GSkill>
											))}
										</Combo>
									</Combos>
								</Hero>
							</Container>
							<BackHome onClick={handleBack}>
								<ImgBack src={require('../../../public/images/arrow-left.svg').default} alt="arrow" />
								Back to Gallery
							</BackHome>
						</>
					) : (
						<BackHome onClick={handleBack}>
							<ImgBack src={require('../../../public/images/arrow-left.svg').default} alt="arrow" />
							Back to Gallery
						</BackHome>
					)}
				</Content>
			</Wrapper>
		</>
	);
};

export default memo(HerosDetail);
