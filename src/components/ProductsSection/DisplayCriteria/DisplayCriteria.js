import React from 'react';
import OrderBy from './OrderBy';
import ShowAs from './ShowAs';
import Show from './Show';
import styled from 'styled-components';

const StyledDisplayCriteria = styled.div`
	background-color: ${(props) => (props.mobile ? 'white' : 'var(--primary-color)')};
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
			@media (max-width: 800px) {
				// display: none;
			}
		}
	}
	@media (max-width: 700px) {
		display: ${(props) => (props.mobile ? 'flex' : 'none')};
		flex-flow: column;
		margin-top: ${(props) => (props.mobile ? '20rem' : '0')};
		height: ${(props) => (props.mobile ? '12rem' : '0')};
		justify-content: space-between;
	}
`;
const DisplayCriteria = ({ mobile }) => {
	return (
		<StyledDisplayCriteria mobile={mobile}>
			<OrderBy />
			<Show />
		</StyledDisplayCriteria>
	);
};

export default DisplayCriteria;
