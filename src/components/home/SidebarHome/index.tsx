import React, { memo, useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

import IconLogo from '../../../public/images/home/LogoMain.png';

import {
	Wrapper,
	Logo,
	Menu,
	WrapperLink,
	Link,
	Playnow,
	DropdownList,
	LabelDropdown,
	DropdownListIcon,
	WrapperSubMenu,
	SubLink,
	OpenMenu,
	ImgOpenMenu,
	FixedContainer,
	LinkInPage
} from './styled';

import MenuConfig from './globalSetting';
import { useHookShowMenuMobile } from './Mobile/actionsSidebarMobile';
import { useLocation } from 'react-router-dom';
import { goToViolation } from '../Actions';

const Sidebar = () => {
	const [, actions] = useHookShowMenuMobile();
	const location: any = useLocation();

	const [showMenu, setShowMenu] = useState(true);
	const refPrevOffset = useRef(window.pageYOffset);

	useEffect(() => {
		const handleScroll = () => {
			const currentOffset = window.pageYOffset;
			const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
			const isTopOfPage = currentOffset === 0;
			if (isTopOfPage) {
				setShowMenu(true);
			} else if (!isBottomOfPage) {
				if (currentOffset < refPrevOffset.current) {
					setShowMenu(true);
				} else {
					setShowMenu(false);
				}
			}
			refPrevOffset.current = currentOffset;
		};
		const throttledHandleScroll = throttle(handleScroll, 200);

		window.addEventListener('scroll', throttledHandleScroll);
		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};
	}, []);

	return (
		<FixedContainer showMenu={showMenu} height={138}>
			<Wrapper>
				<Logo>
					<img height="86px" src={IconLogo} alt="logo" />
				</Logo>
				<OpenMenu onClick={() => actions.setShow(true)}>
					<ImgOpenMenu src={require('../../../public/images/home/sidebar/open-menu-mobile.svg').default} alt="open-menu-mobile" />
				</OpenMenu>
				<Menu>
					<WrapperLink>
						{MenuConfig.map((item: any, index) =>
							item.items ? (
								<DropdownList key={index}>
									<LabelDropdown>{item.label}</LabelDropdown>
									<DropdownListIcon src={require('../../../public/images/home/sidebar/chev-down.svg').default} alt="chev-down" />
									<WrapperSubMenu>
										{item.items.map((sub, idx) => (
											<Link key={idx} activate={location.pathname === item.href} to={sub.href}>
												<SubLink>{sub.label}</SubLink>
											</Link>
										))}
									</WrapperSubMenu>
								</DropdownList>
							) : (
								<>
								{/* If available path */}
									{item.href?.includes('https') ? (
										<a className="cusItems" href={item.href} target="_blank" rel="noreferrer">
											{item.label}
										</a>
									) : (
										// Internal Links
										item.href?.indexOf('#') !== -1  ? (
											<LinkInPage onClick={() => goToViolation(item.href.split('#').join(''))} key={index}>
												{item.label}
											</LinkInPage>
										) : (
											item.blank === true
											? (
												// Open a new tab
												<a className="cusItems" href={item.href} target="_blank" rel="noreferrer">
													{item.label}
												</a>
											) : (
												// Link in side
												<Link key={index} activate={location.pathname === item.href} to={item.href}>
													{item.label}
												</Link>
											)
										)
									)}
								</>
							)
						)}
					</WrapperLink>
					<Playnow to="/play-now" rel="noopener" aria-label="play-now" />
				</Menu>
			</Wrapper>
		</FixedContainer>
	);
};

export default memo(Sidebar);
