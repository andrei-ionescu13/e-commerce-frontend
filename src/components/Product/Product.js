import React from 'react';
import { Link } from 'react-router-dom';
import OldPrice from './OldPrice';
import Price from './Price';
import Discount from './Discount';
import CompareButton from './CompareButton';
import WishlistButton from './WishlistButton';
import BuyButton from './BuyButton';
import ProductRating from '../Product/ProductRating';
import styled from 'styled-components';
import { DeleteButton } from './DeleteButton';

const StyledProduct = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	a {
		display: block;
		width: 80%;
	}
	img {
		width: 100%;
		user-select: none;
		min-width: 12.5rem;
		opacity: ${props => props.opacity};
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
	color: black;
	opacity: ${props => props.opacity};
`;

const RatingContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	align-self: flex-start;
	padding-left: 25%;
	height: 3rem;
	opacity: ${props => props.opacity};
`;

const OutOfStockMessage = styled.h2`
	position: absolute;
	top: 20%;
	color: red;

	font-size: ${props => props.wishlistProduct && '2rem'};
`;

const Product = ({
	name,
	price,
	discountedPrice,
	_id,
	category,
	imagesURL,
	reviews,
	showWishlist = true,
	showDelete = false,
	deleteFunction,
	disabled = true,
	wishlistProduct = false
}) => {
	const imageURL = `http://localhost:3333/images/${imagesURL[0]}.jpg`;

	return (
		<StyledProduct opacity={disabled && '.5'}>
			<Link to={`/${name}`}>
				<img src={imageURL} alt={name} />
			</Link>
			<Link style={{ textDecoration: 'none' }} to={`/${name}`}>
				<Title opacity={disabled && '.5'}>{name}</Title>
			</Link>
			<RatingContainer opacity={disabled && '.5'}>
				<ProductRating reviews={reviews} width="2rem" />
			</RatingContainer>
			<Price opacity={disabled && '.5'} price={discountedPrice || price} />
			<OldPrice opacity={disabled && '.5'} price={price} discountedPrice={discountedPrice} />
			<BuyButton disabled={disabled} opacity={disabled && '.5'} productId={_id}>
				Adauga in cos
			</BuyButton>
			<Discount opacity={disabled && '.5'} price={price} discountedPrice={discountedPrice} />
			<FlexContainer>
				<CompareButton name={name} _id={_id} category={category} imageURL={imagesURL[0]} />
				{showWishlist && <WishlistButton opacity={disabled && '.5'} productId={_id} />}
				{showDelete && <DeleteButton onClick={deleteFunction} />}
			</FlexContainer>
			{disabled && <OutOfStockMessage wishlistProduct={wishlistProduct}>Stoc epuizat</OutOfStockMessage>}
		</StyledProduct>
	);
};

export default Product;
