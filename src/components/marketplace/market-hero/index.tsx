import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Pagination, Modal, Form, Popover, Button, Spin, Tooltip, Empty } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useWrap } from 'context/WrapperContext';
import { useActiveWeb3React, useConnectWallet } from 'hooks';
import web3 from 'web3';
import { MarketApi } from 'config/api/marketApi';
import NoneImg from '../../../public/images/none-img.png';
import NoneData from 'components/element/NoneData';
import LoadingItem from 'components/element/LoadingItem';
import CominSoon from 'components/cominsoon';
import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import LoadingFull from 'components/loading-full';
import { useGamePlayContract, useGEMContract } from '../../../hooks/useContract';
import { unlockNFTFromGame, claimNFT } from '../../my-profile/game-utils';
import FilterHero from '../filter-hero';

const { Header, Content } = Layout;

interface Col {
    classDefault: string;
}

declare const window: Window & typeof globalThis & { ethereum: any };

const MarketHero = () => {
    let tokenID = window.localStorage.getItem('tokenId');
    const history = useHistory();
    const { showNoti } = useWrap();

    const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
    const envChainId = process.env.REACT_APP_CHAIN_ID;
    const gamePlayAddress = process.env.REACT_APP_GAME_PLAY_CONTRACT ?? '';
    const gamePlayContract = useGamePlayContract(gamePlayAddress);
    const [loading, setLoading] = useState(false);
    const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);
    const { chainId, account, library } = useActiveWeb3React();
    const [dataProfile, setDataProfile] = useState<any>([]);
    const [loadingKey, setLoadingKey] = useState(0);
    const [loadingUnlock, setLoadingUnlock] = useState(false);
    const [disableUnlock, setDisableUnlock] = useState(false);

    const [isLoadingMint, setLoadingMint] = useState(false);

    const [totalRow, setTotalRow] = useState(0);
    const paramReset = {
        page: 0,
        size: 8,
        status: 'SELLING',
        heroType: null,
        heroRarity: null,
        sort: null,
        saleId: null
    };
    const [param, setParam] = useState(paramReset);

    // GET DATA BOX
    const getDataAsset = async () => {
        setLoading(true);

        try {
            let res = await MarketApi.getListAsset(param, 'CHARACTER');
            setTotalRow(parseInt(res.headers['x-total-count']));
            if (res.status === 200) {
                if (res.data && res.data.length > 0) {
                    setDataProfile(res.data);
                } else {
                    setDataProfile([]);
                }
            }
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        getDataAsset();

    }, [param]);

    const HeroContent = () => {

        return (
            <>
                <div className='lst-item'>
                    {dataProfile?.length > 0 ? (
                        dataProfile.map((item, index) => (

                            <div className="_item-list-item" key={index}>
                                <div className="asset-item">
                                    <div className="asset-id">#{item.gameItemNftId}</div>
                                    <div className="asset-image-item">
                                        <img src={item.assetImage == null || item.assetImage == '' ? NoneImg : item.assetImage} />
                                        <div className="mk-hero-name">{item.name}</div>
                                    </div>
                                    <div className="asset-name">
                                        <div className="btn-action">
                                            <div className="mk-box-price">
                                                <img src={require('../../../public/images/Marketplace/header/gae-token.webp').default} />
                                                {item.sellingPrice}
                                            </div>
                                            <div className="gr-action">
                                                <button className="btn-gold-claim font-normal" onClick={(event) => (window.location.href = `/marketplace/hero/${item.id}`)}>
                                                    <span>Detail</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            {/* <NoneData text={'No Data'} /> */}
                            {[{}, {}, {}, {}].map((it, index) => (
                                <div className="_item-list-item">
                                    <div className="asset-item">
                                        <div className="asset-id">#123</div>
                                        <div className="asset-image-item">
                                            <img src={require('../../../public/images/Marketplace/heros/xavia.png').default} />
                                            <div className="mk-hero-name">HERO</div>
                                        </div>
                                        <div className="asset-name">
                                            <div className="btn-action">
                                                {/* <div className="mk-box-price">
                                                    <img src={require('../../../public/images/Marketplace/header/gae-token.webp').default} />
                                                    2600
                                                </div> */}
                                                <div className="tba">
                                                    TBA
                                                </div>
                                                <div className="gr-action">
                                                    <button className="btn-gold-claim font-normal" onClick={(event) => (window.location.href = `/marketplace/hero/1`)}>
                                                        <span>Detail</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </>
                    )}
                </div>
            </>
        );
    };
    const onChange_Pagi = (pageNumber) => {
        setParam({
            ...param,
            page: pageNumber - 1
        });
    };
    return (

        <Layout className="asset-block">
            <Content style={{ margin: '0 0' }} className="page-container">
                {!account ? (
                    <div className="asset-content" style={{ padding: 0, minHeight: 360 }}>
                        <div className="wallet-content-connect">
                            <h3>NOTHING HERE YET...</h3>
                            <div className="pls-connect-text">Please connect your wallet to activate this page</div>
                            <div className="btn-connect-wl">
                                <ConnectWallet />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="asset-content" style={{ padding: 0, minHeight: 360 }}>
                        <div className='_page-main-content'>
                            <div className='filter'>
                                <div className="asset-filter">
                                    <div className="fillter-title">
                                        <span>Fillter</span>
                                        <Link className="clear-all" to="">Clear All</Link>
                                    </div>
                                    <FilterHero
                                        handleGetType={(value) => {
                                            setParam({
                                                ...param,
                                                heroType: value,
                                                page: 0
                                            });
                                        }}
                                        handleGetRarity={(value) => {
                                            setParam({
                                                ...param,
                                                heroRarity: value,
                                                page: 0
                                            });
                                        }}
                                        handleGetSaleId={(value) => {
                                            setParam({
                                                ...param,
                                                saleId: value,
                                                page: 0
                                            });
                                        }}
                                        handleGetSort={(value) => {
                                            setParam({
                                                ...param,
                                                sort: value,
                                                page: 0
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='content-data'>
                                <div className="asset-grid">
                                    <HeroContent />
                                </div>
                            </div>
                        </div>

                        {totalRow > 10 && (
                            <Pagination
                                // style={{ padding: 15, float: 'right' }}
                                current={param.page + 1}
                                defaultCurrent={1}
                                total={totalRow}
                                pageSize={param.size}
                                onChange={onChange_Pagi}
                                showSizeChanger={false}
                                className="pagiation-custom"
                            />
                        )}

                    </div>
                )}
            </Content>
            {(loadingUnlock || isLoadingMint) && <LoadingFull />}
        </Layout>
    );
};

export default MarketHero;
