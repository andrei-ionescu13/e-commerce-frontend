import React from 'react';
import { Link } from 'react-router-dom';
import ProductOldPrice from './OldPrice';
import ProductPrice from './Price';
import Discount from './Discount';
import CompareButton from './CompareButton';
import WishlistButton from './WishlistButton';
import BuyButton from './BuyButton';
import ProductRating from '../Product/ProductRating';
import styled from 'styled-components';

const StyledProduct = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

	a {
		width: 80%;
	}
	img {
		width: 100%;
		user-select: none;
	}
`;

const FlexContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
`;

const Title = styled.div`
	text-align: center;
	height: 7rem;
	font-size: 1.2rem;
	overflow: hidden;
	margin-top: 1rem;
	color: rgb(89, 88, 87);
`;

const RatingContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	align-self: flex-start;
	padding-left: 25%;
`;

const Product = ({ name, price, discountedPrice, _id, category, imagesURL, reviews }) => {
	const imageURL = `http://localhost:3333/images/${imagesURL[0]}.jpg`;

	return (
		<StyledProduct>
			<Link to={`/${name}`}>
				<img src={imageURL} alt={name} />
			</Link>
			<Link style={{ textDecoration: 'none' }} to={`/${name}`}>
				<Title>{name}</Title>
			</Link>
			<RatingContainer>
				<ProductRating reviews={reviews} width="2rem" />
			</RatingContainer>
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
