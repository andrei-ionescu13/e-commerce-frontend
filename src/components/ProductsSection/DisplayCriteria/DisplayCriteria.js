import React from 'react';
import './DisplayCriteria.css';
import OrderBy from './OrderBy/OrderBy';
import ShowAs from './ShowAs/ShowAs';
import Show from './Show/Show';
const DisplayCriteria = () => {
	return (
		<div className="display-criteria ">
			<OrderBy />
			<ShowAs />
			<Show />
		</div>
	);
};

export default DisplayCriteria;
