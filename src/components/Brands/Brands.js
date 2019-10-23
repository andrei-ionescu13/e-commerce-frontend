import React from 'react';
import { Link } from 'react-router-dom';
import './Brands.css';
function importAll(r) {
	return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/brands', false, /\.(png|jpe?g|svg)$/));

const Brands = () => {
	const brandNames = images.map(x => x.split(/[\/\.]/)[3].replace('-', ' '));
	console.log(brandNames);
	return (
		<div className="brands">
			<div className="brands-title">Cele mai bune branduri</div>
			<div className="brands-container">
				{images.map((x, index) => (
					<div className="brand-container">
						<Link key={index} to={`/search?keyword=${brandNames[index]}`}>
							<img src={x} />
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Brands;
