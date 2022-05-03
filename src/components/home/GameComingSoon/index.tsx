import React, { memo } from 'react';
import './game-coming-soon.scss';


import BgGame1 from '../../../public/images/home/game-coming-soon/BgGame1.webp';
import BgGame2 from '../../../public/images/home/game-coming-soon/BgGame2.webp';
import BgGame3 from '../../../public/images/home/game-coming-soon/BgGame3.webp';

import BgChar1 from '../../../public/images/home/game-coming-soon/BgChar1.webp';
import BgChar2 from '../../../public/images/home/game-coming-soon/BgChar2.webp';
import BgChar3 from '../../../public/images/home/game-coming-soon/BgChar3.webp';

const ArrImg = [
	{
		Game: BgGame1,
		Char: BgChar1,
		title: `Players have to strategically deploy their heroes in battles to fight against their enemies, collecting and accumulating resources to upgrade their squads.`
	},
	{
		Game: BgGame3,
		Char: BgChar3,
		title: `Players will compete with each other in real-time battles..
		The victors will be rewarded with tokens and numerous resources to upgrade their heroes.`
	},
	{
		Game: BgGame2,
		Char: BgChar2,
		title: `The Campaign consists of 15 maps in coherence with 15 battlefields of Legend Of Galaxy, each map will have corresponding missions along with the boss of the map, the strongest enemy and hold the most prized rewards.`
	}
];

// Css

const GameComingSoon = () => {
	return (
		<div className="mode-block" id="game-coming-soon">
			<div className="title-gold">Legend of Galaxy</div>
			<div className="mode-content">
				{ArrImg.map((item, idex) => (
					<>
						<div key={idex} className="game-coming-soon">
							<div className="img-gcs">
								<div className="img-gcs__CusAnimation" />
									
								
								<img className="img-gcs__Cus" src={item.Game} alt="how-to-play" />
								<img className="img-gcs__Cus2 " src={item.Char} alt="how-to-play" />
							</div>
							<div>
								<p className="mode-des">{item.title}</p>
							</div>
						</div>
					</>
				))}
			</div>
		</div>
	);
};

export default memo(GameComingSoon);
