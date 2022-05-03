import React, { useState, useEffect, useRef } from 'react';
import { Layout, Radio, Input, Row, Col } from 'antd';
import { Select } from 'antd';
import { useWrap } from 'context/WrapperContext';
import AssetFilterData from './AssetFilterData.json';

const { Header, Content, Footer, Sider } = Layout;

const wS = window.screen.width;

type objectParams = {
	heroType: string;
	heroRarity: string;
	saleId: number | null | string;
	sort: string | null;
};
declare const window: Window & typeof globalThis & { ethereum: any };
const FilterHero = (props) => {
	const { showNoti } = useWrap();
	const fixedListFilterBox = [
		{
			name: 'ALL',
			value: ''
		},
		{
			name: 'CONQUEROR',
			value: 'CONQUEROR'
		},
		{
			name: 'EXPLORER',
			value: 'EXPLORER'
		}
	];

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

	const { handleGetRarity, handleGetType, handleGetSaleId, handleGetSort, isClear } = props;

	const paramFilterReset: objectParams = {
		heroType: 'ALL',
		heroRarity: '',
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
			heroType: value
		});
	}

	function handleChangeSaleId(e: React.FormEvent<HTMLInputElement>) {
		let val = e.currentTarget.value;

		handleGetSaleId && handleGetSaleId(val);
		setParamFilter({
			...paramFilter,
			saleId: val
		});
	}

	const onChangeRarity = e => {
		let val = e.target.value;
		handleGetRarity && handleGetRarity(val);
		setParamFilter({
			...paramFilter,
			heroRarity: val
		});
	};


	useEffect(() => {
		setParamFilter(paramFilterReset);
	}, [isClear]);

	return (
		<>
			<div className="__filter">
				<div className="wrap-sort">
					<Input className="filter-sort-id" placeholder="Hero ID" onChange={handleChangeSaleId} />
				</div>
				<div className="wrap-sort">
					<Select value={paramFilter.heroType ? paramFilter.heroType : 'All'} className="filter-sort-slt" onChange={handleChangeType}>
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
			<div className="__filter_raity">
				<div className="__title-filter">
					<p className="filter-title text-rarity">
						RARITY
					</p>
				</div>
				{/* <img className="filter-line" src="../images/sort-line.png" /> */}
				<div className="group-filter-checkbox">
					<Radio.Group style={{ width: '100%' }} onChange={onChangeRarity}>
						<Row>
							<Col span={12}>
								<Radio className="filter-checkbox" value="LEGENDARY">LEGENDARY</Radio>
							</Col>
							<Col span={12}>
								<Radio className="filter-checkbox" value="EPIC">EPIC</Radio>
							</Col>
							<Col span={12}>
								<Radio className="filter-checkbox" value="RARE">RARE</Radio>
							</Col>
						</Row>
					</Radio.Group>
				</div>
			</div>
		</>
	);
};

export default FilterHero;
