import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Rating from './Rating/Rating';
import Spinner from './Spinner/Spinner';
import useIsAuthenticated from '../hooks/useIsAuthenticated';

const Container = styled.div`
	width: 80vw;
	margin: auto;
`;

const StyledHeader = styled.h4`text-align: center;`;

const UserReview = styled.div`
	display: flex;
	min-height: 10rem;
	border-top: 2px solid #f5f5f5;
	align-items: center;
`;

const Product = styled(Link)`
    text-decoration:none;
	flex-basis: 18%;
	font-size: 1.3rem;
	align-self: stretch;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	border-right: 2px solid #f5f5f5;
	width: 20%;
	padding: 1rem;

	img {
		padding-top: 1rem;
		max-width: 20%;
	}
`;

const Review = styled.div`
	flex: 1;
	font-size: 1.5rem;
	padding: 1rem;
	word-break: break-all;
	align-self: stretch;
	display: flex;
	flex-flow: column;
`;

const StyledDate = styled.div`
	font-size: 1.3rem;
	margin: 1rem 0 0 1rem;
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
	align-self: flex-end;
`;
const UserReviews = () => {
	const [ reviews, setReviews ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	useEffect(() => {
		const fetchData = async () => {
			if (!isAuthenticated) {
				redirectToLogin();
			}
			  
 			setLoading(true);
			const headers = { Authorization: token };
			try {
				const response = await axios.get('http://localhost:3333/user/reviews', { headers: headers });
				setReviews(response.data);
			} catch (error) {
				if (error.response.status === 404) {
					redirectToLogin();
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

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

	return (
		<Container>
			<StyledHeader>Review-uri</StyledHeader>
			{loading ? (
				<Spinner top="20rem" />
			) : (
				reviews.map(x => (
					<UserReview>
						<Product to={x.product.name}>
							<div>{x.product.name}</div>
							<img src={`http://localhost:3333/images/${x.product.imagesURL[0]}.jpg`} />
						</Product>
						<Review>
							<Rating value={x.rating} count={5} width="2.3rem" />
							<StyledDate>{new Date(x.date).toLocaleDateString('ro-RO')} </StyledDate>
							<p> {x.review}</p>
							<DeleteButton
								onClick={() => {
									handleDelete(x._id);
								}}
							>
								Sterge
							</DeleteButton>
						</Review>
					</UserReview>
				))
			)}
		</Container>
	);
};

export default UserReviews;
