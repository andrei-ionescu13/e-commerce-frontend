import React from 'react';
import OrderBy from './OrderBy';
import ShowAs from './ShowAs';
import Show from './Show';
import styled from 'styled-components';

const StyledDisplayCriteria = styled.div`
	background-color: var(--primary-color);
	grid-area: d;
	margin-bottom: 3rem;
	display: flex;
	height: 5vh;
	justify-content: space-between;
	align-items: center;
	padding: 0 15%;
	font-size: 1.7rem;
	white-space: nowrap;
	> div {
		display: flex;

		label {
			margin-right: 1rem;

			@media (max-width: 1050px) {
				display: none;
			}
		}
	}

	@media (max-width: 700px) {
		display: none;
	}
`;

const DisplayCriteria = () => {
	return (
		<StyledDisplayCriteria>
			<OrderBy />
			<ShowAs />
			<Show />
		</StyledDisplayCriteria>
	);
};

export default DisplayCriteria;
