import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Select, Modal, Form, Input, InputNumber, Button, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import { useActiveWeb3React } from 'hooks';

import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import HeaderMobile from 'components/common/menu-sidebar-top';
import { MyBoxApi } from 'config/api/myBoxApi';
import { useWrap } from 'context/WrapperContext';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';
import LoadingFull from 'components/loading-full';
import HeaderPage from 'components/common/header-page';
import { ethers } from 'ethers';

import {
    useATFContract,
    useCampaignContract, useCharacterMarketContract,
    useCharacterNFTContract,
    useGamePlayContract,
    useGemNFTContract, useGemrMarketContract
} from 'hooks/useContract';
import web3 from 'web3';
import AssetMenu from 'components/my-asset/asset-menu';
import './myitem.css';
import {
    approveCharacterNFT,
    approveGemNFT,
    depositCharacter,
    depositGem,
    getItemBalance, sellGemItem
} from '../../../my-profile/game-utils';

const { Content } = Layout;
const { Option } = Select;

declare const window: Window & typeof globalThis & { ethereum: any };

const MyItemDetail = () => {

    const atfContractAddress = process.env.REACT_APP_ATF_CONTRACT ?? '';
    const campaignContractAddress = process.env.REACT_APP_CAMPAIGN_CONTRACT ?? '';
    const envChainId = process.env.REACT_APP_CHAIN_ID;
    const gemNFTAddress = process.env.REACT_APP_GEM_NFT_CONTRACT ?? '';
    const gamePlayAddress = process.env.REACT_APP_GAME_PLAY_CONTRACT ?? '';
    const gemMarketAddress = process.env.REACT_APP_GEM_NFT_MARKET_CONTRACT ?? '';

    const gemMarketContract = useGemrMarketContract(gemMarketAddress);
    const gemMarketQuoteToken = process.env.REACT_APP_GEM_MARKET_TOKEN_KEY ?? 1;


    const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';

    const atfContract = useATFContract(atfContractAddress);
    const gemNFTContract = useGemNFTContract(gemNFTAddress);
    const gamePlayContract = useGamePlayContract(gamePlayAddress);

    const [quantityBringToGame, setQuantityBringToGame] = useState(1);
    let { id }: { id: string } = useParams();
    let history = useHistory();
    const typePage = history.location.search.replace('?', '');
    const [loadingDetail, setLoadingDetail] = useState(false);
    const { showNoti, tokenID } = useWrap();
    const { chainId, account } = useActiveWeb3React();
    const [detailInfo, setDetailInfo] = useState<IItemDetail>();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isSellVisible, setIsSellVisible] = useState<boolean>(false);
    const [loadingSell, setLoadingSell] = useState(false);
    const [sellForm] = Form.useForm();
    const [priceBox, setPriceBox] = useState(0);
    const [isApprovedGame, setIsApprovedGame] = useState<boolean>(false);
    const [isApprovedMarket, setIsApprovedMarket] = useState<boolean>(false);
    const [gemItemQty, setGemItemQty] = useState(0);




    const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);



    const onChangeQuantity = (e: any) => {
        setQuantityBringToGame(parseInt(e.target.value));
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
                setPriceBox(parseFloat(res.data.boxPrice))
            }
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setLoadingDetail(false);
        }
    };
    const getApproveMarket = async () => {
        if (gemNFTContract) {
            const isApprovedForMarket = await gemNFTContract.isApprovedForAll(account, gemMarketAddress);
            setIsApprovedMarket(isApprovedForMarket);
        }
    }

    useEffect(() => {
        if(account) {
            getDataDetail();
            getApproveMarket();
        }
    }, [account]);

    const getApproveGamePlay = async () => {
        if (gemNFTContract) {
            const isApprovedForGame = await gemNFTContract.isApprovedForAll(account, gamePlayAddress);
            setIsApprovedGame(isApprovedForGame);
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

    const onUnload = (event) => {
        event.preventDefault();
        return (event.returnValue = 'Are you sure you want to exit?');
    };

    const onBringToGame = async () => {
        try {
            if (chainId != envChainId) {
                showNoti('warning', 'Wrong Network!');
                return;
            }

            if (quantityBringToGame <= 0) {
                showNoti('warning', 'Invalid Amount!');
                return;
            }
            window.addEventListener('beforeunload', onUnload);
            setLoading(true);
            const nftId = 1000;
            await depositGem(gamePlayContract, nftId, 1, gemNFTAddress)
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
                                            setQuantityBringToGame(0);
                                            // const payload = {
                                            //     moveNftHash: res.transactionHash,
                                            //     ownerAddress: account,
                                            //     nftId: item.nftId.toString(),
                                            //     id: item.id
                                            // };
                                            // ProfileApi.nftToGame(payload, item.id, tokenID).finally(() => {
                                            //     history.push({
                                            //         pathname: '/profile/my-asset',
                                            //         search: 'asset-in-game'
                                            //     });
                                            // });
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

    const handleApproveItem = async (address) => {
        try {
            if (chainId != envChainId) {
                showNoti('warning', 'Wrong Network!');
                return;
            }


            setLoading(true);

            await approveGemNFT(gemNFTContract, address)
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
                                            showNoti('success', 'Approve Item Successfully');
                                            countNoti++;
                                            if (address == gamePlayAddress) {
                                                setIsApprovedGame(true);
                                            }
                                            if (address == gemMarketAddress) {
                                                setIsApprovedMarket(true);
                                            }

                                        }
                                    } else {
                                        showNoti('warning', 'Approve Item Failed');
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

    const handleSellGemItem = async (price, quantity) => {
        if (chainId != envChainId) {
            showNoti('warning', 'Wrong Network!');
            return;
        }
        window.addEventListener('beforeunload', onUnload);
        try {
            if (loadingSell || !account || !detailInfo) {
                return;
            }
            setLoadingSell(true);

            const priceInWei = ethers.utils.parseEther(price.toString());

            await sellGemItem(gemMarketContract, detailInfo.gameItemNftId, quantity, priceInWei)
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
                                            const dataLog: any = res.logs[1];
                                            if (dataLog && dataLog.topics.length == 4) {
                                                const saleId = parseInt(dataLog.topics[1]);
                                                const price = web3.utils.fromWei(web3.utils.toBN(dataLog.topics[2]), 'ether');
                                                const quantity = parseInt(dataLog.topics[3]);
                                                setGemItemQty(gemItemQty - quantity);

                                                if (detailInfo) {
                                                    const payload = {
                                                        hash: txn.hash,
                                                        hostAddress: gemMarketAddress,
                                                        id: detailInfo.id,
                                                        ownerAddress: account,
                                                        price: parseFloat(price),
                                                        saleId: saleId,
                                                        quoteToken: gemMarketQuoteToken,
                                                        gameItemType : "ITEM"
                                                    };
                                                    MyBoxApi.sellMyAsset(payload, tokenID).finally(() => {
                                                        history.push({
                                                            pathname: '/my-assets/item',
                                                            search: 'selling-item'
                                                        });
                                                    });
                                                }
                                            }
                                            showNoti('success', 'Sell Box Successfully');
                                            countNoti++;
                                        }
                                    } else {
                                        showNoti('warning', 'Sell Box Failed');
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
            window.removeEventListener('beforeunload', onUnload);
            setLoadingSell(false);
        }
    };

    const closeBox = () => {
        setIsSellVisible(false);
        sellForm.resetFields();
    };
    const onShowModalSellHero = async () => {
        if (account && detailInfo && gemNFTContract) {
        const boxQty = await getItemBalance(gemNFTContract, account, detailInfo.gameItemNftId);
        setGemItemQty(parseInt(boxQty));
        console.log(parseInt(boxQty));
        sellForm.resetFields();
        setIsSellVisible(true);
    }

        sellForm.resetFields();
        setIsSellVisible(true);
    }
    const onSellForm = (values: any) => {
        handleSellGemItem(values.price, values.quantity);
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
                                <div className="back"><Link to="/my-assets/item"><ArrowLeftOutlined /> Back </Link></div>
                                <div className="detail-block">
                                    <div className='detail-box-content'>
                                        <div className="detail-left">
                                            <div className="hero-image-detail">
                                                <div className="hero-nft-id">{detailInfo?.gameItemNftId}</div>
                                                <div className="hero-img-detail stun-image-detail-cus">
                                                    <img src={require('../../../../public/images/Marketplace/stun/stone.png').default} />
                                                </div>
                                                <div className="hero-provided item-cus">
                                                    <span>Provided by</span>
                                                    <span>LegendOfGalaxy</span>
                                                </div>
                                                <div className="hero-name-detail name-cus-item">
                                                    {detailInfo?.name ? detailInfo?.name : 'TBA'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="detail-right">
                                            <div className="detail-info">
                                                <div className="box-name detail-box-name text-gold"><span>ITEM DETAIL</span></div>
                                                <p>Description</p>
                                                <div className="detail-des">
                                                    {detailInfo?.description}
                                                </div>

                                                <p className="mt-15">Amount</p>
                                                <div className="detail-des-input">
                                                    <input className="input-quantity-box" type="number" value={quantityBringToGame} onChange={(e) => onChangeQuantity(e)} name="quantity" disabled={!account} />
                                                    <img className="icon-box-detail" src={require('../../../../public/images/Marketplace/header/stun-lv5.webp').default} />
                                                </div>
                                                <div className="detail-des-input mt-5">
                                                    {
                                                        priceBox && priceBox !== 0 ? (
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
                                                        ) : (
                                                            <div className="tba">TBA</div>
                                                        )
                                                    }
                                                    <div className="btn-gold-div">
                                                        {/* <Select className="hero-select" defaultValue="join" style={{ width: 150 }} onChange={onChangeSelect}>
                                                        <Option value="join">Join</Option>
                                                    </Select> */}


                                                        {account ? (!isApprovedGame ? (<Button htmlType="button" className="btn-gold" onClick={() => handleApproveItem(gamePlayAddress)} >Approve Item</Button>)
                                                            : (<Button htmlType="button" className="btn-gold" onClick={onBringToGame} disabled={quantityBringToGame <= 0}>Bring To Game</Button>))
                                                            : <ConnectWallet />}

                                                        {account ? ((<Button htmlType="button" className="btn-gold" onClick={onShowModalSellHero} >Sell</Button>)) : ''}

                                                    </div>
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
                                                    <p>a1234...515f61</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="history-table">

                                    </div>
                                </div>
                            </div>
                            <Modal
                                title={<div className="text-md connect-wallet-title">Sell Your Item</div>}
                                visible={isSellVisible}
                                footer={null}
                                className="connect-wallet "
                            >

                                <div className="wallet-content-account">
                                    <div className="wallet-button">
                                        <div className="sell-form-img">
                                            <img src={detailInfo?.assetImage ? detailInfo?.assetImage : require('../../../../public/images/Marketplace/stun/stone.png').default} />
                                        </div>


                                        <Form
                                            form={sellForm}
                                            name="basic"
                                            initialValues={{ price: 0, quantity: 0 }}
                                            labelCol={{ span: 5 }}
                                            wrapperCol={{ span: 24 }}
                                            autoComplete="off"
                                            onFinish={onSellForm}
                                            className="sell-form"
                                        >
                                            <Form.Item
                                                label={<label className="label-price">Quantity</label>}
                                                name="quantity"
                                                rules={[
                                                    {
                                                        validator: (rule, value, cb: (msg?: string) => void) => {
                                                            !value || parseFloat(value) > gemItemQty ? cb('Invalid Quantity') : cb();
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
                                                {
                                                    !isApprovedMarket ? (<Button className="btn-gold" type="primary" onClick={() =>{handleApproveItem(gemMarketAddress)}} disabled={loadingSell}>
                                                        Approve SC {loadingSell && <Spin className="style-loading" size="small" />}
                                                    </Button>) :
                                                        (<Button className="btn-gold" type="primary" htmlType="submit" disabled={loadingSell}>
                                                            Confirm {loadingSell && <Spin className="style-loading" size="small" />}
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

export default MyItemDetail
