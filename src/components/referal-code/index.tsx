import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Layout, Row, Col } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch, useLocation } from 'react-router-dom';
import MenuSidebar from 'components/common/menu-sidebar';
import './ref.css';
import HeaderMobile from 'components/common/menu-sidebar-top';
import HeaderPage from 'components/common/header-page';
import FooterIndex from 'components/Footer';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useActiveWeb3React } from 'hooks';
import { useWrap } from 'context/WrapperContext';
import { RefCodeApi } from '../../config/api/refCodeApi';

const { Content } = Layout;
const ReferalCode = () => {

	const { account } = useActiveWeb3React();
	const [myRefCode, setMyRefCode] = useState([]);
	const { showNoti, tokenID } = useWrap();


	useEffect(() => {
		if (account && tokenID) {
			getMyRefCode(account, tokenID);
		}
	}, [account, tokenID]);

	const getMyRefCode = (account: any, tokenID: any) => {
		RefCodeApi.getMyRefCode(account, tokenID).then((res) => {
			if (res.status === 200) {
				if (res.data && res.data.referalCode.length > 0) {
					setMyRefCode(res.data.referalCode);
				}
			}
		});
	};
	let port: any = '';
	if (window.location.hostname == 'localhost') {
		port = ':3000';
	}
	let refLink: any = '';
	if (myRefCode.length > 0) {
		refLink = `${window.location.protocol}//` + `${window.location.hostname}` + `${port}?refCode=${myRefCode ? myRefCode : ''}`;
	}
	const onCopy = () => {
		showNoti('success', 'Copied');
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
							<div className="ref-content">
								<h3>Your References</h3>
								<div className="ref-block">
									<p>
										{refLink.length > 0 ? (
											<>
												<span>{refLink}</span>
												<CopyToClipboard onCopy={onCopy} text={refLink}>
													<CopyOutlined />
												</CopyToClipboard>
											</>
										) : (
											<>No referal code</>
										)}

									</p>
								</div>
							</div>
						</div>
					</div>
				</Row>
				<FooterIndex />
			</Content>
		</>
	);
}

export default ReferalCode
