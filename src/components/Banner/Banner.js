import React from 'react';
import './Banner.css';
import image1 from '../../assets/images/CPU.jpg';

const Banner = () => {
	return (
		<div className="banner">
			<img src={image1} alt="nvidia" />
		</div>
	);
};

export default Banner;
