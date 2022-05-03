import React from 'react';
import './loading.css';
const LoadingInPage = () => {
	return (
		<>
			<div className="center-loading">
				<div className="ring-loading"> </div>
				<span>Loading...</span>
			</div>
		</>
	);
};

export default LoadingInPage;
