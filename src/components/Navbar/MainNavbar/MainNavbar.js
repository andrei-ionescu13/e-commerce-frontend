import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Search from './Search';
import Cart from './Cart';
import { ReactComponent as UserIcon } from '../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedSelector } from '../../../store/Selectors/ProductsSelector';

const StyledUserIconContainer = styled.div`
	margin-right: 2rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	height: 6rem;
	width: 8rem;
`;

const StyledUserIcon = styled(UserIcon)`
	fill:var(--primary-color);
	width:3.5rem;
	height:100%;
`;

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

	return (
		<NavbarContainer>
			<Navbar>
				<Logo />
				<Search />
				<FlexContainer>
					{isLogged && (
						<StyledUserIconContainer>
							<StyledUserIcon />
						</StyledUserIconContainer>
					)}
					{!isLogged && <StyledLink to="/login">LogIn</StyledLink>}
					{!isLogged && <StyledLink to="/signin">SigIn</StyledLink>}
					<Cart />
				</FlexContainer>
			</Navbar>
		</NavbarContainer>
	);
};

export default MainNavbar;
