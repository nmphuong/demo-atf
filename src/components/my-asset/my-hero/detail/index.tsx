import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Modal, Form, Input, InputNumber, Button, Select, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import { useActiveWeb3React } from 'hooks';

import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import HeaderMobile from 'components/common/menu-sidebar-top';
import { MyBoxApi } from 'config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';

import LoadingFull from 'components/Loading';
import HeaderPage from 'components/common/header-page';
import { ethers } from 'ethers';
import {
    useATFContract,
    useCampaignContract,
    useCharacterMarketContract,
    useCharacterNFTContract,
    useGamePlayContract
} from 'hooks/useContract';
import web3 from 'web3';
import AssetMenu from 'components/my-asset/asset-menu';
import './myhero.css';
import { approveCharacterNFT, depositCharacter, sellCharacter } from '../../../my-profile/game-utils';

const { Content } = Layout;
const { Option } = Select;

declare const window: Window & typeof globalThis & { ethereum: any };

const MyHeroDetail = () => {
    let tokenID = window.localStorage.getItem('tokenId');
    const atfContractAddress = process.env.REACT_APP_ATF_CONTRACT ?? '';
    const envChainId = process.env.REACT_APP_CHAIN_ID;
    const characterNFTAddress = process.env.REACT_APP_CHARACTER_NFT_CONTRACT ?? '';
    const gamePlayAddress = process.env.REACT_APP_GAME_PLAY_CONTRACT ?? '';
    const characterMarketAddress = process.env.REACT_APP_CHARACTER_NFT_MARKET_CONTRACT ?? '';

    const assetMarketQuoteToken = process.env.REACT_APP_ASSET_MARKET_TOKEN_KEY ?? 1;


    const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';

    const atfContract = useATFContract(atfContractAddress);
    const characterNFTContract = useCharacterNFTContract(characterNFTAddress);
    const gamePlayContract = useGamePlayContract(gamePlayAddress);
    const characterMarketContract = useCharacterMarketContract(characterMarketAddress);

    const [quantityBuy, setQuantityBuy] = useState(1);
    let { id }: { id: string } = useParams();
    let history = useHistory();
    const typePage = history.location.search.replace('?', '');
    const [loadingDetail, setLoadingDetail] = useState(false);
    const { showNoti } = useWrap();
    const { chainId, account } = useActiveWeb3React();
    const [detailInfo, setDetailInfo] = useState<IItemDetail>();
    const [total, setTotal] = useState(0);
    const [isApprovedMarket, setIsApprovedMarket] = useState<boolean>(false);
    const [isApprovedGame, setIsApprovedGame] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [isSellVisible, setIsSellVisible] = useState<boolean>(false);
    const [loadingSell, setLoadingSell] = useState(false);
    const [quoteKey, setQuoteKey] = useState(0);

    const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);

    const [sellForm] = Form.useForm();

    const onChangeQuantity = (e: any) => {
        setQuantityBuy(parseInt(e.target.value));
        let price: any = detailInfo?.price;
        setTotal(parseInt(e.target.value) * price || 0)
    }

    const getDataDetail = async () => {
        setLoadingDetail(true);

        let res: any = null;
        try {
            res = await MyBoxApi.getItemDetailByAddress(id, account, tokenID);
            if (res.status === 200) {
                setDetailInfo(res.data);
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

    const getApproveGamePlay = async () => {
        if (characterNFTContract) {
            const isApprovedForGame = await characterNFTContract.isApprovedForAll(account, gamePlayAddress);
            setIsApprovedGame(isApprovedForGame);

            const isApprovedForMarket = await characterNFTContract.isApprovedForAll(account, characterMarketAddress);
            setIsApprovedMarket(isApprovedForMarket);
        }
    }


    useEffect(() => {
        if (account) {
            getApproveGamePlay();

        }
    }, [account]);

    function onChangeSelect(value) {
        console.log(`selected ${value}`);
    }

    // const onCopy = () => {
    //     showNoti('success', 'Copied');
    // };

    const onUnload = (event) => {
        event.preventDefault();
        return (event.returnValue = 'Are you sure you want to exit?');
    };


    const onBringToGame = async () => {
        try {
            if (!detailInfo || loading || !characterNFTContract) {
                return;
            }
            if (chainId != envChainId) {
                showNoti('warning', 'Wrong Network!');
                return;
            }
            const owner = await characterNFTContract.ownerOf(detailInfo.gameItemNftId);

            if (owner.toLowerCase() === gamePlayAddress.toLowerCase()) {
                const payload = {
                    moveNftHash: gamePlayAddress,
                    ownerAddress: account,
                    gameItemNftId: detailInfo.gameItemNftId.toString(),
                    id: detailInfo.id,
                    gameItemType: "CHARACTER"
                };
                MyBoxApi.nftToGame(payload, detailInfo.id, tokenID).finally(() => {
                    window.removeEventListener('beforeunload', onUnload);
                    history.push({
                        pathname: '/my-assets/hero',
                        search: 'hero-in-game'
                    });
                });
                return;
            }

            window.addEventListener('beforeunload', onUnload);
            setLoading(true);
            await depositCharacter(gamePlayContract, detailInfo.gameItemNftId, characterNFTAddress)
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
                                            showNoti('success', 'Bring Successfully');
                                            countNoti++;

                                            const payload = {
                                                moveNftHash: res.transactionHash,
                                                ownerAddress: account,
                                                gameItemNftId: detailInfo.gameItemNftId.toString(),
                                                id: detailInfo.id,
                                                gameItemType: "CHARACTER"
                                            };
                                            MyBoxApi.nftToGame(payload, detailInfo.id, tokenID).finally(() => {
                                                window.removeEventListener('beforeunload', onUnload);
                                                history.push({
                                                    pathname: '/my-assets/hero',
                                                    search: 'hero-in-game'
                                                });
                                            });
                                        }
                                    } else {
                                        showNoti('warning', 'Bring Failed');
                                    }
                                    setLoading(false);
                                    window.removeEventListener('beforeunload', onUnload);
                                }
                            })();
                        }, 1000);
                    }
                })
                .catch((error) => {
                    window.removeEventListener('beforeunload', onUnload);
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
            window.removeEventListener('beforeunload', onUnload);
            console.log(error);
            if (error.data) {
                showNoti('error', error.data.message);
            }
        }

    };

    const handleApproveHero = async (address) => {
        try {
            if (chainId != envChainId) {
                showNoti('warning', 'Wrong Network!');
                return;
            }
            setLoading(true);

            await approveCharacterNFT(characterNFTContract, address)
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
                                            showNoti('success', 'Approve Character Successfully');
                                            countNoti++;
                                            if (address === gamePlayAddress) {
                                                setIsApprovedGame(true);
                                            }
                                            if (address === characterMarketAddress) {
                                                setIsApprovedMarket(true);
                                            }

                                        }
                                    } else {
                                        showNoti('warning', 'Approve Character Failed');
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
            if (error.data) {
                showNoti('error', error.data.message);
            }
        }
    };
    const closeBox = () => {
        setIsSellVisible(false);
        sellForm.resetFields();
    };
    const onShowModalSellHero = () => {
        sellForm.resetFields();
        setIsSellVisible(true);
    }
    const onSellForm = (values: any) => {
        handleSellCharacter(values.price);
    };


    const handleSellCharacter= async (price) => {
        if (chainId != envChainId) {
            showNoti('warning', 'Wrong Network!');
            return;
        }
        window.addEventListener('beforeunload', onUnload);
        try {
            if (loadingSell || !account || !detailInfo || !characterMarketContract) {
                return;
            }

            setLoadingSell(true);
            const priceInWei = ethers.utils.parseEther(price.toString());

            await sellCharacter(characterMarketContract, parseInt(detailInfo.gameItemNftId), priceInWei)
                .then((txn) => {
                    if (txn && txn.hash) {
                        let countNoti = 0;
                        const interval = setInterval(function () {
                            (async () => {
                                const res = await w3.eth.getTransactionReceipt(txn.hash);

                                if (res) {
                                    console.log(res);
                                    clearInterval(interval);
                                    if (res.status && res.blockNumber) {
                                        if (!countNoti) {
                                            showNoti('success', 'Sell Hero Successfully');
                                            countNoti++;
                                            console.log(res.logs);
                                            if (res.logs && res.logs.length == 3) {
                                                const dataLog: any = res.logs[2];

                                                if (dataLog && dataLog.topics.length == 4) {
                                                    const saleId = parseInt(dataLog.topics[1]);
                                                    const price = web3.utils.fromWei(web3.utils.toBN(dataLog.topics[3]), 'ether');
                                                    if (detailInfo) {
                                                        const payload = {
                                                            hash: txn.hash,
                                                            hostAddress: characterMarketAddress,
                                                            id: detailInfo.id,
                                                            ownerAddress: account,
                                                            price: parseFloat(price),
                                                            saleId: saleId,
                                                            quoteToken: assetMarketQuoteToken,
                                                            gameItemType : "CHARACTER"
                                                        };
                                                        MyBoxApi.sellMyAsset(payload, tokenID).finally(() => {
                                                            history.push({
                                                                pathname: '/my-assets/hero',
                                                                search: 'selling-hero'
                                                            });
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        showNoti('warning', 'Sell Asset Failed');
                                    }
                                    setIsSellVisible(false);
                                    setLoadingSell(false);
                                    window.removeEventListener('beforeunload', onUnload);
                                }
                            })();
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingSell(false);
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
            setLoadingSell(false);
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
                                                <div className="hero-img-detail">
                                                    <img src={detailInfo?.assetImage} />
                                                </div>
                                                <div className="hero-provided">
                                                    <span>Provided by</span>
                                                    <span>LegendOfGalaxy</span>
                                                </div>
                                                <div className="hero-name-detail">
                                                    {detailInfo?.name}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className="gutter-row" xs={24} xl={16} md={16} sm={16}>
                                            <div className="detail-info">
                                                <div className="box-name detail-box-name text-gold"><span>ITEM DETAIL</span></div>
                                                <p>Description</p>
                                                <div className="detail-des">
                                                    {detailInfo?.description}
                                                </div>

                                                <p className="mt-15">Amount</p>
                                                <div className="detail-des-input">
                                                    <input className="input-quantity-box" type="number" value={1} disabled={true} name="quantity" />
                                                    <img className="icon-box-detail" src={require('../../../../public/images/Marketplace/header/character.webp').default} />
                                                </div>
                                                <div className="detail-des-input mt-5">
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
                                                    {process.env.REACT_APP_ENV === 'dev' && (
                                                        <div className="btn-gold-div">

                                                            {account ? (!isApprovedGame ? (
                                                                        <Button htmlType='button' className='btn-gold'
                                                                                onClick={() => handleApproveHero(gamePlayAddress)}>Bring
                                                                            To Game: Approve</Button>)
                                                                    : (<Button htmlType='button' className='btn-gold'
                                                                               onClick={onBringToGame}>Bring To Game</Button>))
                                                                : <ConnectWallet />}


                                                            {account ? (<Button htmlType='button' className='btn-gold'
                                                                                onClick={onShowModalSellHero}>Sell</Button>)
                                                                : ''}

                                                        </div>
                                                    )}

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
                                                    <span>{detailInfo?.ownerAddress.substring(0, 5)}...{detailInfo?.ownerAddress.substring(detailInfo?.ownerAddress.length - 5)}</span>
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="history-table">

                                    </div>
                                </div>
                            </div>

                            <Modal
                                title={<div className="text-md connect-wallet-title">Sell Your Hero</div>}
                                visible={isSellVisible}
                                footer={null}
                                className="connect-wallet "
                            >

                                <div className="wallet-content-account">
                                    <div className="wallet-button">
                                        <div className="sell-form-img">
                                            <img src={detailInfo?.assetImage ? detailInfo?.assetImage : '../../../images/hero-1.png'} />
                                        </div>


                                        <Form
                                            form={sellForm}
                                            name="basic"
                                            initialValues={{ price: 0 }}
                                            labelCol={{ span: 5 }}
                                            wrapperCol={{ span: 24 }}
                                            autoComplete="off"
                                            onFinish={onSellForm}
                                            className="sell-form"
                                        >
                                            <Form.Item
                                                label={<label className="label-price">Price (GAE)</label>}
                                                name="price"
                                                rules={[
                                                    {
                                                        validator: (rule, value, cb: (msg?: string) => void) => {
                                                            !value || parseFloat(value) <= 0 ? cb('Invalid Price') : cb();
                                                        }
                                                    }
                                                ]}
                                            >
                                                <InputNumber
                                                    className="input-custom"
                                                    style={{ width: '100%' }}
                                                    placeholder="Price..."
                                                    defaultValue="0"
                                                    disabled={loadingSell || !isApprovedMarket}
                                                />
                                            </Form.Item>
                                            <Form.Item className="modal-btn-group">
                                                {!isApprovedMarket ? (
                                                        <Button className='btn-gold' type='primary' onClick={() => handleApproveHero(characterMarketAddress)}
                                                                disabled={loadingSell}>
                                                            Approve SC {loadingSell &&
                                                        <Spin className='style-loading' size='small' />}
                                                        </Button>)
                                                    : (<Button className='btn-gold' type='primary' htmlType='submit'
                                                               disabled={loadingSell}>
                                                        Confirm {loadingSell &&
                                                    <Spin className='style-loading' size='small' />}
                                                    </Button>)
                                                }
                                                <Button className="btn-gold"
                                                    type="default"
                                                    htmlType="button"
                                                    onClick={closeBox}
                                                    disabled={loadingSell}
                                                >
                                                    Close
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                        {(loadingSell) && (
                                            <div className="warning">Waiting for confirmation txn. Please DON'T reload your page.</div>
                                        )}
                                    </div>
                                </div>

                            </Modal>
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

export default MyHeroDetail
