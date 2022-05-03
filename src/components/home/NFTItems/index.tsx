import React, { memo } from 'react';
import Carousel from './Carousel';

import {
	Action,
	Content,
	ContentLeft,
	ContentRight,
	ContentRightCarousel,
	Description,
	GroupAction,
	ReadMore,
	Right,
	SectionContent,
	Wrapper
} from './styled';

const NFTItems = () => {
	return (
		<>
			<Wrapper>
				<Content>
					<SectionContent>
						<ContentLeft>
							<Carousel />
						</ContentLeft>
						<ContentRight>
							<Right>
								<div className="title-gold">NFT ITEMS</div>
								<Description>
									Players can easily trade, buy or lend assets on Legend of Galaxy Marketplace with ease.
								</Description>
								<GroupAction>
									<Action to="/">MARKETPLACE</Action>
									<ReadMore to="/">READ MORE</ReadMore>
								</GroupAction>
							</Right>
						</ContentRight>
						<ContentRightCarousel>
							<Carousel />
						</ContentRightCarousel>
					</SectionContent>
				</Content>
			</Wrapper>
		</>
	);
};

export default memo(NFTItems);
