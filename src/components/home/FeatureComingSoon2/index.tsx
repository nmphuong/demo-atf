import React, { memo } from 'react';

import './game-coming-soon.scss';

import BgGame1 from '../../../public/images/home/game-coming-soon/Meta.webp';
import BgGame2 from '../../../public/images/home/game-coming-soon/Web.webp';
import BgGame3 from '../../../public/images/home/game-coming-soon/Play.webp';

const ArrImg = [
	{
		Game: BgGame1,

		title: `An appealing blockchain game with personalized NFT integrated in LFW Gamehub and ecosystem toward a true metaverse for the community.`
	},
	{
		Game: BgGame2,

		title: `Legend of Galaxy - Immersive Web 3.0 and Metaverse gaming experience
		Incubated by LFW ecosystem`
	},
	{
		Game: BgGame3,

		title: `Legend of Galaxy, as a decentralized exchange game, allows players to trade and exchange with their peers as well as curate game tokens, collectibles, NFT and other in-game assets.`
	}
];

// Css

const GameComingSoon = () => {
	return (
		<div className="mode-block" id="game-coming-soon">
			<div className="title-gold">Feature</div>
			<div className="mode-content">
				{ArrImg.map((item, idex) => (
					<>
						<div key={idex} className="game-coming-soon">
							<div className="img-gcs">
								<div className="img-gcs__CusAnimation" />

								<img className="img-gcs__Cus" src={item.Game} alt="how-to-play" />
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
