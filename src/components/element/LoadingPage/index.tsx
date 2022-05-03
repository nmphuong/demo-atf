import React from 'react';
import './loadingpage.css';

const LoadingPage = (props) => {
	const { isLoading } = props;
	return isLoading ? (
		<div className="wrap-loading-page">
			<div className="boxes">
				<div className="box">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="box">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="box">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className="box">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};

export default LoadingPage;
