import React from 'react';
import './SecondNavbar.css';
import Dropdown from './Dropdown/Dropdown';
const SecondNavbar = () => {
	return (
		<React.Fragment>
			<div className="second-navbar-container">
				<div className="second-navbar">
					<Dropdown />
				</div>
			</div>
		</React.Fragment>
	);
};

export default SecondNavbar;
