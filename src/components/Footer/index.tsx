import React, { memo } from 'react';

import {
	Content,
	ContentFooter,
	ContentLeft,
	CopyRight,
	Divider,
	FooterLetf,
	FooterLetfCover,
	FooterRight,
	GroupItem,
	GroupLink,
	Icon,
	Item,
	Link,
	LinkInPage,
	Logo,
	Title,
	Wrapper,
	WrapperLink,
	TitleCty,
	BoxCty,
	BoxCtyx
} from './styled';

import MenuFooter from './globalSetting';

const Footer = () => {
	return (
		<>
			<Wrapper>
				<Content>
					<ContentFooter>
						<FooterLetf>
							<ContentLeft>
								<Logo src={require('../../public/images/home/generals/LogoFooter.webp').default} alt="logo" />
								<CopyRight>Copyright © 2022 legendofgalaxy.io All Rights Reserved</CopyRight>
							</ContentLeft>
						</FooterLetf>
						<FooterRight>
							{MenuFooter.map((item: any, idx) => (
								<GroupItem className={`box-${idx}`} key={idx}>
									<Item>
										<Title>{item.title}</Title>
										<GroupLink className={`icon-${idx}`} display={item.inline ? 'flex' : 'block'}>
											{item.items.map((sub, key) =>
												sub.label ? (
													<WrapperLink key={key}>
														{sub.href?.includes('https') ? (
															<a className="cusLink" href={sub.href} target="_blank" rel="noreferrer">
																{sub.label}
															</a>
														) : (
															<Link to={sub.href}>{sub.label}</Link>
														)}
													</WrapperLink>
												) : (
													<WrapperLink key={key}>
														{sub.href?.includes('https') ? (
															<a href={sub.href} target="_blank" rel="noreferrer">
																<Icon
																	src={require(`../../public/images/home/footer/${sub.icon}.svg`).default}
																	alt={sub.icon}
																/>
															</a>
														) : (
															<Link to={sub.href}>
																<Icon
																	src={require(`../../public/images/home/footer/${sub.icon}.svg`)}
																	alt={sub.icon}
																/>
															</Link>
														)}
													</WrapperLink>
												)
											)}
										</GroupLink>
										<BoxCty>
											<TitleCty>{item.lable}</TitleCty>
											<TitleCty>{item.lable2}</TitleCty>
										</BoxCty>
									</Item>
								</GroupItem>
							))}
						</FooterRight>
						<FooterLetfCover>
							<ContentLeft>
								<BoxCtyx>
									<p>Meta ArtInfinity Ltd.</p>
									<p>Incorporated Under The British Virgin Islands Business Companies Act 2004</p>
								</BoxCtyx>
								<Logo src={require('../../public/images/home/generals/LogoFooter.webp').default} alt="logo" />
								<CopyRight>Copyright © 2022 legendofgalaxy.io All Rights Reserved</CopyRight>
							</ContentLeft>
						</FooterLetfCover>
					</ContentFooter>
					<Divider />
				</Content>
			</Wrapper>
		</>
	);
};

export default memo(Footer);
