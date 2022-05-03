import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
// import './filter.css';
import { FilterOutlined } from '@ant-design/icons';
const FilterMultiple = (props) => {
	const { filterList, getKeyFilter, activeKey, handleClear } = props;
	const [visible, setVisible] = useState(false);

	const handleClick_ChangeType = (item) => {
		getKeyFilter && getKeyFilter(item.key);
		setVisible(false);
	};

	const handleChange_Dropdown = () => {
		setVisible(!visible);
	};

	useEffect(() => {
		if (activeKey) {
			let input = document.querySelectorAll('.cate-checkbox');

			input.forEach((item) => {
				const element = item as HTMLInputElement;
				let dataCheck = item.getAttribute('data-check');

				if (activeKey.includes(dataCheck)) {
					element.checked = true;
				} else {
					element.checked = false;
				}
			});
		}
	}, [activeKey, visible]);

	const filterMarket = (
		<Menu className="filter-asset" onClick={handleClick_ChangeType}>
			{filterList?.length > 0 &&
				filterList.map((item, index) => (
					<Menu.Item key={item.name} className={item.icon}>
						<input name="isGoing" type="checkbox" className="cate-checkbox" data-check={item.name} /> <span>{item.name}</span>
					</Menu.Item>
				))}
		</Menu>
	);
	return (
		<div className="filter-box">
			<div className="clear">
				{/* <button onClick={handleClear}>Clear</button> */}
				<a onClick={handleClear}>Clear</a>
			</div>
			<Dropdown
				onVisibleChange={handleChange_Dropdown}
				visible={visible}
				overlay={filterMarket}
				trigger={['click']}
				className="filter-dropdown"
			>
				<div className="btn-filter">
					<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
						Click me +
					</a>
					<span className="icon">
						<FilterOutlined />
					</span>
				</div>
			</Dropdown>
		</div>
	);
};

export default FilterMultiple;
