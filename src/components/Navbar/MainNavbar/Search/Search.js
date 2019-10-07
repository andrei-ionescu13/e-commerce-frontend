import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setProductsAndFiltersAsync } from '../../../../store/Actions/ProductsActions';
import './Search.css';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg';
import queryString from 'query-string';
import useInput from '../../../../hooks/useInput';
const Search = ({ location, history }) => {
	const [ iconColor, setIconColor ] = useState('white');
	const [ keyword, bindKeyword, resetKeyword ] = useInput('');

	const submit = e => {
		e.preventDefault();

		if (keyword !== '') {
			resetKeyword();

			history.push({
				pathname: '/search',
				search: `keyword=${keyword}`
			});
		}
	};

	useEffect(
		() => {
			if (keyword.length > 0) setIconColor('black');
			else setIconColor('white');
		},
		[ keyword ]
	);

	return (
		<form className="search" onSubmit={e => submit(e)}>
			<input className="search-input" {...bindKeyword} />
			<button className="search-submit" type="submit">
				<SearchIcon fill={iconColor} className="search-icon" />
			</button>
		</form>
	);
};

export default withRouter(Search);
