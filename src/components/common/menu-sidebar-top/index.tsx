import React, { memo } from 'react';

import { Img, Link, Logo, Wrapper, Content, OpenMenu, ImgOpenMenu, BoxCustom, BoxMenu } from './styled';

import { useHookShowMenuMobile } from '../menu-sidebar/actionsSidebar';

import ConnectWallet from 'components/connect-wallet/ConnectWallet';

const SidebarTopApp = () => {
	const [, actions] = useHookShowMenuMobile();

	return (
		<>
			<Wrapper>
				<Content>
					<BoxMenu>
						<OpenMenu onClick={() => actions.setShow(true)}>
							<ImgOpenMenu
								src={require('../../../public/images/home/sidebar/open-menu-mobile.svg').default}
								alt="open-menu-mobile"
							/>
						</OpenMenu>
						<Link to="/">
							<Logo>
								<Img src={require('../../../public/images/sub-logo.webp').default} alt="" />
							</Logo>
						</Link>
					</BoxMenu>

					<BoxCustom>
						<ConnectWallet />
					</BoxCustom>
				</Content>
			</Wrapper>
		</>
	);
};

export default memo(SidebarTopApp);
