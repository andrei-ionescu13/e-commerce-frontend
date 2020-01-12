import React from 'react';
import Slider from './Slider';
import Product from './Product/Product';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: var(--primary-width);
	margin: 0 auto 10rem auto;
`;

const StyledTitle = styled.div`
	margin: 0 auto 4rem auto;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	background-color: var(--primary-color);
	padding: .5rem 0;
	a {
		font-size: 1.5rem;
		color: #005eb8;
	}
`;

const PromotionsSlider = ({ itemsPerSlide, numberOfItems }) => {
	const [ products, loading ] = useFetch(`http://localhost:3333/products/promotions/${numberOfItems}`);
	console.log(products);
	let productsRendered = [];
	if (!loading) {
		productsRendered = products.map(x => (
			<Product
				key={x._id}
				_id={x._id}
				name={x.name}
				price={x.price}
				discountedPrice={x.discountedPrice}
				category={x.category}
				imagesURL={x.imagesURL}
				reviews={x.reviews}
			/>
		));
	}

	return (
		!loading && (
			<Container>
				<StyledTitle>
					<div>Promotii</div>
					<Link to="/promotions">(Click pentru a vedea toate promotiile)</Link>
				</StyledTitle>
				<Slider items={productsRendered} initialItemsPerSlide={itemsPerSlide} />
			</Container>
		)
	);
};

export default PromotionsSlider;
