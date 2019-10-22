import React from 'react';
import MainNavbar from './MainNavbar/MainNavbar';
import SecondNavbar from './SecondNavbar/SecondNavbar';
import styled from 'styled-components';

const Line = styled.div`
	background-color: var(--primary-color);
	height: .1rem;
`;

const Navbar = () => {
	return (
		<React.Fragment>
			<MainNavbar />
			<Line />
			<SecondNavbar />
		</React.Fragment>
	);
};

export default Navbar;
