import React, { useState, useRef } from 'react';
import Rating from '../Rating/Rating';
import styled from 'styled-components';
import axios from 'axios';
import isTokenExpired from '../../helpers/isTokenExpired';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../../store/Actions/ProductsActions';
import { useHistory, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { questionSchema } from '../../validation';
import { FormError } from '../../styles';
import { FormMessage } from '../../styles';

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

const ProductQuestion = () => {
	const [ question, setQuestion ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState(null);
	const [ isSubmitting, setIsSubmitting ] = useState(false);
	const [ succesMessage, setSuccesMessage ] = useState(null);

	const dispatch = useDispatch();
	const history = useHistory();
	const params = useParams();

	console.log(params);
	const questionRef = useRef(null);
	const buttonRef = useRef(null);

	const handleKeyPress = e => {
		const name = e.target.name;
		const key = e.key;

		if (name === 'question' && key === 'Enter') {
			e.preventDefault();
			buttonRef.current.focus();
		}
	};

	console.log(isSubmitting);

	const reset = () => {
		setQuestion('');
	};

	const handleQuestionChange = e => {
		setQuestion(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsSubmitting(true);

		if (isTokenExpired('Authorization')) {
			Cookies.remove('Authorization');
			dispatch(setIsLogged(false));
			history.push('/login');
		}

		setErrorMessage(null);
		setSuccesMessage(null);

		try {
			await questionSchema.validate({ question });
		} catch (error) {
			setErrorMessage(error.message);
			return;
		} finally {
			setIsSubmitting(false);
		}

		const token = Cookies.get('Authorization');

		try {
			const headers = { Authorization: token };
			console.log(headers);
			await axios.post(
				`http://localhost:3333/question/${params.productName}`,
				{ question },
				{ headers: headers }
			);
			reset();
			setSuccesMessage('Intrebare trimis');
		} catch (error) {
			if (error.response.status === 401 || error.response.status === 404) {
				Cookies.remove('Authorization');
				dispatch(setIsLogged(false));
				history.push('/login');
			}
			setErrorMessage(error.response.data.error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<StyledReviewForm method="post" onSubmit={e => handleSubmit(e)}>
			<StyledLabel htmlFor="question">Intrebare:</StyledLabel>
			<StyledTextarea
				ref={questionRef}
				name="question"
				value={question}
				onChange={e => handleQuestionChange(e)}
				onKeyPress={e => handleKeyPress(e)}
				rows="12"
				cols="60"
			/>
			<AddReviewButton ref={buttonRef} disabled={isSubmitting} type="submit">
				Submit
			</AddReviewButton>
			{errorMessage && <FormError>{errorMessage}</FormError>}
			{succesMessage && <FormMessage>{succesMessage}</FormMessage>}
		</StyledReviewForm>
	);
};

export default ProductQuestion;
