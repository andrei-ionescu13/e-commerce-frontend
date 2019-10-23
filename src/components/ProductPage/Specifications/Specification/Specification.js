import React from 'react';
import './Specification.css';
const Specification = ({ name, pairs }) => {
	console.log(name, pairs);
	const specs = [];
	for (const [ key, value ] of Object.entries(pairs)) {
		specs.push(
			<tr key={key}>
				<td>{`${key}:`}</td>
				<td>{value}</td>
			</tr>
		);
	}
	return (
		<div>
			<table cellPadding="10px" className="productPage-specs-table">
				<tbody>
					<tr>
						<th colSpan="2">{name}</th>
					</tr>
					{specs}
				</tbody>
			</table>
		</div>
	);
};

export default Specification;
