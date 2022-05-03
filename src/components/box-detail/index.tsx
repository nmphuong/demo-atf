import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BrowserRouter as Router,Link,useParams, useHistory } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import { useActiveWeb3React } from 'hooks';



import ConnectWallet from 'components/connect-wallet/ConnectWallet';
import HeaderMobile from 'components/common/menu-sidebar-top';
import { MyBoxApi } from '../../config/api/myBoxApi';
import { useWrap } from '../../context/WrapperContext';
import './detail.css';
import LoadingFull from 'components/loading-full';
import HeaderPage from 'components/common/header-page';
import { buyComboBox, buyMysteryBox, getCampaignBoxInfo, getComboBoxInfo } from '../../utils/utils';
import { useCampaignContract, useGAEContract } from '../../hooks/useContract';
import web3 from 'web3';
import AssetMenu from 'components/my-asset/asset-menu';
import { approveGAE } from '../my-profile/game-utils';

const { Content } = Layout;
declare const window: Window & typeof globalThis & { ethereum: any };

const BoxDetail = () => {
    let referalCode = window.localStorage.getItem('refCode');
    const campaignContractAddress = process.env.REACT_APP_CAMPAIGN_CONTRACT ?? '';
    const envChainId = process.env.REACT_APP_CHAIN_ID;
    const gaeTokenAddress = process.env.REACT_APP_GAE_CONTRACT ?? '';
    const gaeTokenContract = useGAEContract(gaeTokenAddress);



    const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';

    const campaignContract = useCampaignContract(campaignContractAddress);

    const [quantityBuy, setQuantityBuy] = useState(0);
    let { id }: { id: string } = useParams();
    let history = useHistory();
    const typePage = history.location.search.replace('?', '');
    const [loadingDetail, setLoadingDetail] = useState(false);
    const { showNoti, tokenID } = useWrap();
    const { chainId, account } = useActiveWeb3React();
    const [boxInfo, setBoxInfo] = useState<IListItemProfile>();
    const [total, setTotal] = useState(0);
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [signature, setSignature] = useState('');
    const [loading, setLoading] = useState(false);

    const [totalBox, setTotalBox] = useState(0);
    const [quantityBox, setQuantityBox] = useState(0);
    const [priceBox, setPriceBox] = useState(0);
    const [quoteKey, setQuoteKey] = useState(0);

    const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);

    const onChangeQuantity = (e: any) => {
        if (parseInt(e.target.value) <= 0) {
            setQuantityBuy(0);
            setTotal(0)
        } else {
            setQuantityBuy(parseInt(e.target.value));
            setTotal(parseInt(e.target.value) * boxInfo?.boxPrice || 0)
        }
    }

    const getBox = async () => {
        setLoadingDetail(true);

        let res: any = null;
        try {
            res = await MyBoxApi.getBoxDetailClient(id, account, referalCode);
            if (res.status === 200) {
                setBoxInfo(res.data);
                setTotalBox(parseInt(res.data.quantity))
                setPriceBox(parseFloat(res.data.boxPrice))
                setSignature(res.data.signature)
                if (account) {
                    if (account) {
                        console.log(res.data.boxType.includes('COMBO'));
                        if (res.data.boxType.includes('COMBO')){
                            await getComboInfoFromSC(campaignContract, COMBO_IDS[res.data.boxType]);
                        } else {
                            await getCampaignInfoFromSC(campaignContract, res.data.boxNftId);
                        }

                    }
                }
            }
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setLoadingDetail(false);
        }
    };

    const getCampaignInfoFromSC = async (campaignSC, boxNftId) => {
        try {
            const campaignInfo = await getCampaignBoxInfo(campaignSC, boxNftId);
            setQuantityBox(parseInt(campaignInfo.mysteryBoxQuantity))
            setTotalBox(parseInt(campaignInfo.mysteryBoxTotal))
            setPriceBox(parseFloat(web3.utils.fromWei(web3.utils.toBN(campaignInfo.mysteryBoxPrice), 'ether')))
            setQuoteKey(parseInt(campaignInfo.quoteTokenKey))
        } catch (e) {
            console.log(e);
        }
    }


    const getComboInfoFromSC = async (campaignSC, comboId) => {
        try {
            const comboInfo = await getComboBoxInfo(campaignSC, comboId);
            console.log(parseInt(comboInfo.quantity));
            console.log(parseInt(comboInfo.total));
            console.log(parseFloat(web3.utils.fromWei(web3.utils.toBN(comboInfo.price), 'ether')));
            console.log(parseInt(comboInfo.quoteTokenKey));
            setQuantityBox(parseInt(comboInfo.quantity))
            setTotalBox(parseInt(comboInfo.total))
            setPriceBox(parseFloat(web3.utils.fromWei(web3.utils.toBN(comboInfo.price), 'ether')))
            setQuoteKey(parseInt(comboInfo.quoteTokenKey))
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getBox();
    }, [account]);


    useEffect(() => {
        if (account) {
            if (gaeTokenContract) {
                gaeTokenContract.allowance(account, campaignContractAddress).then((res) => {
                    setIsApproved(parseInt(res) > 0);
                });
            }
        }
    }, [account]);

    const onUnload = (event) => {
        event.preventDefault();
        return (event.returnValue = 'Are you sure you want to exit?');
    };

    const COMBO_IDS = {
        'COMBO_SILVER': 1,
        'COMBO_GOLD': 2,
        'COMBO_PLAINUM': 3,
        'COMBO_DIAMOND': 4,
        'COMBO_LEGEND': 5
    };

    const handleBuyBox = async () => {
        try {

            if (chainId != envChainId) {
                showNoti('warning', 'Wrong Network!');
                return;
            }
            if (!account || !boxInfo || !boxInfo.boxNftId || !campaignContract) {
                return;
            }
            if (quantityBuy <= 0) {
                showNoti('warning', 'Invalid Amount!');
                return;
            }

            setLoading(true);
            window.addEventListener('beforeunload', onUnload);
            let boxPrice = parseInt(web3.utils.toWei(`${priceBox}`, 'ether'));
            await buyMysteryBox(
                campaignContract,
                parseInt(boxInfo.boxNftId),
                quantityBuy,
                signature,
                boxPrice,
                quoteKey
            )
                .then((txn) => {
                    console.log(txn);
                    if (txn && txn.hash) {
                        let countNoti = 0;
                        const interval = setInterval(function () {
                            (async () => {
                                const res = await w3.eth.getTransactionReceipt(txn.hash);
                                if (res) {
                                    clearInterval(interval);
                                    if (res.status && res.blockNumber) {
                                        if (!countNoti) {
                                            showNoti('success', 'Buy Box Successfully');
                                            countNoti++;

                                            const data = {
                                            	boxId: boxInfo.id,
                                            	buyerAddress: account,
                                            	hash: txn.hash,
                                                price: priceBox,
                                            	quantity: quantityBuy,
                                                referalCode : referalCode

                                            };
                                            // /my-assets/box?box

                                            await MyBoxApi.buyBox(data, tokenID).finally(()=>{
                                                window.removeEventListener('beforeunload', onUnload);
                                                history.push('/my-assets/box?box');
                                            });


                                        }
                                    } else {
                                        showNoti('error', 'Buy Box Failed');
                                    }
                                    setLoading(false);
                                    window.removeEventListener('beforeunload', onUnload);
                                }
                            })();
                        }, 1000);
                    }
                })
                .catch((error) => {
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
            setLoading(false);
            console.log(error);
            window.removeEventListener('beforeunload', onUnload);
        }
    };


    const handleBuyComboBox = async () => {
        try {

            if (chainId != envChainId) {
                showNoti('warning', 'Wrong Network!');
                return;
            }
            if (!account || !boxInfo || !boxInfo.boxType || !campaignContract) {
                return;
            }
            if (quantityBuy <= 0) {
                showNoti('warning', 'Invalid Amount!');
                return;
            }

            setLoading(true);
            window.addEventListener('beforeunload', onUnload);
            let boxPrice = parseInt(web3.utils.toWei(`${priceBox}`, 'ether'));
            await buyComboBox(
                campaignContract,
                COMBO_IDS[boxInfo.boxType],
                quantityBuy,
                boxPrice,
                quoteKey
            )
                .then((txn) => {
                    console.log(txn);
                    if (txn && txn.hash) {
                        let countNoti = 0;
                        const interval = setInterval(function () {
                            (async () => {
                                const res = await w3.eth.getTransactionReceipt(txn.hash);
                                if (res) {
                                    clearInterval(interval);
                                    if (res.status && res.blockNumber) {
                                        if (!countNoti) {
                                            showNoti('success', 'Buy Box Successfully');
                                            countNoti++;

                                            const data = {
                                                boxId: boxInfo.id,
                                                buyerAddress: account,
                                                hash: txn.hash,
                                                price: priceBox,
                                                quantity: quantityBuy,
                                                referalCode : referalCode

                                            };
                                            // /my-assets/box?box

                                            await MyBoxApi.buyBox(data, tokenID).finally(()=>{
                                                window.removeEventListener('beforeunload', onUnload);
                                                history.push('/my-assets/box?box');
                                            });


                                        }
                                    } else {
                                        showNoti('error', 'Buy Box Failed');
                                    }
                                    setLoading(false);
                                    window.removeEventListener('beforeunload', onUnload);
                                }
                            })();
                        }, 1000);
                    }
                })
                .catch((error) => {
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
            setLoading(false);
            console.log(error);
            window.removeEventListener('beforeunload', onUnload);
        }
    };

    const handleApprove = async () => {
        try {
            if (chainId != envChainId) {
                showNoti('warning', 'Wrong Network!');
                return;
            }
            setLoading(true);

            await approveGAE(gaeTokenContract, campaignContractAddress)
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
                                            showNoti('success', 'Approve ERC20 Successfully');
                                            countNoti++;
                                            setIsApproved(true);
                                        }
                                    } else {
                                        showNoti('error', 'Approve ERC20 Failed');
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
            // if (error.data) {
            //     showNoti('error', error.data.message);
            // }
        }
    };


    const onBuyBox = async () => {
        console.log(account);
        console.log('boxInfo', boxInfo);
        setLoadingDetail(true);
        // const campaignInfo = await getCampaignInfo(campaignContract, 1);
        // console.log(campaignInfo);

        setLoadingDetail(false);
    }

    let typeTitle = "text-wool";
    let typeBg = "bg-detail-wool";
    if (boxInfo) {
        if (boxInfo.boxType == "CONQUEROR") {
            typeBg = 'bg-detail-gold';
            typeTitle = 'text-gold';
        } else if (boxInfo.boxType == "EXPLORER") {
            typeBg = 'bg-detail-silver';
            typeTitle = 'text-silver';
        } else if (boxInfo.boxType == "SPECIAL") {
            typeBg = 'bg-silver';
            typeTitle = 'text-silver';
        }
    }
    let classBg = 'detail-img ' + typeBg;
    let classTitle = 'box-name detail-box-name ' + typeTitle;

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
                            <div className="back"><Link to="/mystery-box"><ArrowLeftOutlined /> Back </Link></div>
                            <div className="detail-block">
                            <div className='detail-box-content'>
                                    <div className="detail-left">
                                        <div className={classBg}>
                                            <div className="box-total-text mt-20 box-total-text-msb">Total box available</div>
                                            <div className="box-total-quantity mb-20">{quantityBox ? quantityBox : boxInfo?.quantity}</div>
                                            <div className="img-box-detail-msb">
                                                <img className="animation-css-scale" src={boxInfo?.boxImage} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="detail-right">
                                        <div className="detail-info">
                                            <div className={classTitle}><span>{boxInfo?.boxName}</span></div>
                                            <p>Description</p>
                                            <div className="detail-des">
                                                {boxInfo?.description}
                                            </div>


                                            {boxInfo?.openRates.length > 0 &&
                                            (   <>
                                                <p>Rewards</p>
                                                <div className="detail-des">
                                                <ul className='item-detail'>
                                                    <li className='item-lv'>
                                                        <div className="icon-item">
                                                            <img src={require(`../../public/images/Marketplace/level/lv-b.png`).default} />
                                                        </div>
                                                        <span>{(Number(boxInfo?.openRates.filter((item) => item.unboxItem === 'WHITE_CHARACTER')[0].percentage) * 100).toFixed(2)}%</span>
                                                    </li>
                                                    <li className='item-lv'>
                                                        <div className="icon-item">
                                                            <img src={require(`../../public/images/Marketplace/level/lv-a.png`).default} />
                                                        </div>
                                                        <span>{(Number(boxInfo?.openRates.filter((item) => item.unboxItem === 'GREEN_CHARACTER')[0].percentage) * 100).toFixed(2)}%</span>
                                                    </li>
                                                    <li className='item-lv'>
                                                        <div className="icon-item">
                                                            <img src={require(`../../public/images/Marketplace/level/lv-s.png`).default} />
                                                        </div>
                                                        <span>{(Number(boxInfo?.openRates.filter((item) => item.unboxItem === 'BLUE_CHARACTER')[0].percentage) * 100).toFixed(2)}%</span>
                                                    </li>
                                                    <li className='item-lv'>
                                                        <div className="icon-item">
                                                            <img src={require(`../../public/images/Marketplace/level/lv-ss.png`).default} />
                                                        </div>
                                                        <span>{(Number(boxInfo?.openRates.filter((item) => item.unboxItem === 'PURPLE_CHARACTER')[0].percentage) * 100).toFixed(2)}%</span>
                                                    </li>
                                                    <li className='item-lv'>
                                                        <div className="icon-item">
                                                            <img src={require(`../../public/images/Marketplace/level/lv-ssr.png`).default} />
                                                        </div>
                                                        <span>{(Number(boxInfo?.openRates.filter((item) => item.unboxItem === 'YELLOW_CHARACTER')[0].percentage) * 100).toFixed(2)}%</span>
                                                    </li>
                                                    <li className='item-lv'>
                                                        <div className="icon-item">
                                                            <img className='w-37' src={require(`../../public/images/Marketplace/logo/gae-token.png`).default} />
                                                        </div>
                                                        <span>{(Number(boxInfo?.openRates.filter((item) => item.unboxItem === 'TOKEN')[0].percentage) * 100).toFixed(2)}%</span>
                                                    </li>
                                                    <li className='item-lv'>
                                                        <div className="icon-item">
                                                            <img className='w-37' src={require(`../../public/images/Marketplace/logo/token-ingame.png`).default} />
                                                        </div>
                                                        <span>{(Number(boxInfo?.openRates.filter((item) => item.unboxItem === 'MONEY')[0].percentage) * 100).toFixed(2)}%</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            </>)}

                                        </div>
                                        <div className="detail-info">
                                            <p className="detail-box-name">Amount</p>
                                            <div className="detail-des-input">
                                                <input className="input-quantity-box" type="number" value={quantityBuy} onChange={(e) => onChangeQuantity(e)} name="quantity" disabled={!account} />
                                                <img className="icon-box-detail icon-box-detail-input" src={require('../../public/images/Marketplace/header/icon-box-gold.webp').default} />
                                            </div>
                                            <div className="detail-des-input">
                                                <div className='price-box-msb-cus'>
                                                    <div className="__price-box-msb">
                                                        <div className="detail-box-name">
                                                            <span className="detail-box-info-pr">Price</span> : <div className="price-info"><img className='price-box-msb' src={require('../../public/images/Marketplace/header/gae-token.webp').default} /> {priceBox}</div>
                                                        </div>
                                                    </div>
                                                    <div className="__price-box-msb">
                                                        <div className="detail-box-name text-right">
                                                            <span className="detail-box-info-pr">Total</span> : <div className="price-info"><img className='price-box-msb' src={require('../../public/images/Marketplace/header/gae-token.webp').default} /> {total}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="btn-gold-div">
                                                    {account ? (!isApproved && quoteKey != 0 ? (<Button htmlType="button" className="btn-gold" onClick={handleApprove} >Approve GAE</Button>)
                                                        : (<Button htmlType="button" className="btn-gold" onClick={boxInfo?.boxType.includes('COMBO') ? handleBuyComboBox :handleBuyBox} >Buy</Button>))
                                                        : <ConnectWallet />}

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

            {loadingDetail || loading && (
                <LoadingFull />
            )}
        </Content>
</>
    );
}

export default BoxDetail
