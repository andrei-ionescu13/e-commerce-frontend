import React from 'react';
import styled from 'styled-components';
import './MainNavbar.css';
import Logo from './Logo/Logo';
import Search from './Search/Search';
import Cart from './Cart/Cart';

import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`	
	text-decoration:none;
	user-select: none;
	cursor: pointer;
	border: none;
	outline: none;
	background-color: Transparent;
	color: var(--primary-color);
	font-size: 2rem;
	padding: 0;
	margin: 0 1rem;
	font-weight: bold;
	
`;

const MainNavbar = () => {
	return (
		<div className="main-navbar-container">
			<div className="main-navbar">
				<Logo />
				<Search />
				<div className="main-navbar-items">
					<StyledLink to="/login">LogIn</StyledLink>
					<StyledLink to="/signin">SigIn</StyledLink>
					<Cart />
				</div>
			</div>
		</div>
	);
};

export default MainNavbar;
