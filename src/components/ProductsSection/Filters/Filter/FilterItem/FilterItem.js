import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

const FilterItem = ({ value, occurrence, onClickHandler, location, filterName }) => {
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

export default withRouter(FilterItem);
