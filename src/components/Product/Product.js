import React from 'react';
import { Link } from 'react-router-dom';
import ProductOldPrice from './OldPrice';
import ProductPrice from './Price';
import Discount from './Discount';
import CompareButton from './CompareButton';
import WishlistButton from './WishlistButton';
import BuyButton from './BuyButton';

import styled from 'styled-components';

const StyledProduct = styled.div`
	width: 20rem;
	height: 37rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

	img {
		width: 15rem;
		height: 15rem;
		user-select: none;
	}
`;

const FlexContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
`;

const Title = styled.div`
	text-overflow: ellipsis;
	text-align: center;
	height: 7rem;
	font-size: 1.2rem;
	overflow: hidden;
	margin: 0 .4rem;
	margin-top: 2rem;
	width: 90%;
	color: rgb(89, 88, 87);
`;

const Product = ({ name, price, discountedPrice, _id, category, imagesURL }) => {
	const imageURL = `http://localhost:3333/images/${imagesURL[0]}.jpg`;

	return (
		<StyledProduct>
			<Link to={`/${name}`}>
				<img src={imageURL} alt={name} />
			</Link>
			<Link style={{ textDecoration: 'none' }} to={`/${name}`}>
				<Title>{name}</Title>
			</Link>

			<ProductPrice price={price} discountedPrice={discountedPrice} />
			<ProductOldPrice price={price} discountedPrice={discountedPrice} />
			<BuyButton>Adauga in cos</BuyButton>
			<Discount price={price} discountedPrice={discountedPrice} />
			<FlexContainer>
				<CompareButton name={name} _id={_id} category={category} imageURL={imagesURL[0]} />
				<WishlistButton />
			</FlexContainer>
		</StyledProduct>
	);
};

export default Product;
