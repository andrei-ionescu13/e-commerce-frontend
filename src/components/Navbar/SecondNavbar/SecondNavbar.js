import React from 'react';
import Dropdown from './Dropdown/Dropdown';
import Wishlist from './Wishlist';
import styled from 'styled-components';

const NavbarContainer = styled.div`
	background-color: black;
	height: 4.5rem;
`;

const Navbar = styled.div`
	color: white;
	margin: auto;
	width: var(--primary-width);
	height: 100%;
	display: flex;
	justify-content: space-between;
`;

const SecondNavbar = () => {
	return (
		<NavbarContainer>
			<Navbar>
				<Dropdown />
				<Wishlist />
			</Navbar>
		</NavbarContainer>
	);
};

export default SecondNavbar;
