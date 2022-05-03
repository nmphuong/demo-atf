import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Button, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import { useActiveWeb3React } from 'hooks';

import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import HeaderMobile from 'components/common/menu-sidebar-top';
import { MyBoxApi } from 'config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';

import LoadingFull from 'components/loading-full';
import HeaderPage from 'components/common/header-page';
import {
    useGAEContract,
    useGemNFTContract, useGemrMarketContract
} from 'hooks/useContract';
import web3 from 'web3';
import './myitem.css';
import {
    approveGAE,
    buyGem,
    getSellGemInfo
} from '../../../my-profile/game-utils';

const { Content } = Layout;
const { Option } = Select;

declare const window: Window & typeof globalThis & { ethereum: any };

const MarketItemDetail = () => {

    const envChainId = process.env.REACT_APP_CHAIN_ID;
    const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
    const gaeTokenAddress = process.env.REACT_APP_GAE_CONTRACT ?? '';
    const gaeTokenContract = useGAEContract(gaeTokenAddress);
    const gemMarketAddress = process.env.REACT_APP_GEM_NFT_MARKET_CONTRACT ?? '';
    const gemMarketContract = useGemrMarketContract(gemMarketAddress);


    const [quantityBuy, setQuantityBuy] = useState(0);
    let { id }: { id: string } = useParams();
    let history = useHistory();
    const typePage = history.location.search.replace('?', '');
    const [loadingDetail, setLoadingDetail] = useState(false);
    const { showNoti, tokenID } = useWrap();
    const { chainId, account } = useActiveWeb3React();
    const [detailInfo, setDetailInfo] = useState<IItemDetail>();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const [totalBox, setTotalBox] = useState(0);
    const [priceBox, setPriceBox] = useState(0);
    const [gaeApprove, setGaeApprove] = useState(0);

    const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);

    useEffect(() => {
        if (account && gaeTokenContract) {
            gaeTokenContract.allowance(account, gemMarketAddress).then((res) => {
                setGaeApprove(parseInt(res));
            });
        }
    }, [account]);


    const onChangeQuantity = (e: any) => {
        setQuantityBuy(parseInt(e.target.value));
        let price: any = detailInfo?.price;
        setTotal(parseInt(e.target.value) * price || 0)
    }

    const getDataDetail = async () => {
        setLoadingDetail(true);

        let res: any = null;
        try {
            res = await MyBoxApi.getItem(id);
            if (res.status === 200) {
                setDetailInfo(res.data);
                setTotalBox(parseInt(res.data.quantity))
                setPriceBox(parseFloat(res.data.boxPrice))
            }
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setLoadingDetail(false);
        }
    };

    useEffect(() => {
        getDataDetail();
    }, [account]);



    function onChangeSelect(value) {
        console.log(`selected ${value}`);
    }

    const onUnload = (event) => {
        event.preventDefault();
        return (event.returnValue = 'Are you sure you want to exit?');
    };




    const handleApproveGae = async () => {
        if (chainId != envChainId) {
            showNoti('warning', 'Wrong Network!');
            return;
        }
        try {
            setLoading(true);
            await approveGAE(gaeTokenContract, gemMarketAddress)
                .then((txn) => {
                    if (txn && txn.hash) {
                        let countNoti = 0;
                        const interval = setInterval(function () {
                            (async () => {
                                const res = await w3.eth.getTransactionReceipt(txn.hash);
                                if (res) {
                                    clearInterval(interval);
                                    if (res.status && res.blockNumber) {
                                        !countNoti && showNoti('success', 'Approve GAE Successfully');
                                        countNoti++;
                                        setGaeApprove(Math.pow(2, 256))
                                    } else {
                                        showNoti('error', 'Approve GAE Failed');
                                    }
                                    setLoading(false);
                                }
                            })();
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    if (error) {
                        if (error.code == 4001 && error.message) {
                            showNoti('warning', error.message);
                        } else {
                            if (error.data && error.data.message) {
                                showNoti('warning', error.data.message);
                            }
                        }
                    }
                });
        } catch (error: any) {
            setLoading(false);
            console.log(error);
        }
    };


    const handleBuyGemItem = async () => {
        if (chainId != envChainId) {
            showNoti('warning', 'Wrong Network!');
            return;
        }
        window.addEventListener('beforeunload', onUnload);

        try {
            if (loading || !account || !detailInfo || !gaeTokenContract) {
                return;
            }
            const saleInfo = await getSellGemInfo(gemMarketContract, detailInfo.saleId);
            if (saleInfo.seller == account) {
                showNoti('warning', 'You Can Not Buy Your Selling');
                return;
            }
            if (quantityBuy > parseInt(saleInfo.quantity)) {
                showNoti('warning', `Max Buy ${parseInt(saleInfo.quantity)}`);
                return;
            }
            if (parseInt(saleInfo.quoteTokenKey) === 0) {
                const bBalance = await w3.eth.getBalance(account);
                if (parseInt(bBalance) < saleInfo.price * quantityBuy) {
                    showNoti('warning', 'Insufficient BNB Balance.');

                    return;
                }
            } else if (parseInt(saleInfo.quoteTokenKey) === 1) {
                const gaeBalance = await gaeTokenContract.balanceOf(account);
                if (parseInt(gaeBalance) < saleInfo.price * quantityBuy) {
                    showNoti('warning', 'Insufficient GAE Balance.');
                    return;
                }
            }

            await buyGem(gemMarketContract, detailInfo.saleId, quantityBuy, parseInt(saleInfo.price))
                .then((txn) => {
                    if (txn && txn.hash) {
                        let countNoti = 0;
                        const interval = setInterval(function () {
                            (async () => {
                                const res = await w3.eth.getTransactionReceipt(txn.hash);

                                if (res) {
                                    clearInterval(interval);

                                    if (res.status && res.blockNumber) {
                                        if (!countNoti) {
                                            window.removeEventListener('beforeunload', onUnload);
                                            showNoti('success', 'Buy Box Successfully');
                                            countNoti++;
                                            const data = {
                                                buyerAddress: account,
                                                hash: res.transactionHash,
                                                totalPrice: parseFloat(web3.utils.fromWei(web3.utils.toBN(saleInfo.price), 'ether')),
                                                myAssetId: detailInfo.id
                                            };
                                            MyBoxApi.buyAsset(data, tokenID).finally(() => {
                                                history.push('/my-assets/hero?hero');
                                            });
                                        }
                                    } else {
                                        showNoti('warning', 'Buy Box Failed');
                                    }
                                    setLoading(false);
                                    window.removeEventListener('beforeunload', onUnload);
                                }
                            })();
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    window.removeEventListener('beforeunload', onUnload);
                    if (error) {
                        if (error.code == 4001 && error.message) {
                            showNoti('warning', error.message);
                        } else {
                            if (error.data && error.data.message) {
                                showNoti('warning', error.data.message);
                            }
                        }
                    }

                });
        } catch (error: any) {
            console.log(error);
            setLoading(false);
            window.removeEventListener('beforeunload', onUnload);
        }
    };
    return (
        <>
            <HeaderMobile />
            <HeaderPage />
            <Content className="page-container">
                <Row>
                    <Col className="gutter-row" xs={24} xl={4} md={4} sm={4}>
                        <div className="menu-sidebar">
                            <MenuSidebar />
                        </div>
                    </Col>
                    <Col className="gutter-row" xs={24} xl={20} md={20} sm={20}>
                        <div className="page-content">

                            <div className="detail-box">
                                <div className="back"><Link to="/mystery-box"><ArrowLeftOutlined /> Back </Link></div>
                                <div className="detail-block">
                                    <Row gutter={{ sm: 16, md: 16, lg: 32 }}>
                                        <Col className="gutter-row" xs={24} xl={8} md={8} sm={8}>
                                            <div className="hero-image-detail">
                                                <div className="hero-nft-id">#{detailInfo?.gameItemNftId}</div>
                                                <div className="asset-image-item">
                                                    <img src={require('../../../../public/images/Marketplace/stun/cystal-1.png').default} />
                                                </div>
                                                <div className="hero-provided"></div>
                                                <div className="hero-name-detail">
                                                    {detailInfo?.name ? detailInfo?.name : 'UPGRADE LV1'}
                                                </div>
                                            </div>
                                            <div className="detail-info">
                                                <p className="hero-ddress-info">
                                                    <span>Address Contract:</span>
                                                    <span>a1234...515f61</span>
                                                </p>
                                                <p className="hero-ddress-info">
                                                    <span>ID:</span>
                                                    <span>123</span>
                                                </p>
                                                <p className="hero-ddress-info">
                                                    <span>Creator’s Address:</span>
                                                    <span>a1234...515f61</span>
                                                </p>

                                                <p className="hero-ddress-info">
                                                    <span>Owner’s Address:</span>
                                                    <span>a1234...515f61</span>
                                                </p>
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" xs={24} xl={16} md={16} sm={16}>
                                            <div className="detail-info">
                                                <div className="box-name detail-box-name text-gold"><span>ITEM DETAIL</span></div>
                                                <p>Description</p>
                                                <div className="detail-des">
                                                    {detailInfo?.description}
                                                </div>
                                            </div>
                                            <div className="detail-info">
                                                <p className="mt-15">Amount</p>
                                                <div className="detail-des-input">
                                                    <input className="input-quantity-box" type="number" value={quantityBuy} onChange={(e) => onChangeQuantity(e)} name="quantity" disabled={!account} />
                                                    <img className="icon-box-detail" src="../../../images/card-1.png" />
                                                </div>
                                                <div className="detail-des-input mt-5">
                                                    <Row gutter={{ sm: 16, md: 16, lg: 32 }}>
                                                        <Col className="gutter-row" xs={24} xl={12} md={12} sm={12}>
                                                            <div className="detail-box-name">
                                                                <span className="detail-box-info-pr">Price</span> : <div className="price-info"><img src="../../../images/icon-price.png" /> {priceBox}</div>
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row" xs={24} xl={12} md={12} sm={12}>
                                                            <div className="detail-box-name text-right">
                                                                <span className="detail-box-info-pr">Total</span> : <div className="price-info"><img src="../../../images/icon-price.png" /> {total}</div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="btn-gold-div">

                                                        {account ? (!gaeApprove ? (
                                                            <Button htmlType='button' className='btn-gold'
                                                                onClick={handleApproveGae}>Approve GAE</Button>
                                                        ) : (
                                                            <Button htmlType='button' className='btn-gold'
                                                                onClick={handleBuyGemItem}>BUY NOW</Button>
                                                        )) : <ConnectWallet />}
                                                    </div>
                                                </div>
                                            </div>

                                        </Col>
                                    </Row>

                                    <div className="history-table">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {
                    loadingDetail || loading && (
                        <LoadingFull />
                    )
                }
            </Content >
        </>
    );
}

export default MarketItemDetail
