import React from 'react';
import './Filter.css';

const Filter = ({ filterName, filterValues }) => {
	const filterValuesMapped = [];
	const keys = Object.keys(filterValues).sort((a, b) => {
		if (a.includes(' - ') || b.includes(' - ')) {
			return parseFloat(a.match(/\d+/)) < parseFloat(b.match(/\d+/)) ? -1 : 1;
		}
		if (!isNaN(a) && !isNaN(b)) {
			return parseFloat(a) < parseFloat(b) ? -1 : 1;
		}
		return a < b ? -1 : 1;
	});
	// for (let [ key, value ] of Object.entries(filterValues)) {
	// 	filterValuesMapped.push(
	// 		<div className="filter-item">
	// 			<input type="checkbox" value={key} />
	// 			{`${key} (${value})`}

	// 			<br />
	// 		</div>
	// 	);
	// }
	keys.forEach((x, index) => {
		filterValuesMapped.push(
			<div className="filter-item">
				<input type="checkbox" value={x} />
				<label>{`${x} (${filterValues[x]})`}</label>
				<br />
			</div>
		);
	});

	return (
		<div className="filter">
			<label>{typeof filterName === 'object' ? Object.keys(filterName)[0] : filterName}</label>
			{filterValuesMapped}
		</div>
	);
};

export default Filter;
