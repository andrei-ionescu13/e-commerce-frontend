import React from 'react';

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
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 900px) {
		width: 5rem;
	}
`;

const HamburgerIcon = styled.div`
	display: none;
	> div {
		width: 3rem;
		height: .2rem;
		background-color: black;
		margin: 6px 0;
	}
	@media (max-width: 900px) {
		display: block;
	}
`;

const StyledName = styled.div`@media (max-width: 900px) {display: none;}`;
const CategoriesDropdown = () => {
	return (
		<StyledDropdown>
			<StyledButton>
				<StyledName>Categorii</StyledName>
				<HamburgerIcon>
					<div />
					<div />
					<div />
				</HamburgerIcon>
			</StyledButton>
			<CategoriesList display="none" position="absolute" />
		</StyledDropdown>
	);
};

export default CategoriesDropdown;
