import React from 'react';
import { Link } from 'react-router-dom';
import './Dropdown.css';
import Banner from '../../../Banner/Banner';
import { withRouter } from 'react-router-dom';
const Dropdown = ({ location }) => {
	const display = location.pathname === '/' ? 'flex' : 'none';

	return (
		<div className="dropdown">
			<button className="dropdown-button">Categorii</button>
			<div style={{ display }} className="dropdown-content">
				<ul className="categories-list">
					<li>
						<Link className="dropdown-link" to="/cat/placi-video">
							Placi video
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="/cat/procesoare">
							Procesoare
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="/cat/placi-baza">
							Placi de baza
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="/cat/memorii">
							Memorii
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="/cat/ssd">
							SSD
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="/cat/hard-disk">
							Hard disk-uri
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="/cat/surse-alimentare">
							Surse
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="/cat/carcase">
							Carcase
						</Link>
					</li>
					<li>
						<Link className="dropdown-link" to="/cat/coolere">
							Coolere
						</Link>
					</li>
				</ul>
				<Banner />
			</div>
		</div>
	);
};

export default withRouter(Dropdown);
