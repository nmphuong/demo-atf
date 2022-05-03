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
    useCharacterMarketContract,
    useGAEContract,
} from 'hooks/useContract';
import web3 from 'web3';
import './myhero.css';
import {
    approveCharacterNFT,
    approveGAE, buyCharacter,
    depositCharacter,
    getSellCharacterInfo
} from '../../../my-profile/game-utils';

const { Content } = Layout;
const { Option } = Select;

declare const window: Window & typeof globalThis & { ethereum: any };

const MarketHeroDetail = () => {
    let tokenID = window.localStorage.getItem('tokenId');
    const envChainId = process.env.REACT_APP_CHAIN_ID;

    const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
    const gaeTokenAddress = process.env.REACT_APP_GAE_CONTRACT ?? '';
    const gaeTokenContract = useGAEContract(gaeTokenAddress);
    const characterMarketAddress = process.env.REACT_APP_CHARACTER_NFT_MARKET_CONTRACT ?? '';
    const characterMarketContract = useCharacterMarketContract(characterMarketAddress);




    let { id }: { id: string } = useParams();
    let history = useHistory();
    const typePage = history.location.search.replace('?', '');
    const [loadingDetail, setLoadingDetail] = useState(false);
    const { showNoti } = useWrap();
    const { chainId, account } = useActiveWeb3React();
    const [detailInfo, setDetailInfo] = useState<IItemDetail>();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [gaeApprove, setGaeApprove] = useState(0);


    const [totalBox, setTotalBox] = useState(0);

    const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);

    const getDataDetail = async () => {
        setLoadingDetail(true);

        let res: any = null;
        try {
            res = await MyBoxApi.getItem(id);
            if (res.status === 200) {
                setDetailInfo(res.data);
                setTotalBox(parseInt(res.data.quantity))
            }
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setLoadingDetail(false);
        }
    };

    useEffect(() => {
        if (account) {
            getDataDetail();
        }
    }, [account]);

    useEffect(() => {
        if (account && gaeTokenContract) {
            gaeTokenContract.allowance(account, characterMarketAddress).then((res) => {
                setGaeApprove(parseInt(res));
            });
        }
    }, [account]);

    const handleApproveGae = async () => {
        if (chainId != envChainId) {
            showNoti('warning', 'Wrong Network!');
            return;
        }
        try {
            setLoading(true);
            await approveGAE(gaeTokenContract, characterMarketAddress)
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
    const onUnload = (event) => {
        event.preventDefault();
        return (event.returnValue = 'Are you sure you want to exit?');
    };


    const onBuyAssetForm = async () => {
        if (chainId != envChainId) {
            showNoti('warning', 'Wrong Network!');
            return;
        }

        try {
            if (loading || !detailInfo || !gaeTokenContract ) {
                return;
            }


            if (!account) {
                showNoti('warning', 'You have not connected wallet');
                setLoading(false);
                return;
            }

            const saleInfo = await getSellCharacterInfo(characterMarketContract, detailInfo.saleId);

            if (saleInfo.seller == account) {
                showNoti('warning', 'You Can Not Buy Your Selling');
                setLoading(false);
                return;
            }

            if (saleInfo.status == 2) {
                showNoti('warning', 'Sold Out');
                return;
            }

            if (saleInfo.status == 3) {
                showNoti('warning', 'This Item Was Cancelled');
                return;
            }

            if (parseInt(saleInfo.quoteTokenKey) === 0) {
                const bBalance = await w3.eth.getBalance(account);
                if (parseInt(bBalance) < parseInt(saleInfo.price)) {
                    showNoti('warning', 'Insufficient BNB Balance.');
                    return;
                }
            } else if (parseInt(saleInfo.quoteTokenKey) === 1) {
                const zwzBalance = await gaeTokenContract.balanceOf(account);
                if (parseInt(zwzBalance) < parseInt(saleInfo.price)) {
                    showNoti('warning', 'Insufficient GAE Balance.');
                    return;
                }
            }

            window.addEventListener('beforeunload', onUnload);
            setLoading(true);

            await buyCharacter(characterMarketContract, detailInfo.saleId, parseInt(saleInfo.price), parseInt(saleInfo.quoteTokenKey))
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
                                            showNoti('success', 'Buy Asset Successfully');
                                            countNoti++;
                                            //  "quantity": Số lượng mua (= 1),
                                            //   "buyerAddress": Địa chỉ ví mua,
                                            //   "gameItemId": Game Item Id nếu mua từ System,
                                            //   "myAssetId": My Asset Id nếu mua từ người chơi khác,
                                            //   "hash": Giá trị hash,
                                            //   "price": Giá mua
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
                                        showNoti('error', 'Buy Asset Failed');
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
                    <div className='page-main'>
                        <div className="page-content">

                            <div className="detail-box">
                                <div className="back"><Link to="/marketplace/hero"><ArrowLeftOutlined /> Back </Link></div>
                                <div className="detail-block">
                                    <div className='detail-box-content'>
                                        <div className="detail-left">
                                            <div className="hero-image-detail">
                                                <div className="hero-nft-id">{detailInfo?.gameItemNftId ? detailInfo?.gameItemNftId : 'TBA'}</div>
                                                <div className="hero-img-detail">
                                                    <img src={detailInfo?.assetImage ? detailInfo?.assetImage : require('../../../../public/images/Marketplace/heros/xavia.png').default} />
                                                </div>
                                                <div className="hero-provided">
                                                    <span>Provided by</span>
                                                    <span>LegendOfGalaxy</span>
                                                </div>
                                                <div className="hero-name-detail">
                                                    {detailInfo?.name ? detailInfo?.name : 'HERO'}
                                                </div>
                                            </div>
                                            <div className="detail-info">
                                                <div className="_detail-info">
                                                    <p>Address Contract:</p>
                                                    <p>a1234...515f61</p>
                                                </div>
                                                <div className="_detail-info">
                                                    <p>ID: </p>
                                                    <p>123</p>
                                                </div>
                                                <div className="_detail-info">
                                                    <p>Creator’s Address: </p>
                                                    <p>a1234...515f61</p>
                                                </div>
                                                <div className="_detail-info">
                                                    <p>Owner’s Address: </p>
                                                    <span>{detailInfo?.ownerAddress.substring(0, 5)}...{detailInfo?.ownerAddress.substring(detailInfo?.ownerAddress.length - 5)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="detail-right">
                                            <div className="detail-info">
                                                <div className="box-name detail-box-name text-gold"><span>HERO DETAIL</span></div>
                                                <p>Description</p>
                                                <div className="detail-des">
                                                    {detailInfo?.description}
                                                </div>
                                                <p>Stats</p>
                                                <div className="detail-des">
                                                    <div className="hero-info-damn">
                                                        <span><img src={'../../images/heart.png'} /> 1580</span>
                                                        <span><img src={'../../images/damn.png'} /> 411</span>
                                                        <span><img src={'../../images/shield.png'} /> 411</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="detail-info">
                                                <p className="mt-15">Amount</p>
                                                <div className="detail-des-input">
                                                    <input className="input-quantity-box" type="number" value={1} disabled={true} name="quantity" />
                                                    <img className="icon-box-detail" src={require('../../../../public/images/Marketplace/header/character.webp').default} />
                                                </div>
                                                <div className="detail-des-input mt-5">
                                                    {
                                                        detailInfo?.price ? (
                                                            <Row gutter={{ sm: 16, md: 16, lg: 32 }}>
                                                                <Col className="gutter-row" xs={24} xl={12} md={12} sm={12}>
                                                                    <div className="detail-box-name">
                                                                        <span className="detail-box-info-pr">Price</span> : <div className="price-info"><img src={require('../../../../public/images/Marketplace/logo/gae-token.png').default} /> {detailInfo?.price}</div>
                                                                    </div>
                                                                </Col>
                                                                <Col className="gutter-row" xs={24} xl={12} md={12} sm={12}>
                                                                    <div className="detail-box-name text-right">
                                                                        <span className="detail-box-info-pr">Total</span> : <div className="price-info"><img src={require('../../../../public/images/Marketplace/logo/gae-token.png').default} /> {total}</div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        ) : (
                                                            <div className="tba">
                                                                TBA
                                                            </div>
                                                        )
                                                    }
                                                    <div className='btn-gold-div'>
                                                        {account ? (!gaeApprove ? (
                                                            <Button htmlType='button' className='btn-gold'
                                                                    onClick={handleApproveGae}>Approve GAE</Button>
                                                        ) : (
                                                            <Button htmlType='button' className='btn-gold'
                                                                    onClick={onBuyAssetForm}>BUY NOW</Button>
                                                        )) : <ConnectWallet />}
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="history-table">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default MarketHeroDetail
