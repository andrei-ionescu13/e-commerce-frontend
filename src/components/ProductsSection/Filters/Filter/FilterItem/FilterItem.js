import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const FilterItem = ({ value, occurrence, onClickHandler, filterName }) => {
	const location = useLocation();

	const verifyChecked = () => {
		let values = queryString.parse(location.search)[filterName];
		if (Array.isArray(values) && values.includes(value)) {
			return true;
		} else if (values === value) {
			return true;
		}
		return false;
	};

	const [ checked, setChecked ] = useState(verifyChecked());

	useEffect(
		() => {
			setChecked(verifyChecked());
		},
		[ location.search ]
	);
	return (
		<div className="filter-item">
			<input type="checkbox" checked={checked} onChange={e => onClickHandler(e)} value={value} />
			<label>{`${value} (${occurrence})`}</label>
			<br />
		</div>
	);
};

export default FilterItem;
