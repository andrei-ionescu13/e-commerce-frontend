import React from 'react';
import CategoriesDropdown from './CategoriesDropdown/CategoriesDropdown';
import WishlistLink from './WishlistLink';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.div`
	background-color: black;
	height: 4.5rem;
`;

const Navbar = styled.div`
	color: white;
	margin: auto;
	width: var(--primary-width);
	height: 100%;
	display: flex;
	justify-content: space-between;
`;

const PromotionsLink = styled(Link)`
	display: flex;
	justify-content:center;
	align-items:center;
	height:100%;
	color:white;
	text-decoration:none;
	width:10rem;
	
	&:hover {
		background-color: #484848;
	}

	@media (max-width: 700px) {
		font-size: 1.8rem;
	}
`;

const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
	/* width: 12%; */
`;
const SecondNavbar = () => {
	return (
		<NavbarContainer>
			<Navbar>
				<FlexContainer>
					<CategoriesDropdown />
					<PromotionsLink to="/promotions">Promotii</PromotionsLink>
				</FlexContainer>
				<WishlistLink />
			</Navbar>
		</NavbarContainer>
	);
};

export default SecondNavbar;
