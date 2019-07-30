import React from 'react';
import MainNavbar from './MainNavbar/MainNavbar';
import './Navbar.css';
import SecondNavbar from './SecondNavbar/SecondNavbar';
const Navbar = () => {
	return (
		<React.Fragment>
			<MainNavbar />
			<div className="full-line" />
			<SecondNavbar />
		</React.Fragment>
	);
};

export default Navbar;
