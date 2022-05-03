import React from 'react';
import SideBarHome from '../../components/home/SidebarHome';
import SideBarHomeMobile from '../../components/home/SidebarHome/Mobile';

import SelectRace from './SelectRace';

import { Star, Wrapper, BoxFlex, Title, Desc } from './Style';

const index = () => {
	return (
		<Wrapper>
			<SideBarHome />
			<SideBarHomeMobile />
			<Star />
			<BoxFlex direc justify="flex-start" mt='180px'>
				<Title>CHOOSE YOUR HERO</Title>
				<Desc>
				In Legend of Galaxy, there are more than 100 characters divided into 5 races: Human, Beast, Monster, Devil and Fairy. Each race has its own characteristics, powers and special abilities
				</Desc>
			</BoxFlex>
			<SelectRace />
		</Wrapper>
	);
};

export default index;
