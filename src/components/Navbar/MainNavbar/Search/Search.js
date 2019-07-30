import React, { useState, useEffect } from 'react';
import './Search.css';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg';
const Search = () => {
	const [ iconColor, setIconColor ] = useState('white');
	const [ keyword, setKeyword ] = useState('');

	const keywordOnChange = e => {
		const keyword = e.target.value;
		setKeyword(keyword);
	};

	const submit = e => {
		setKeyword('');
		e.preventDefault();
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
			<input className="search-input" value={keyword} onChange={e => keywordOnChange(e)} />
			<button className="search-submit" type="submit">
				<SearchIcon fill={iconColor} className="search-icon" />
			</button>
		</form>
	);
};

export default Search;
