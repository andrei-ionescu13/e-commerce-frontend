import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Search from './Search';
import Cart from './Cart';
import { ReactComponent as UserIcon } from '../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedSelector } from '../../../store/Selectors/ProductsSelector';
import UserDropdown from './UserDropdown/UserDropdown';
import { isLoop } from '@babel/types';

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
	margin-right: 1.2rem;
	font-weight: bold;
`;

const NavbarContainer = styled.div`
	background-color: black;
	height: 6rem;
`;

const Navbar = styled.div`
	padding: 1rem 0;
	margin: auto;
	width: var(--primary-width);
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* width: 12%; */
`;
const MainNavbar = () => {
	const isLogged = useSelector(state => isLoggedSelector(state));
	console.log(isLogged);
	return (
		<NavbarContainer>
			<Navbar>
				<Logo />
				<Search />
				<FlexContainer>
					{isLogged  && <UserDropdown />}

					{!isLogged  && (
						<React.Fragment>
							<StyledLink to="/login">LogIn</StyledLink>
							<StyledLink to="/signup">SigUp</StyledLink>
						</React.Fragment>
					)}
					<Cart />
				</FlexContainer>
			</Navbar>
		</NavbarContainer>
	);
};

export default MainNavbar;
