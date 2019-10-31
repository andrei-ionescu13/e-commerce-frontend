import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import axios from 'axios';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';
import Slideshow from './Slideshow/Slideshow';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';
import { ReactComponent as CompareIcon } from '../../assets/icons/compare.svg';
import Specifications from './Specifications/Specifications';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProductRating from '../Product/ProductRating';
import ReviewsSection from './ReviewsSection';

const StyledReviewLinkButton = styled(Link)`
	text-decoration:none;
	background:var(--primary-color);
	color:white;
	height:4rem;
	width:18%;
	display:flex;
	justify-content:center;
	align-items:center;
	font-size:1.7rem;
`;

const RatingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
`;

const ProductPage = ({ location }) => {
	const [ loading, setLoading ] = useState(true);
	const productName = location.pathname.substring(1);
	const [ product, setProduct ] = useState({});
	const [ actualPrice, setActualPrice ] = useState();

	useEffect(() => {
		axios
			.get(`http://localhost:3333/products/${productName}`)
			.then(result => {
				setProduct(result.data);
				setActualPrice((result.data.discountedPrice || result.data.price).toString());
				setLoading(false);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		!loading && (
			<div className="productPage">
				<div className="productPage-product">
					<div className="productPage-product-title">{product.name}</div>
					<Slideshow
						imagesURL={product.imagesURL}
						productName={product.name}
						price={product.price}
						discountedPrice={product.discountedPrice}
					/>
					<div className="productPage-product-rightSide">
						<RatingContainer>
							<ProductRating reviews={product.reviews} width="2rem" />
						</RatingContainer>
						<div className="productPage-product-price">
							{insertCharacterFromEnd(actualPrice.split('.')[0], '.', 3)}
							<sup>{Number.isInteger(parseFloat(actualPrice)) ? '00' : actualPrice.split('.')[1]}</sup>
						</div>
						<div className="productPage-product-oldPrice">
							{product.discountedPrice &&
								insertCharacterFromEnd(product.price.toString().split('.')[0], '.', 3)}
							<sup>{product.discountedPrice && product.price.toString().split('.')[1]}</sup>
						</div>
						<button className="productPage-product-buyButton"> Adauga in cos</button>
						<div />
						<div className="productPage-flex-container">
							<div className="productPage-product-compare">
								<CompareIcon className="productPage-product-compare-icon" />
								<div className="productPage-product-compare-text">Compara</div>
							</div>
							<div className="productPage-product-wishlist">
								<EmptyHeartIcon className="productPage-product-wishlist-icon" />
								<div className="productPage-product-wishlist-text">Wishlist</div>
							</div>
						</div>
					</div>
				</div>
				<Specifications specs={product.informations} />
				<StyledReviewLinkButton to={`/review/${product.name}`}>Lasa un review</StyledReviewLinkButton>
				<ReviewsSection initialReviews={product.reviews} productName={product.name} />
			</div>
		)
	);
};

export default ProductPage;
