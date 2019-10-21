import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveFilters } from '../../../../store/Actions/ProductsActions';
import './Filter.css';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import FilterItem from './FilterItem/FilterItem';

const Filter = ({ filterName, filterValues, history, location }) => {
	const filterValuesMapped = [];
	const keys = Object.keys(filterValues).sort((a, b) => {
		if (a.includes('Sub')) return -1;
		if (b.includes('Peste')) return 1;
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
		filterValuesMapped.push(
			<FilterItem
				key={x}
				value={x}
				occurrence={filterValues[x]}
				onClickHandler={onClickHandler}
				filterName={filterName}
			/>
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
