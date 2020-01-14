import React from 'react';
import PromotionsSlider from './PromotionsSlider';
import RecentlyViewedSlider from './RecentlyViewedSlider';
import RecentlyWishlistedSlider from './RecentlyWishlistedSlider';
import Brands from './Brands';
import Banner from '../Banner/Banner';
import CategoriesList from '../Navbar/SecondNavbar/CategoriesDropdown/CategoriesList';
import styled from 'styled-components';

const Container = styled.div`
	width: var(--primary-width);
	margin: auto;
	display: flex;
`;

const FrontPage = () => {
	return (
		<React.Fragment>
			<Container>
				<CategoriesList position="relative" display="flex" />
				<Banner />
			</Container>
			<PromotionsSlider itemsPerSlide={6} numberOfItems={24} />
			<RecentlyViewedSlider itemsPerSlide={6} numberOfItems={24} />
			<RecentlyWishlistedSlider itemsPerSlide={6} numberOfItems={24} />
			<Brands />
		</React.Fragment>
	);
};

export default FrontPage;
