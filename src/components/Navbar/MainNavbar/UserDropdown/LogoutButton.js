import React from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../../../../store/Actions/ProductsActions';
import { useHistory } from 'react-router-dom';

const StyledButton = styled.button`
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3rem;
	color: #444;
	outline: none;
	border: none;
	background: transparent;
	font-size: 1.7rem;
	cursor: pointer;
	&:hover,
	&:focus {
		color: var(--primary-color);
	}
`;

const LogoutButton = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleClick = () => {
		Cookies.remove('Authorization');
		dispatch(setIsLogged(false));
		history.push('/');
	};

	return <StyledButton onClick={handleClick}>Logout</StyledButton>;
};

export default LogoutButton;
