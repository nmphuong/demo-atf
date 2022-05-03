import React from 'react';

const Categories = ({ race, filterItems }) => {
	return (
		<div className="btn-container">
			{race.map((race, index) => {
				return (
					<button type="button" className="filter-btn" key={index} onClick={() => filterItems(!race)}>
						{race}
					</button>
				);
			})}
		</div>
	);
};

export default Categories;
