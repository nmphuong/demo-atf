
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Row, Col, Pagination, Modal, Form, Popover, Button, Spin, Tooltip } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';
import '../style.css';
import { isMobile } from 'react-device-detect';
import { useActiveWeb3React, useConnectWallet } from 'hooks';
import web3 from 'web3';
import { MyBoxApi } from '../../../config/api/myBoxApi';
import NoneImg from '../../../public/images/none-img.png';
import { useWrap } from 'context/WrapperContext';

import MenuSidebar from 'components/common/menu-sidebar';
import HeaderMobile from 'components/common/menu-sidebar-top';
import HeaderPage from 'components/common/header-page';
import FooterIndex from 'components/Footer';
import { useOpenBoxContract } from '../../../hooks/useContract';
import { claimReceipt, openBox } from '../../../utils/utils';
import AssetMenu from 'components/my-asset/asset-menu';
const { Header, Content } = Layout;

interface Col {
    classDefault: string;
}

declare const window: Window & typeof globalThis & { ethereum: any };

const ClaimBox = () => {
    const history = useHistory();
    const typeProfile = history.location.search.replace('?', '');

    const fixedListFilter = [
        {
            name: 'LAND',
            icon: 'filter-dot-a'
        },
        {
            name: 'PET',
            icon: 'filter-dot-b'
        },
        {
            name: 'WEAPON',
            icon: 'filter-dot-c'
        }
    ];




    const provider = process.env.REACT_APP_BSC_NETWORK_URL ?? '';
    const envChainId = process.env.REACT_APP_CHAIN_ID;

    const boxContractAddress = process.env.REACT_APP_BOX_CONTRACT ?? '';

    const openBoxContractAddress = process.env.REACT_APP_OPEN_BOX_CONTRACT ?? '';




    const openBoxContract = useOpenBoxContract(openBoxContractAddress);

    const [loading, setLoading] = useState(false);

    const w3 = window.ethereum ? new web3(window.ethereum) : new web3(provider);
    const { chainId, account, library } = useActiveWeb3React();
    const [dataProfile, setDataProfile] = useState<any>([]);
    const [classTab, setClassTabs] = useState('');

    const [listFilter, setListFitler] = useState(() => {
        let arr: string[] = [];
        fixedListFilter.forEach((item) => {
            arr.push(item.name);
        });
        return arr;
    });

    const [totalRow, setTotalRow] = useState(0);
    const paramReset = {
        // itemTypeEnumList: listFilter,
        ownerAddress: account,
        statusList: ['OWNER'],
        page: 0,
        size: 10
    };
    const [param, setParam] = useState(paramReset);

    const onChange_Pagi = (pageNumber) => {
        setParam({
            ...param,
            page: pageNumber - 1
        });
    };



    const { showNoti, tokenID } = useWrap();

    const col: Col = {
        classDefault: ''
    };
    const wS = window.screen.width;
    if (!isMobile) {
        if (wS > 1400) {
            col.classDefault = 'col-20';
        }
    }

    const displayTabs = (action: string) => {
        history.push({
            pathname: '',
            search: action
        });
    };

    // GROUP ELEMENT
    const groupElement = (boxes, balanceMap) => {
        // handle group object
        const objArr = boxes.reduce(function (results, org) {
            (results[org.boxNftId] = results[org.boxNftId] || []).push(org);
            return results;
        }, []);

        // handle group array
        let groupArr: any = [];
        objArr.forEach((item, index) => {
            if (balanceMap[item[0].boxNftId] > 0) {
                item[0].quantity = balanceMap[item[0].boxNftId];
                groupArr.push(item[0]);
            }
        });

        return groupArr;
    };

    // GET DATA BOX
    const getDataBox = async (type) => {
        setLoading(true);

        const dataFilter = {
            ownerAddress: account,
            statusList: [type]
        };

        try {
            let res = await MyBoxApi.getDataBoxClaim(dataFilter, tokenID);
            setTotalRow(parseInt(res.headers['x-total-count']));
            if (res.status === 200) {
                if (res.data && res.data.length > 0) {
                    // Check cancel balance
                    if (type === 'SELLING') {
                        // const saleIds = res.data.map((e) => parseInt(e.sellId));

                        // const sellingBoxBalance = await getSellBoxListInfo(boxMarketContract, saleIds);

                        // let listSellingBox: any = [];
                        // res.data.forEach((item, index) => {
                        //     if (parseInt(sellingBoxBalance[index].status) === 1) {
                        //         listSellingBox.push({
                        //             ...item,
                        //             quantity: parseInt(sellingBoxBalance[index].quantity),
                        //             numSold: parseInt(sellingBoxBalance[index].numSold),
                        //             total: parseInt(sellingBoxBalance[index].quantity) + parseInt(sellingBoxBalance[index].numSold),
                        //             status: parseInt(sellingBoxBalance[index].status),
                        //             quoteToken: parseInt(sellingBoxBalance[index].quoteTokenKey),
                        //             sellingPrice: web3.utils.fromWei(sellingBoxBalance[index].price.toString(), 'ether')
                        //         });
                        //     }
                        // });

                        // setDataProfile(listSellingBox);
                    } else {
                        const boxIds = res.data.map((e) => parseInt(e.boxNftId));

                        const accounts = Array.from({ length: boxIds.length }).fill(account);

                        // const boxBalance = await getBoxBalanceOfBatch(boxContract, accounts, boxIds);

                        const balanceMap = boxIds.reduce(function (result, field, index) {
                            // result[field] = parseInt(boxBalance[index]);
                            result[field] = 123;
                            return result;
                        }, {});
                        var groupBox = groupElement(res.data, balanceMap);

                        setDataProfile(groupBox);
                    }
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

    const getKeyFilter = (key) => {
        if (listFilter.includes(key)) {
            let index = listFilter.indexOf(key);
            listFilter.length > 1 && listFilter.splice(index, 1);
        } else {
            listFilter.push(key);
        }
        setListFitler([...listFilter]);
    };

    const handleClear = () => {
        const arrFilter = fixedListFilter.map((item) => item.name);
        setListFitler(arrFilter);
    };

    useEffect(() => {
        if (account && classTab) {
            switch (classTab) {
                case 'box':
                    getDataBox('OWNER');
                    break;
                case 'selling-box':
                    getDataBox('SELLING');
                    break;
                default:
                    break;
            }
        }
    }, [account, classTab, listFilter]);

    useEffect(() => {
        if (typeProfile) {
            setClassTabs(typeProfile);
        } else {
            setClassTabs('box');
        }
    }, [typeProfile]);

    const onUnload = (event) => {
        event.preventDefault();
        return (event.returnValue = 'Are you sure you want to exit?');
    };

    const handleClaim = async () => {

        try {

            if (chainId != envChainId) {
                showNoti('warning', 'Wrong Network!');
                return;
            }
            if (!account || !openBoxContract) {
                return;
            }

            setLoading(true);
            window.addEventListener('beforeunload', onUnload);

            const receiptId = 1000000;

            await claimReceipt(
                receiptId
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
                                            showNoti('success', 'Claim Successfully');
                                            countNoti++;
                                            //todo: call api
                                            // const data = {
                                            // 	boxId: id,
                                            // 	buyerAddress: account,
                                            // 	hash: result.hash,
                                            // 	totalPrice: parseFloat(web3.utils.fromWei(web3.utils.toBN(price), 'ether')),
                                            // 	quantity: quantity
                                            // };
                                            ///my-assets/box?box

                                            // const res = await ProfileApi.buyBox(data);
                                            // if (res.status == 201) {
                                            // 	return { id: res.data.myBox.id, hash: result.hash };
                                            // }

                                        }
                                    } else {
                                        showNoti('error', 'Claim Failed');
                                    }
                                    setLoading(false);
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


    const BoxClaimContent = () => {

        return (
            <>
                <Row gutter={30}>
                    {dataProfile?.length > 0 ? (
                        dataProfile.map((item, index) => (
                            <Col className={col.classDefault} xs={24} sm={12} xl={6} key={index}>
                                <div className="asset-item">
                                    <div className="asset-id">#{item.boxNftId}</div>
                                    <div className="asset-image"><img src={item.boxImage == null || item.boxImage == '' ? NoneImg : item.boxImage} /></div>
                                    <div className="asset-provided">
                                        <span>Provided by</span>
                                        <span>LegendOfGalaxy</span>
                                    </div>
                                    <div className="asset-name">
                                        <span>{item.boxName}</span>
                                        <span><Link to={`/my-assets/box/detail/${item.myBoxId}?profile`}>Claim</Link></span>
                                    </div>
                                </div>
                            </Col>


                        ))
                    ) : (
                        <>
                            {/* <NoneData text="No Data" /> */}

                            {/* <div className='row-box'>
                                <div className="asset-item">
                                    <div className="asset-id">#123</div>
                                    <div className="asset-image"><img src="../images/silver_box.png" /></div>
                                    <div className="asset-provided">
                                        <span>Provided by</span>
                                        <span>LegendOfGalaxy</span>
                                    </div>
                                    <div className="asset-name">
                                        <span className="title-card-claim">GOLD BOX</span>
                                        <span><Button htmlType="button" className="btn-gold-claim">Claim</Button></span>
                                    </div>
                                </div>
                            </div> */}
                            <div className='lst-item'>
                                {[{}, {}, {}, {}, {}, {}].map((it, index) => (
                                    <div className="_item-list-item">
                                        <div className="asset-item">
                                            <div className="asset-id">#123</div>
                                            <div className="asset-quantity">x1</div>
                                            <div className="asset-image-item">
                                                <img src={require('../../../public/images/Marketplace/box/Explorer-Box.png').default} />
                                                <div className="mk-box-name">
                                                    <span>Provided by</span>
                                                    <span className='provider'>LegendOfGalaxy</span>
                                                </div>
                                            </div>
                                            <div className="asset-name">
                                                <div className="btn-action">
                                                    <div className="gr-action-claim">
                                                        <div className="mk-box-name">TBA</div>
                                                        <button className="btn-gold-claim font-normal">
                                                            <span>Claim</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </Row>
            </>
        );
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
                            <AssetMenu />
                            <div className="claim-box-title">
                                Claim Your Box
                            </div>
                            <div className="asset-block">
                                <div className="asset-grid">
                                    <BoxClaimContent />
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
                        </div>
                    </div>
                </Row>
                <FooterIndex />
            </Content>
        </>
    );
};

export default ClaimBox;
