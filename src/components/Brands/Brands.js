import React from 'react';
import { Link } from 'react-router-dom';
import './Brands.css';
function importAll(r) {
	return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/brands', false, /\.(png|jpe?g|svg)$/));

const Brands = () => {
	return (
		<div className="brands">
			{console.log(images)}
			<div className="brands-title">Cele mai bune branduri</div>
			<div className="brands-container">
				{images.map(x => (
					<div className="brand-container">
						<Link>
							<img src={x} />
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Brands;
