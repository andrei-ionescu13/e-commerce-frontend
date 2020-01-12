import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
	width: 80%;
	margin: 1rem 0;
	border-collapse: collapse;
	font-size: 1.5rem;

	th {
		padding: .5rem;
		background-color: var(--primary-color);
		font-size: 1.8rem;
	}

	tr,
	td {
		padding: .5rem;
		border: 1px solid lightgray;
	}

	td {
		width: 50%;
	}

	tr:nth-child(odd) {
		background-color: #f5f5f5;
	}
`;

const Specification = ({ name, pairs }) => {
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
			<StyledTable cellPadding="10px">
				<tbody>
					<tr>
						<th colSpan="2">{name}</th>
					</tr>
					{specs}
				</tbody>
			</StyledTable>
		</div>
	);
};

export default Specification;
