import React, { useState } from 'react';
import Rating from './Rating';
import styled from 'styled-components';
import axios from 'axios';
import isTokenExpired from '../../../helpers/isTokenExpired';
import { useHistory } from 'react-router-dom';
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

const Review = () => {
	const history = useHistory();

	const [ value, setValue ] = useState(0);
	const [ review, setReview ] = useState('');

	const handleChange = e => {
		setReview(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (isTokenExpired('authorization')) history.push('/login');
	};

	return (
		<StyledReviewForm method="post" onSubmit={e => handleSubmit(e)}>
			<StyledLabel for="rating">Rating:</StyledLabel>
			<Rating
				id="rating"
				value={value}
				setValue={setValue}
				count={5}
				selectable={true}
				showEmpty={true}
				showMessage={true}
			/>
			<StyledLabel for="review" value={review} onChange={e => handleChange(e)}>
				Review:
			</StyledLabel>
			<textarea rows="10" cols="50" />
			<AddReviewButton type="submit">Adauga review</AddReviewButton>
		</StyledReviewForm>
	);
};

export default Review;
