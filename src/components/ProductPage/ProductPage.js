import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slideshow from './Slideshow';
import Specifications from './Specifications/Specifications';
import styled from 'styled-components';
import ProductRating from '../Product/ProductRating';
import ReviewsSection from './ReviewsSection';
import Price from '../Product/Price';
import OldPrice from '../Product/OldPrice';
import QuestionsSection from './QuestionsSection';
import { useHistory } from 'react-router-dom';
import BuyButton from '../Product/BuyButton';
import CompareButton from '../Product/CompareButton';
import WishlistButton from '../Product/WishlistButton';

const StyledProductPage = styled.div`
	width: var(--primary-width);
	margin: auto;
`;

const StyledProduct = styled.div`
	margin: auto;
	display: grid;
	grid-template-areas: 't t t t t t' 's s s s r r';
	border-bottom: 1px solid lightgray;
`;

const StyledProductTitle = styled.div`
	grid-area: t;
	font-size: 3rem;
	text-align: center;
	margin: 2rem 0;

	@media (max-width: 850px) {
		font-size: 2rem;
	}
`;

const StyledRight = styled.div`
	grid-area: r;
	border-left: 1px solid lightgray;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 10rem;
`;

const RatingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
`;

const StyledButton = styled.button`
	cursor: pointer;
	text-decoration: none;
	background: ${props => (props.active ? 'var(--primary-color)' : 'white')};
	color: ${props => (props.active ? 'white' : 'var(--primary-color)')};
	border: ${props => (props.active ? 'white' : `2px solid  var(--primary-color)`)};
	height: 4rem;
	width: 13rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.7rem;
`;

const FlexContainer = styled.div`
	display: flex;
	width: ${props => props.width};
	justify-content: ${props => props.justifyContent};

	@media (max-width: 850px) {
		width: 15rem;
	}
`;

const OutOfStockMessage = styled.h2`color: red;`;

const ProductPage = ({ location }) => {
	const [ loading, setLoading ] = useState(true);
	const [ product, setProduct ] = useState({});
	const [ showReviews, setShowReviews ] = useState(true);
	const [ showQuestions, setShowQuestions ] = useState(false);

	const history = useHistory();

	const productName = location.pathname.substring(1);

	useEffect(
		() => {
			axios
				.get(`http://localhost:3333/products/${productName}`)
				.then(result => {
					if (!result.data) {
						history.push('/');
						return;
					}
					setProduct(result.data);
					setLoading(false);
				})
				.catch(err => console.log(err));
		},
		[ productName ]
	);

	useEffect(
		() => {
			if (!loading) {
				let viewedProducts = localStorage.getObject('viewed-products');
				if (!viewedProducts) localStorage.setObject('viewed-products', [ product._id ]);
				else {
					if (viewedProducts.includes(product._id)) return;
					if (viewedProducts.length > 23) {
						viewedProducts = viewedProducts.slice(viewedProducts.length - 23);
					}
					viewedProducts.push(product._id);

					localStorage.setObject('viewed-products', viewedProducts);
				}
			}
		},
		[ productName, loading ]
	);

	const handleReviewsClick = () => {
		setShowReviews(true);
		setShowQuestions(false);
	};

	const handleQuestionsClick = () => {
		setShowReviews(false);
		setShowQuestions(true);
	};

	const setReviews = reviews => {
		setProduct(product => ({ ...product, reviews }));
	};

	const setQuestions = questions => {
		setProduct(product => ({ ...product, questions }));
	};

	return (
		!loading && (
			<StyledProductPage>
				<StyledProduct>
					<StyledProductTitle>{product.name}</StyledProductTitle>
					<Slideshow
						imagesURL={product.imagesURL}
						productName={product.name}
						price={product.price}
						discountedPrice={product.discountedPrice}
					/>
					<StyledRight>
						<OutOfStockMessage>Stoc epuizat</OutOfStockMessage>
						<RatingContainer>
							<ProductRating reviews={product.reviews} width="2rem" />
						</RatingContainer>
						<Price price={product.discountedPrice || product.price} />

						<OldPrice price={product.price} discountedPrice={product.discountedPrice} />
						<BuyButton productId={product._id} />
						<FlexContainer width="18rem" justifyContent="space-between">
							<CompareButton
								name={product.name}
								_id={product._id}
								category={product.category}
								imageURL={product.imagesURL[0]}
							/>
							<WishlistButton productId={product._id} />
						</FlexContainer>
					</StyledRight>
				</StyledProduct>
				<Specifications specs={product.informations} />
				<FlexContainer>
					<StyledButton active={showReviews} onClick={handleReviewsClick}>
						Review-uri
					</StyledButton>
					<StyledButton active={showQuestions} onClick={handleQuestionsClick}>
						Intrebari
					</StyledButton>
				</FlexContainer>
				{showReviews && (
					<ReviewsSection reviews={product.reviews} setReviews={setReviews} productName={product.name} />
				)}
				{showQuestions && (
					<QuestionsSection
						questions={product.questions}
						setQuestions={setQuestions}
						productName={product.name}
					/>
				)}
			</StyledProductPage>
		)
	);
};

export default ProductPage;
