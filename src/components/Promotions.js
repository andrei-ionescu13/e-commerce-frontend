import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Products from '../components/ProductsSection/Products/Products';
import styled from 'styled-components';
import Product from './Product/Product';
import useFetch from '../hooks/useFetch';

const Container = styled.div`
	width: 70%;
	margin: auto;
	margin-top: 2rem;
`;

const PromotionsTitle = styled.div`
	background: var(--primary-color);
	height: 4rem;
	font-size: 2.8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
`;

const Promotions = () => {
	const [ products, loading ] = useFetch(`http://localhost:3333/products/promotions`);

	return (
		!loading && (
			<Container>
				<PromotionsTitle>Promotions</PromotionsTitle>
				<Grid>
					{products.map(x => (
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
					))}
				</Grid>
			</Container>
		)
	);
};

export default Promotions;
