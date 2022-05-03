import { Layout, Row, Col, Pagination, Skeleton } from 'antd';
import { isMobile } from 'react-device-detect';
interface Col {
	classDefault: string;
}

const LoadingItem = (props) => {
	const { totalItem = 4 } = props;
	const col: Col = {
		classDefault: ''
	};
	const wS = window.screen.width;
	if (!isMobile) {
		if (wS > 1400) {
			col.classDefault = 'col-20';
		}
	}
	let list: Array<number> = [];
	for (let i = 1; i <= totalItem; i++) {
		list.push(i);
	}

	return (
		<>
			{list.map((item) => (
				<Col className={col.classDefault} xs={24} lg={6} md={12}>
					<div className="market-item" style={{ padding: '10px' }}>
						<Skeleton active />
					</div>
				</Col>
			))}
		</>
	);
};
export default LoadingItem;
