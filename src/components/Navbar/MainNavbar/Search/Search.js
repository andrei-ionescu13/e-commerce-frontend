import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import './Search.css';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg';
import useInput from '../../../../hooks/useInput';
import styled from 'styled-components';

const StyledSearchBar = styled.form`
	height: 3rem;
	display: flex;
	position: relative;
`;

const StyledSearchInput = styled.input`
	border: none;
	border-bottom: 2px solid var(--primary-color);
	width: 25vw;
	background: transparent;
	color: var(--primary-color);
	padding-left: 2rem;
	font-size: 1.6rem;
	outline: none;
`;

const StyledSearchButton = styled.button`
	position: absolute;
	right: 0;
	border: none;
	background: transparent;
	cursor: pointer;
	display: flex;
	justify-content: center;
`;

const StyledSearchIcon = styled(SearchIcon)`
	fill:${props => props.iconColor};
	width: 2.3rem;
`;

const Search = ({ history }) => {
	const [ keyword, bindKeyword, resetKeyword ] = useInput('');
	const [ iconColor, setIconColor ] = useState('Azure');

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

	const handleOnFocus = () => {
		setIconColor('var(--primary-color)');
	};

	const handleOnBlur = () => {
		setIconColor('Azure');
	};

	return (
		// <form className="search" onSubmit={e => submit(e)}>
		<StyledSearchBar onSubmit={e => submit(e)}>
			{/* <input className="search-input" {...bindKeyword} /> */}
			<StyledSearchInput {...bindKeyword} onBlur={handleOnBlur} onFocus={handleOnFocus} />
			<StyledSearchButton type="submit">
				<StyledSearchIcon iconColor={iconColor} />
			</StyledSearchButton>
			{/* </form> */}
		</StyledSearchBar>
	);
};

export default withRouter(Search);
