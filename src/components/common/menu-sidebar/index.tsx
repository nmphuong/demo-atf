import React, { memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import {
	Wrapper,
	LinkLogo,
	Logo,
	Img,
	MenuContent,
	Menu,
	Item,
	ItemActive,
	LinkItem,
	// CloseMenuMobile,
	// ImgClose,
	BackgroundNone
} from './styled';

import menuSetting from './setting';
import { useHookShowMenuMobile } from './actionsSidebar';
import '../fonts/fonts.css';

const SidebarApp = () => {
	const location: any = useLocation();
	const [state, actions] = useHookShowMenuMobile();

	const handleTopTop = useCallback(() => {
		const timer = setTimeout(() => {
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}, 50);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<Wrapper className="menu-marketplace" mobileShow={state.show}>
				<BackgroundNone onClick={() => actions.setShow(false)} mobileShow={state.show} />
				<LinkLogo to="/">
					<Logo>
						<Img src={require('../../../public/images/sub-logo.webp').default} alt="logo" />
					</Logo>
				</LinkLogo>
				<MenuContent>
					<Menu>
						{menuSetting.map((item) =>
							location.pathname.indexOf(item.key) !== -1 ||
							location.pathname.indexOf(item.key_0) !== -1 ||
							location.pathname.indexOf(item.key_1) !== -1 ? (
								<ItemActive>
									<LinkItem onClick={handleTopTop} to={item.to}>
										{item.label}
									</LinkItem>
								</ItemActive>
							) : (
								<Item>
									<LinkItem onClick={handleTopTop} to={item.to}>
										{item.label}
									</LinkItem>
								</Item>
							)
						)}
					</Menu>
				</MenuContent>
			</Wrapper>
		</>
	);
};

export default memo(SidebarApp);
