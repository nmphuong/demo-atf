import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { BoxFlex, BoxSelectRace, Container, BoxTabsCus, ClickRarity, BoxRace, Star, StyleButton } from './Style';
import { Tabs, Input } from 'antd';

import { ArrCharSSR, ArrCharSS, ArrCharS, ArrCharA, ArrCharB, ArrAll } from './congfig';

import ImgSsr from '../../public/images/HerosDetail/class-ssr.webp';
import ImgSs from '../../public/images/HerosDetail/class-ss.webp';
import ImgS from '../../public/images/HerosDetail/class-s.webp';
import ImgA from '../../public/images/HerosDetail/class-a.webp';
import ImgB from '../../public/images/HerosDetail/class-b.webp';
import ImgAll from '../../public/images/HerosDetail/class-all.webp';

import { ReactComponent as IconSearch } from '../../public/images/HerosDetail/search.svg';

// import Menu from './Menu';
// import Categories from './Categories';
// //text
// const ArrRace = Array.from(new Set(ArrAll.map((item) => item.race)));
// const allCategories = ['all', ...ArrRace];

// console.log('======>', allCategories);

const SelectRarity = [
	{
		race: 'Devil',
		num: '1'
	},
	{
		race: 'Beast',
		num: '2'
	},
	{
		race: 'Monster',
		num: '3'
	},
	{
		race: 'Fairy',
		num: '4'
	},
	{
		race: 'Human',

		num: '5'
	}
];

const SelectRace = () => {
	const [search, setSearch] = useState<string>('');
	const [data, setData] = useState<any>(SelectRarity);
	const [race, setRace] = useState<string>('');
	const [click, setClick] = useState<boolean>(false);

	//text

	// const [menuItems, setMenuItems] = useState(ArrAll);
	// const [categories, setCategories] = useState(allCategories);

	// const filterItems = (race) => {
	// 	if (race === 'all') {
	// 		setMenuItems(ArrAll);
	// 		return;
	// 	}
	// 	const newItems = ArrAll.filter((item) => item.race === race);
	// 	setMenuItems(newItems);
	// };

	// console.log('====>', menuItems);
	// console.log('====>', categories);

	const { TabPane } = Tabs;

	function callback(key) {
		console.log(key);
	}

	const tabs = [
		{
			character: ArrAll
		},
		{
			img: ImgB,
			character: ArrCharB
		},
		{
			img: ImgA,
			character: ArrCharA
		},
		{
			img: ImgS,
			character: ArrCharS
		},
		{
			img: ImgSs,
			character: ArrCharSS
		},

		{
			img: ImgSsr,
			character: ArrCharSSR
		}
	];

	const HandleSearch = useCallback(
		(e) => {
			setSearch(e.target.value);
		},
		[search]
	);

	const HandleClick = useCallback(
		(text: string) => {
			setClick(!click);
			setRace(text);
		},

		[click, data]
	);

	return (
		// <>
		// 	<main>
		// 		<section className="menu section">
		// 			<div className="title">
		// 				<h2>our menu</h2>
		// 				<div className="underline"></div>
		// 			</div>
		// 			{/* <Categories race={categories} filterItems={filterItems} /> */}

		// 			<div className="btn-container">
		// 				{categories.map((race, index) => {
		// 					return (
		// 						<button type="button" className="filter-btn" key={index} onClick={() => filterItems(race)}>
		// 							{race}
		// 						</button>
		// 					);
		// 				})}
		// 			</div>
		// 			<Menu items={menuItems} />
		// 		</section>
		// 	</main>
		// </>

		<>
			<Star />
			<Container>
				<BoxSelectRace>
					<BoxFlex justify="space-between">
						<BoxFlex gap="10px">
							<BoxTabsCus className="boxTabsCus">
								<h3 className="filter-hero">FILTER HEROES</h3>
								<div className="search-hero">
									<Input type="text" placeholder="SEARCH" onChange={HandleSearch} suffix={<IconSearch />} />
								</div>
								<BoxRace>
									{data.map((data, index) => (
										<>
											<StyleButton
												className={click ? 'cusBg' : ''}
												key={index}
												onClick={() => HandleClick(`${data.race}`)}
											>
												<img
													src={require(`../../public/images/home/heros/class/class-${data.num}.webp`).default}
													alt="..."
												/>
											</StyleButton>
										</>
									))}
								</BoxRace>
								<Tabs defaultActiveKey="0" onChange={callback} animated>
									{tabs.map((it, idx) => (
										<TabPane
											className={` ${click || search ? 'cusAnimated' : 'cusBoxAni'}`}
											tab={
												!it.img ? (
													<>
														<BoxFlex gap="10px">
															{/* <p className="title-race">Rarity</p> */}
															<span className="cusSpan">
																<img width="47px" height="44px" src={ImgAll} alt="" />
															</span>
														</BoxFlex>
													</>
												) : (
													<span className="bgIconHeroes">
														<img width="100%" src={it.img} alt="..." />
													</span>
												)
											}
											key={idx}
										>
											{click ? (
												<>
													{it.character
														.filter((val) => {
															if (val.race === 'Human' && race === 'Human') {
																return val;
															} else if (val.race === 'Devil' && race === 'Devil') {
																return val;
															} else if (val.race === 'Beast' && race === 'Beast') {
																return val;
															} else if (val.race === 'Fairy' && race === 'Fairy') {
																return val;
															} else if (val.race === 'Monster' && race === 'Monster') {
																return val;
															}
														})
														.filter((vals) => {
															if (search == '') {
																return vals;
															} else if (vals.name.toLowerCase().includes(search.toLowerCase())) {
																return vals;
															}
														})
														.map((item, index) => (
															<Link
																key={index}
																className="cusImgArr"
																to={`/heros/${item.name.replace(/\s/g, '-').toLowerCase()}`}
															>
																<img width="100%" src={item.thumb} alt={item.name} />
															</Link>
														))}
												</>
											) : (
												<>
													{it.character
														.filter((val) => {
															if (search == '') {
																return val;
															} else if (val.name.toLowerCase().includes(search.toLowerCase())) {
																return val;
															}
														})
														.map((item, index) => (
															<Link
																key={index}
																className="cusImgArr"
																to={`/heros/${item.name.replace(/\s/g, '-').toLowerCase()}`}
															>
																<img width="100%" src={item.thumb} alt={item.name} />
															</Link>
														))}
												</>
											)}
										</TabPane>
									))}
								</Tabs>
							</BoxTabsCus>
						</BoxFlex>
					</BoxFlex>
				</BoxSelectRace>
			</Container>
			<Star />
		</>
	);
};

export default SelectRace;
