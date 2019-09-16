import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveFilters } from '../../../../store/Actions/ProductsActions';
import './Filter.css';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

const Filter = ({ filterName, filterValues, history, location }) => {
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

	const onClickHandler = e => {
		const params = new URLSearchParams(location.search);
		const key = filterName;
		if (e.target.checked) {
			params.append(key, e.target.value);
		} else {
			let values = queryString.parse(location.search)[key];
			if (typeof values !== 'string') {
				values = values.filter(x => x !== e.target.value);
			}
			params.delete(key);
			if (typeof values !== 'string') values.forEach(x => params.append(key, x));
		}
		history.push({
			search: params.toString()
		});
	};

	keys.forEach((x, index) => {
		let checked = false;
		let values = queryString.parse(location.search)[filterName];
		console.log();
		if (typeof values == 'string' && values === x) {
			checked = true;
		} else if (values !== undefined && values.includes(x)) {
			checked = true;
		}
		filterValuesMapped.push(
			<div className="filter-item">
				<input type="checkbox" defaultChecked={checked} onChange={e => onClickHandler(e)} value={x} />
				<label>{`${x} (${filterValues[x]})`}</label>
				<br />
			</div>
		);
	});

	return (
		<div className="filter">
			<label>{filterName}</label>
			{filterValuesMapped}
		</div>
	);
};

export default withRouter(Filter);
