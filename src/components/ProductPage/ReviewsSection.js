import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rating from '../Rating/Rating';
import decodeToken from '../../helpers/decodeToken';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../../store/Actions/ProductsActions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const UserReview = styled.div`
	display: flex;
	min-height: 10rem;
	border-top: 2px solid #f5f5f5;
`;

const StyledReviewLinkButton = styled(Link)`
	text-decoration:none;
	background:var(--primary-color);
	color:white;
	height:4rem;
	width:13rem;
	display:flex;
	justify-content:center;
	align-items:center;
	font-size:1.7rem;
	margin:auto;
`;

const User = styled.div`
	flex-basis: 18%;
	font-size: 1.5rem;
	align-self: stretch;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	border-right: 2px solid #f5f5f5;
	width: 20%;
	div {
		margin-top: 3rem;
		font-size: 1.2rem;
	}
`;

const Review = styled.div`
	flex: 1;
	font-size: 1.5rem;
	padding: 2rem;

	word-break: break-all;
	> p {
		margin-top: 1rem;
	}
`;

const DeleteButton = styled.button`
	font-weight: 600;
	background: transparent;
	color: #005eb8;
	font-size: 1.5rem;
	padding: 0;
	margin: 0;
	border: none;
	cursor: pointer;
`;

const StyledHeader = styled.h4`text-align: center;`;

const ReviewsSection = ({ reviews, setReviews, productName }) => {
	let userId;

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	if (isAuthenticated) {
		userId = decodeToken(token).id;
	}

	const handleDelete = async reviewId => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

		try {
			const headers = { Authorization: token };

			await axios.delete(`http://localhost:3333/review/${reviewId}`, {
				headers: headers
			});

			setReviews(reviews.filter(x => x._id !== reviewId));
		} catch (error) {
			console.log(error);
		}
	};

	const renderedReviews = reviews.map(x => (
		<UserReview key={x._id}>
			<User>
				<h3>{`${x.user.lastName} ${x.user.firstName}`}</h3>
				<div>{new Date(x.date).toLocaleDateString('ro-RO')} </div>
			</User>
			<Review>
				<Rating value={x.rating} count={5} width="2.3rem" />
				<p> {x.review}</p>
				{userId === x.user._id && (
					<DeleteButton
						onClick={() => {
							handleDelete(x._id);
						}}
					>
						Sterge
					</DeleteButton>
				)}
			</Review>
		</UserReview>
	));

	return (
		<React.Fragment>
			<StyledReviewLinkButton to={`/review/${productName}`}>Lasa un review</StyledReviewLinkButton>
			{renderedReviews.length > 0 ? renderedReviews : <StyledHeader>Nu exista review-uri</StyledHeader>}
		</React.Fragment>
	);
};

export default ReviewsSection;
