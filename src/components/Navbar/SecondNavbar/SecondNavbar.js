import React from 'react';
import './SecondNavbar.css';
import Dropdown from './Dropdown/Dropdown';
import Wishlist from './Wishlist/Wishlist';
const SecondNavbar = () => {
	return (
		<React.Fragment>
			<div className="second-navbar-container">
				<div className="second-navbar">
					<Dropdown />
					<Wishlist />
				</div>
			</div>
		</React.Fragment>
	);
};

export default SecondNavbar;
