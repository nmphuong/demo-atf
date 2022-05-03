import React, { memo } from 'react';

import { Content, Item, ListPartner, SectionContent, Wrapper } from './styled';
import DaoImg from '../../../public/images/home/investor-partner/Dao.webp';
import LfwImg from '../../../public/images/home/investor-partner/Lfw.webp';
import DareImg from '../../../public/images/home/investor-partner/DareNft.webp';
import PolkaImg from '../../../public/images/home/investor-partner/Polka.webp';
import DaoStarterImg from '../../../public/images/home/investor-partner/DaoStarter.png';
import BscLaunchImg from '../../../public/images/home/investor-partner/bsclaunch.svg';
import LfwFinanceImg from '../../../public/images/home/investor-partner/LfwFinance.webp';

const ArrPartner = [
	{
		href: 'https://lfw.finance/#/Dashboard',
		logo: LfwImg
	},
	{
		href: 'https://daolaunch.net',
		logo: DaoImg
	},
	{
		href: 'https://darenft.com',
		logo: DareImg
	},
	{
		href: 'https://polkabridge.org',
		logo: PolkaImg
	},
	{
		href: 'https://bsclaunch.org',
		logo: BscLaunchImg
	},
	{
		href: 'https://www.daostarter.pro/#/',
		logo: DaoStarterImg
	},
	{
		href: 'https://lfw.finance/#/Dashboard',
		logo: LfwFinanceImg
	}
];

const InvestorPartner = () => {
	return (
		<>
			<Wrapper>
				<Content>
					<SectionContent>
						<ListPartner>
							{ArrPartner.map((item, index) => {
								return (
									<a key={index} href={item.href} target="_blank" rel="noreferrer">
										<Item className={`cusDev_${index}`} src={item.logo} alt="..." />
									</a>
								);
							})}
						</ListPartner>
					</SectionContent>
				</Content>
			</Wrapper>
		</>
	);
};

export default memo(InvestorPartner);
