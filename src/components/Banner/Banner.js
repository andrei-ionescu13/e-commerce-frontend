import React from 'react';
import './Banner.css';
import image1 from '../../assets/images/CPU.jpg';
import { withRouter } from 'react-router-dom';
const Banner = ({ location }) => {
	const style = {
		display: location.pathname.localeCompare('/') === 0 ? 'block' : 'none'
	};
	return (
		<div style={style} className="banner">
			<img src={image1} alt="nvidia" />
		</div>
	);
};

export default withRouter(Banner);
