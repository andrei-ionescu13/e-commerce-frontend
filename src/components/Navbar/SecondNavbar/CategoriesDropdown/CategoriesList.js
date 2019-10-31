import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCategoriesList = styled.div`
	display: ${props => props.display};
	position: ${props => props.position};
	flex-flow: column;
	height: 45rem;
	width: 20rem;
	border-left: .1rem solid rgba(0, 0, 0, .5);
	border-right: .1rem solid rgba(0, 0, 0, .5);
	z-index: 1;
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		background-color: #f8f8f8;
		color: rgb(89, 88, 87);
		flex: 1;
		border-bottom: .1rem solid rgba(0, 0, 0, .5);

		&:hover {
			background-color: var(--primary-color);
		}
	}
`;

const CategoriesList = ({ display, position }) => {
	return (
		<StyledCategoriesList position={position} display={display}>
			<Link to="/cat/placi-video">Placi video</Link>
			<Link to="/cat/procesoare">Procesoare</Link>
			<Link to="/cat/placi-baza">Placi de baza</Link>
			<Link to="/cat/memorii">Memorii</Link>
			<Link to="/cat/ssd">SSD</Link>
			<Link to="/cat/hard-disk">Hard disk-uri</Link>
			<Link to="/cat/surse-alimentare">Surse</Link>
			<Link to="/cat/carcase">Carcase</Link>
			<Link to="/cat/coolere">Coolere</Link>
		</StyledCategoriesList>
	);
};

export default CategoriesList;
