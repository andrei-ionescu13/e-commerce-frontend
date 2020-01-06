import React, { useState, useRef } from 'react';
import Rating from '../Rating/Rating';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { reviewSchema } from '../../validation';
import { FormError } from '../../styles';
import { FormMessage } from '../../styles';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const Container = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
	align-self: flex-start;
`;

const StyledReviewForm = styled.form`
	padding: 5rem;
	width: 50rem;
	margin: auto;
	display: flex;
	flex-flow: column;
`;

const StyledLabel = styled.label`
	font-size: 2rem;
	display: block;
	margin-bottom: 1rem;
`;

const AddReviewButton = styled.button`
	width: 15rem;
	height: 4rem;
	background: var(--primary-color);
	border: none;
	color: white;
	align-self: center;
	margin: 5rem;
	cursor: pointer;
`;

const StyledTextarea = styled.textarea`
	font-size: 2rem;
	padding: 1rem;
`;

const ProductReview = () => {
	const [ rating, setRating ] = useState(0);
	const [ review, setReview ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState(null);
	const [ isSubmitting, setIsSubmitting ] = useState(false);
	const [ succesMessage, setSuccesMessage ] = useState(null);

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	const dispatch = useDispatch();
	const history = useHistory();
	const params = useParams();

	const reset = () => {
		setRating(0);
		setReview('');
	};

	const handleChangeReview = e => {
		setReview(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!isAuthenticated) {
			redirectToLogin();
		}

		setErrorMessage(null);
		setSuccesMessage(null);

		try {
			await reviewSchema.validate({ rating, review });
		} catch (error) {
			setErrorMessage(error.message);
			return;
		} finally {
			setIsSubmitting(false);
		}

		try {
			const headers = { Authorization: token };
			console.log(headers);
			await axios.post(
				`http://localhost:3333/review/${params.productName}`,
				{ rating, review },
				{ headers: headers }
			);
			reset();
			setSuccesMessage('Review trimis');
		} catch (error) {
			if (error.response.status === 401 || error.response.status === 404) {
				redirectToLogin();
			}
			setErrorMessage(error.response.data.error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<StyledReviewForm method="post" onSubmit={e => handleSubmit(e)}>
			<StyledLabel htmlFor="rating">Rating:</StyledLabel>
			<Container>
				<Rating
					id="rating"
					value={rating}
					setValue={setRating}
					count={5}
					selectable={true}
					showEmpty={true}
					showMessage={true}
					color="#FFD700"
					inactiveColor="gray"
					width="3rem"
				/>
			</Container>
			<StyledLabel htmlFor="review">Review:</StyledLabel>
			<StyledTextarea name="review" value={review} onChange={e => handleChangeReview(e)} rows="12" cols="60" />
			<AddReviewButton disabled={isSubmitting} type="submit">
				Adauga review
			</AddReviewButton>
			{errorMessage && <FormError>{errorMessage}</FormError>}
			{succesMessage && <FormMessage>{succesMessage}</FormMessage>}
		</StyledReviewForm>
	);
};

export default ProductReview;
