import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

let firstLoad = true;

const DisplayValue = (props) => {
	const { value, amountFixed } = props;
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(firstLoad ? 0 : value);

	// console.log('Start: ', start);
	// console.log('End: ', end);
	// console.log('Value Display: ', value);
	// console.log('-------------------------');

	useEffect(() => {
		if (typeof value === 'number') {
			if (value > 0) {
				if (!firstLoad) {
					if (value === end) {
						setStart(value);
						setEnd(value);
					} else {
						setStart(end);
						setEnd(value);
					}
				} else {
					setStart(end);
					setEnd(value);
					firstLoad = false;
				}
			}
		}
	}, [value]);

	const returnStart = () => {
		let valueStart: any = null;
		if (value === end) {
			valueStart = end;
		} else {
			valueStart = value;
		}

		return valueStart;
	};

	return typeof value === 'number' ? (
		value > 0 ? (
			<span>
				<CountUp start={start} end={end} duration={0.5} separator="," decimals={amountFixed} decimal="," />
			</span>
		) : (
			<span>0,00</span>
		)
	) : (
		<span>0,00</span>
	);
};

export default DisplayValue;
