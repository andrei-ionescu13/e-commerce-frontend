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
import Price from '../Product/Price';
import OldPrice from '../Product/OldPrice';
import { setProductsAndFiltersAsync } from '../../store/Actions/ProductsActions';
import QuestionsSection from './QuestionsSection';
import { useHistory } from 'react-router-dom';

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
	border: ${props => (props.active ? 'white' : '2px solid var(--primary-color)')};
	height: 4rem;
	width: 13rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.7rem;
`;

const FlexContainer = styled.div`
	display: flex;
	margin-bottom: 5rem;
`;

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
					// setActualPrice((result.data.discountedPrice || result.data.price).toString());
					setLoading(false);
				})
				.catch(err => console.log(err));
		},
		[ productName ]
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
						<Price price={product.price} discountedPrice={product.discountedPrice} />

						<OldPrice price={product.price} discountedPrice={product.discountedPrice} />
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
			</div>
		)
	);
};

export default ProductPage;
