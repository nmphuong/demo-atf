import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Input } from 'antd';
import { TwitterOutlined, YoutubeFilled, MediumOutlined, SearchOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import { useActiveWeb3React } from 'hooks';
import { Select } from 'antd';
import { useWrap } from 'context/WrapperContext';
import AssetFilterData from './AssetFilterData.json';

const { Header, Content, Footer, Sider } = Layout;

const wS = window.screen.width;

type objectParams = {
	boxType: string;
	saleId: number | null | string;
	sort: string | null;
};
declare const window: Window & typeof globalThis & { ethereum: any };
const FilterBox = (props) => {

	const dataSort = [
		{
			value: 'selling_price,asc',
			name: 'Low Price'
		},
		{
			value: 'selling_price,desc',
			name: 'High Price'
		}
	];

	const { handleGetType, handleGetSaleId, handleGetSort, isClear } = props;

	const paramFilterReset: objectParams = {
		boxType: 'ALL',
		saleId: 0,
		sort: null
	};
	const [paramFilter, setParamFilter] = useState(paramFilterReset);


	const { Option } = Select;

	function handleChange_Sort(value) {
		handleGetSort && handleGetSort(value);
		setParamFilter({
			...paramFilter,
			sort: value
		});
	}

	function handleChangeType(value) {
		handleGetType && handleGetType(value);
		setParamFilter({
			...paramFilter,
			boxType: value
		});
	}

	function handleChangeSaleId(e: React.FormEvent<HTMLInputElement>) {
		let val = e.currentTarget.value;
		console.log(val);
		handleGetSaleId && handleGetSaleId(val);
		setParamFilter({
			...paramFilter,
			saleId: val
		});
	}


	useEffect(() => {
		setParamFilter(paramFilterReset);
	}, [isClear]);

	return (
		<div className="__filter">
			<div className="wrap-sort">
				<Input className="filter-sort-id" placeholder="Box ID" onChange={handleChangeSaleId} />
			</div>
			<div className="wrap-sort">
				<Select value={paramFilter.boxType ? paramFilter.boxType : 'All'} className="filter-sort-slt" onChange={handleChangeType}>
					{AssetFilterData.map((item, index) => (
						<Option key={item.key.toString()} value={item.key}>{item.name}</Option>
					))}
				</Select>
			</div>

			<div className="wrap-sort">
				<Select value={paramFilter.sort ? paramFilter.sort : ''} className="filter-sort-slt" onChange={handleChange_Sort}>
				<Option value=''>Price mode</Option>
					{dataSort.map((item, index) => (
						<Option value={item.value} key={index}>
							{item.name}
						</Option>
					))}
				</Select>
			</div>
		</div>
	);
};

export default FilterBox;
