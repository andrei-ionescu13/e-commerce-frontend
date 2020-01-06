import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../../Banner/Banner';
import styled from 'styled-components';
import CategoriesList from './CategoriesList';

const StyledDropdown = styled.div`
	position: relative;
	display: block;

	&:hover {
		> div {
			display: flex;
		}
	}
`;
const StyledButton = styled.button`
	height: 100%;
	background: var(--primary-color);
	color: white;
	border: none;
	width: 10rem;
	font-size: 2rem;
	cursor: pointer;
`;

const CategoriesDropdown = () => {
	return (
		<StyledDropdown>
			<StyledButton>Categorii</StyledButton>
			<CategoriesList display="none" position="absolute" />
			{/* <Banner /> */}
		</StyledDropdown>
	);
};

export default CategoriesDropdown;
