import React, { memo, useState } from 'react';

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
	CloseMenuMobile,
	ImgClose,
	BackgroundNone,
	WrapperItem,
	Children,
	ItemCollapse,
	LinkInPage
} from './styled';

import IconLogo from '../../../../public/images/home/LogoMain.png';

import { useHookShowMenuMobile } from './actionsSidebarMobile';
import MenuSetting from '../globalSetting';

const SidebarMenu = () => {
	const location: any = useLocation();
	const [state, actions] = useHookShowMenuMobile();
	const [showDropdown, setShowDropdown] = useState('');

	const goToViolation = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<>
			<Wrapper mobileShow={state.show}>
				<BackgroundNone onClick={() => actions.setShow(false)} mobileShow={state.show} />
				<LinkLogo to="/">
					<Logo>
						<Img src={IconLogo} alt="logo" />
					</Logo>
				</LinkLogo>
				<MenuContent>
					<Menu>
						{MenuSetting.map((item: any, key) =>
							location.pathname === item.href ? (
								<WrapperItem key={key}>
									<ItemActive>
										<LinkItem to={item.href}>{item.label}</LinkItem>
									</ItemActive>
								</WrapperItem>
							) : (
								<WrapperItem
									key={key}
									onClick={() => {
										if (showDropdown === item.key) {
											setShowDropdown('');
										} else {
											setShowDropdown(item.key);
										}
									}}
								>
									{item.items ? (
										<Item>
											<ItemCollapse show={showDropdown === item.key}>{item.label}</ItemCollapse>
										</Item>
									) : item.href?.indexOf('#') !== -1 ? (
										<Item>
											<LinkInPage onClick={() => goToViolation(item.href.split('#').join(''))}>
												{item.label}
											</LinkInPage>
										</Item>
									) : item.href?.includes('https') ? (
										<Item>
											<a className="cusItemsMB" href={item.href} target="_blank" rel="noreferrer">
												{item.label}
											</a>
										</Item>
									) : (
										<Item>
											<LinkItem className={'ok'} to={item.href}>
												{item.label}
											</LinkItem>
										</Item>
									)}
									{item.items ? (
										<Children show={showDropdown === item.key}>
											{item.items.map((it, idex) =>
												location.pathname === it.href ? (
													<ItemActive key={idex}>
														<LinkItem to={it.href}>{it.label}</LinkItem>
													</ItemActive>
												) : (
													<Item key={idex}>
														<LinkItem to={it.href}>{it.label}</LinkItem>
													</Item>
												)
											)}
										</Children>
									) : (
										<></>
									)}
								</WrapperItem>
							)
						)}
						{/* <Playnow to="/play-now" /> */}
						<CloseMenuMobile onClick={() => actions.setShow(false)}>
							<ImgClose src={require('../../../../public/images/home/sidebar/icon-close-menu-mobile.svg').default} alt="close-icon" />
						</CloseMenuMobile>
					</Menu>
				</MenuContent>
			</Wrapper>
		</>
	);
};

export default memo(SidebarMenu);
