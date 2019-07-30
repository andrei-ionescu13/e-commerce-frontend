import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';
import Banner from '../../../Banner/Banner';
const Dropdown = () => {
	return (
		<div className="dropdown">
			<button className="dropdown-button">Categorii</button>
			<div className="dropdown-content">
				<ul>
					<li>
						<Link className="dropdown-link" to="products/placi-video">
							Placi video
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="products/procesoare">
							Procesoare
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="products/placi-de-baza">
							Placi de baza
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="products/memorii">
							Memorii
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="products/SSD">
							SSD
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="products/hard-disk">
							Hard disk-uri
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="products/surse">
							Surse
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="products/carcase">
							Carcase
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="products/cooler">
							Coolere
						</Link>
					</li>
				</ul>
				<Banner />
			</div>
		</div>
	);
};

export default Dropdown;
