import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import useInput from '../../../hooks/useInput';
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
	fill:${props => props.iconcolor};
	width: 2.3rem;
`;

const Search = ({ theme }) => {
	const [ keyword, bindKeyword, resetKeyword ] = useInput('');
	const [ iconColor, setIconColor ] = useState('Azure');

	const history = useHistory();

	const submit = e => {
		e.preventDefault();
		if (keyword !== '') {
			resetKeyword();
			history.push({
				pathname: '/search',
				search: `query=${keyword}`
			});
		}
	};

	const handleOnFocus = () => {
		setIconColor('#ff9801');
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
				<StyledSearchIcon iconcolor={iconColor} />
			</StyledSearchButton>
			{/* </form> */}
		</StyledSearchBar>
	);
};

export default Search;
