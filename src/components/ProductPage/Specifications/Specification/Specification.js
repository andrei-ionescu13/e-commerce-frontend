import React from 'react';
import './Specification.css';
const Specification = ({ name, pairs }) => {
	console.log(name, pairs);
	const specs = [];
	for (const [ key, value ] of Object.entries(pairs)) {
		specs.push(
			<tr>
				<td>{`${key}:`}</td>
				<td>{value}</td>
			</tr>
		);
	}
	return (
		<div>
			<table cellpadding="10p" className="productPage-specs-table">
				<tr>
					<th colspan="2">{name}</th>
				</tr>
				{specs}
			</table>
		</div>
	);
};

export default Specification;
