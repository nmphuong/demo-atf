import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Pagination, Modal, Form, Popover, Button, Spin, Tooltip } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
// import '../style.css';
import { isMobile } from 'react-device-detect';
import { useActiveWeb3React, useConnectWallet } from 'hooks';
import web3 from 'web3';
import { MyBoxApi } from '../../../config/api/myBoxApi';
import NoneImg from '../../../public/images/none-img.png';
import { useWrap } from 'context/WrapperContext';

import NoneData from 'components/element/NoneData';
// import { getBoxBalanceOfBatch, getSellBoxListInfo } from '../../graveyard/utils';
import LoadingItem from 'components/element/LoadingItem';
import CominSoon from 'components/cominsoon';
import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import { MarketApi } from 'config/api/marketApi';
import FilterBox from '../filter-box';

const { Header, Content } = Layout;

interface Col {
    classDefault: string;
}

declare const window: Window & typeof globalThis & { ethereum: any };

const MarketBox = () => {
    let tokenID = window.localStorage.getItem('tokenId');
    const { showNoti } = useWrap();
    const history = useHistory();

    const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
    const envChainId = process.env.REACT_APP_CHAIN_ID;

    const [loading, setLoading] = useState(false);

    const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);
    const { chainId, account, library } = useActiveWeb3React();
    const [dataProfile, setDataProfile] = useState<any>([]);

    const [totalRow, setTotalRow] = useState(0);
    const paramReset = {
        page: 0,
        size: 8,
        status: 'SELLING',
        boxType: null,
        sort: null,
        saleId: null
    };
    const [param, setParam] = useState(paramReset);

    // GET DATA BOX
    const getDataBox = async () => {
        setLoading(true);

        try {
            let res = await MarketApi.getListMarketBox(param);
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
        getDataBox();
    }, [param]);

    const BoxContent = () => {

        return (
            <>
                <div className='lst-item'>
                    {dataProfile?.length > 0 ? (
                        dataProfile.map((item, index) => (
                            <Col xs={24} sm={12} xl={6} key={index}>
                                <div className="asset-item">
                                    <div className="asset-id">#{item.boxNftId}</div>
                                    <div className="asset-quantity">x{item.quantity}</div>
                                    <div className="asset-image"><img src={item.boxImage == null || item.boxImage == '' ? NoneImg : item.boxImage} /></div>
                                    <div className="mk-asset-provided">
                                        <div className="mk-box-name">
                                            <Link className="link-item" to={`/marketplace/box/${item.myBoxId}`}>{item.boxName}</Link>
                                        </div>
                                    </div>
                                    <div className="asset-name">
                                        <span className="mk-box-price">
                                            <img src={require('../../../public/images/Marketplace/header/gae-token.webp').default} />
                                            {item.price}
                                        </span>
                                        <Button className="btn-gold-claim font-normal"
                                            onClick={(event) => (window.location.href = `/marketplace/box/${item.myBoxId}`)}
                                        >
                                            Detail
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <>
                            {/* <NoneData text={'No Data'} /> */}
                            {[{}, {}, {}, {}, {}, {}].map((it, index) => (
                                <div className="_item-list-item">
                                    <div className="asset-item">
                                        <div className="asset-id">#123</div>
                                        <div className="asset-quantity">x1</div>
                                        <div className="asset-image-item">
                                            <img src={require('../../../public/images/Marketplace/box/Conqueror-Box.png').default} />
                                            <div className="mk-box-name">CONQUEROR BOX</div>
                                        </div>
                                        <div className="asset-name">
                                            <div className="btn-action">
                                                {/* <div className="mk-box-price">
                                                    <img src={require('../../../public/images/Marketplace/header/gae-token.webp').default} />
                                                    2600
                                                </div> */}
                                                <div className='tba'>
                                                    TBA
                                                </div>
                                                <div className="gr-action">
                                                    <button className="btn-gold-claim font-normal" onClick={(event) => (window.location.href = `/marketplace/box/0`)}>
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
                                    <FilterBox
                                        handleGetType={(value) => {
                                            setParam({
                                                ...param,
                                                boxType: value,
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
                                    <BoxContent />
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
        </Layout>
    );
};

export default MarketBox;
