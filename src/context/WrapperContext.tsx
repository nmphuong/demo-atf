import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { AuthApi } from '../config/api/authApi';
import { useActiveWeb3React, useConnectWallet } from 'hooks';
import { BrowserRouter as Router, Route, Link, Switch, useLocation, useHistory } from 'react-router-dom';

export type IProps = {
	showNoti: Function;
	tokenID: string;
	routerWrap: string;
};

const WrapperContext = createContext<IProps>({
	showNoti: () => { },
	tokenID: '',
	routerWrap: ''
});

// const initialState = {
//   noti: "",
// };

// function reducer() {}

export const WrapperProvider = ({ children }) => {
	const { account } = useActiveWeb3React();
	const [tokenID, setTokenID] = useState('');

	const history = useHistory();
	const routerWrap = history.location.pathname;

	const getAuthHeader = async () => {
		try {
			let res = await AuthApi.getAuth({ address: account });
			if (res.status == 200) {
				setTokenID(res.data.id_token);
				window.localStorage.setItem('tokenId', res.data.id_token);
			}
		} catch (error) { }
	};

	useEffect(() => {
		if (account) {
			getAuthHeader();
		}
	}, [account]);

	// --- Show Notification ---
	const showNoti = (type: string, content: string) => {
		const nodeNoti = () => {
			return (
				<div className={`noti-box`}>
					<div className="noti-box__content">
						<span className="icon">
							{type == 'danger' ? <WarningOutlined /> : type == 'success' && <CheckCircleOutlined />}
						</span>
						<span className="text">{content}</span>
					</div>
				</div>
			);
		};

		switch (type) {
			case 'success':
				toast.success(content);
				break;
			case 'error':
				toast.error(content);
				break;
			case 'warning':
				toast.warning(content);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<WrapperContext.Provider
				value={{
					showNoti,
					tokenID: tokenID,
					routerWrap: routerWrap
				}}
			>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>

				{children}
			</WrapperContext.Provider>
		</>
	);
};

export const useWrap = () => useContext(WrapperContext);
