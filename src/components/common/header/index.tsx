import React, { Suspense } from 'react';
import loadable, { lazy } from '@loadable/component';
import { Router, Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';
import queryString from 'query-string'
// import Dashboard from '../../home';

import MysteryBox from 'components/mystery-box';
import Marketplace from 'components/marketplace';

import LoadingFull from '../../../components/loading-full';
import ScrollToTop from '../../SrollTopClickPage';

import MyProfile from 'components/my-profile';
import UnlockGame from 'components/my-asset/my-item/unlock';
import MarketBoxDetail from 'components/marketplace/market-box/detail';
import MarketHeroDetail from 'components/marketplace/market-hero/detail';
import MarketItemDetail from 'components/marketplace/market-item/detail';
import ClaimToken from 'components/my-asset/claim-token';
import ReferalCode from 'components/referal-code';

const Dashboard = loadable(() => import('../../home'));

const MyHeroDetail = lazy(() => import('components/my-asset/my-hero/detail'));
const MyItemDetail = lazy(() => import('components/my-asset/my-item/detail'));
const New = lazy(() => import('components/new'));
const Shop = lazy(() => import('components/shop'));
const StakeAsset = lazy(() => import('components/stake-asset'));

const CominSoon = lazy(() => import('components/cominsoon'));
const BoxDetail = lazy(() => import('components/box-detail'));
const MyAsset = lazy(() => import('components/my-asset'));
const ClaimBox = lazy(() => import('components/my-asset/claim-box'));
const MyBoxDetail = lazy(() => import('components/my-asset/my-box/detail'));

const Playnow = lazy(() => import('../../PlayNow/PlayNow'));

const Heros = lazy(() => new Promise((resolve, reject) => setTimeout(() => resolve(import('../../InfoHeros')), 500)), {
	fallback: (
		<>
			<LoadingFull />
		</>
	)
});

const HerosDetail = lazy(() => import('../../InfoHeros/HeroDetail'));

const ImgToken = lazy(() => import('../../ImgToken'));

const AnimationData = lazy(() => import('components/my-asset/Awaitdata'));

declare const window: Window & typeof globalThis & { ethereum: any };
const HeaderRouter: React.FC = () => {
	const location = useLocation();
	const history = useHistory();


	let paramUrl = queryString.parse(location.search);
	if (paramUrl.refCode != undefined && paramUrl.refCode.length > 0) {
		let refCode: any = paramUrl.refCode;
		window.localStorage.setItem('refCode', refCode);
	}

	function NavMenu() {
		return (
			<Router history={history}>
				<ScrollToTop />

				<Route path="/" exact>
					<Dashboard />
				</Route>

				<Route path="/home" exact>
					<Redirect to="/" />
				</Route>

				<Suspense fallback={<LoadingFull />}>
					<Switch>
						<Route path="/home" component={Dashboard} />
						<Route
							path="/marketplace/box/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MarketBoxDetail /**: CominSoon*/}
						/>
						<Route
							path="/marketplace/hero/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MarketHeroDetail /**: CominSoon*/}
						/>
						<Route
							path="/marketplace/item/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MarketItemDetail /**: CominSoon*/}
						/>
						<Route
							path="/marketplace"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ Marketplace /**: CominSoon*/}
						/>
						<Route
							path="/marketplace/box"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ Marketplace /**: CominSoon*/}
						/>
						<Route
							path="/marketplace/hero"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ Marketplace /**: CominSoon*/}
						/>
						<Route
							path="/marketplace/item"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ Marketplace /**: CominSoon*/}
						/>
						<Route
							path="/mystery-box/detail/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ BoxDetail /**: CominSoon*/}
						/>
						<Route
							path="/mystery-box"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MysteryBox /**: CominSoon*/}
						/>
						<Route
							path="/my-assets/box/detail/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MyBoxDetail /**: CominSoon*/}
						/>
						<Route
							path="/my-assets/hero/detail/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MyHeroDetail /**: CominSoon*/}
						/>
						<Route
							path="/my-assets/item/detail/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MyItemDetail /**: CominSoon*/}
						/>
						<Route
							path="/my-assets/item/unlock/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ UnlockGame /**: CominSoon*/}
						/>
						<Route path="/my-assets" component={/**process.env.REACT_APP_ENV === 'development' ? */ MyAsset /**: CominSoon*/} />
						<Route
							path="/my-profile/deposit-gem"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MyProfile /**: CominSoon*/}
						/>
						<Route
							path="/my-profile/deposit"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MyProfile /**: CominSoon*/}
						/>
						<Route
							path="/my-profile"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ MyProfile /**: CominSoon*/}
						/>
						<Route
							path="/item/detail/:id"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ CominSoon /**: CominSoon*/}
						/>
						<Route path="/stake-assets" component={StakeAsset} />
						<Route
							path="/claim-box"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ ClaimBox /**: CominSoon*/}
						/>
						<Route
							path="/claim-token"
							component={/**process.env.REACT_APP_ENV === 'development' ? */ ClaimToken /**: CominSoon*/}
						/>
						<Route path="/profile" component={CominSoon} />
						<Route path="/referal-codes" component={ReferalCode} />
						<Route path="/shop" component={Shop} />
						<Route path="/new" component={New} />
						<Route path="/team" component={CominSoon} />
						<Route path="/play-now" component={Playnow} />
						<Route path="/gallery" component={Heros} />
						<Route path="/heros/:name" component={HerosDetail} />
						<Route path="/img/token.png" component={ImgToken} />
						<Route path="/openbox" component={AnimationData} />
					</Switch>
				</Suspense>
			</Router>
		);
	}

	return (
		<>
			<Router history={history}>
				<NavMenu />
			</Router>
		</>
	);
};





export default HeaderRouter;
