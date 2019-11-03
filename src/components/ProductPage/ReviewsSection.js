import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rating from '../Rating/Rating';
import isTokenExpired from '../../helpers/isTokenExpired';
import decodeToken from '../../helpers/decodeToken';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../../store/Actions/ProductsActions';

import axios from 'axios';

const UserReview = styled.div`
	display: flex;
	min-height: 10rem;
	border-top: 2px solid #f5f5f5;
	align-items: center;
`;

const User = styled.div`
	flex-basis: 18%;
	font-size: 1.5rem;
	align-self: stretch;
	display: flex;
	align-items: center;
	justify-content: center;
	border-right: 2px solid #f5f5f5;
	font-weight: 600;
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

const ReviewsSection = ({ initialReviews, productName }) => {
	let userId;

	const dispatch = useDispatch();
	const history = useHistory();

	const [ reviews, setReviews ] = useState(initialReviews);
	if (!isTokenExpired('Authorization')) {
		userId = decodeToken('Authorization').id;
	}

	console.log(reviews);

	const handleDelete = async reviewId => {
		if (isTokenExpired('Authorization')) {
			Cookies.remove('Authorization');
			dispatch(setIsLogged(false));
			history.push('/login');
		}
		const token = Cookies.get('Authorization');

		try {
			const headers = { Authorization: token };

			await axios.delete('http://localhost:3333/user/review', {
				data: {
					reviewId,
					productName
				},

				headers: headers
			});

			setReviews(reviews.filter(x => x._id !== reviewId));
		} catch (error) {
			console.log(error);
		}
	};

	const renderedReviews = reviews.map(x => (
		<UserReview key={x._id}>
			<User>{`${x.user.lastName} ${x.user.firstName}`}</User>
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

	return renderedReviews;
};

export default ReviewsSection;
