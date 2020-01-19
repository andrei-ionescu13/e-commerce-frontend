import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { questionSchema } from '../../validation';
import { FormError } from '../../styles';
import { FormMessage } from '../../styles';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

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

	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const params = useParams();

	const reset = () => {
		setQuestion('');
	};

	const handleQuestionChange = e => {
		setQuestion(e.target.value);
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
			await questionSchema.validate({ question });
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
				`http://localhost:3333/question/${params.productName}`,
				{ question },
				{ headers: headers }
			);
			reset();
			setSuccesMessage('Intrebarea a fost trimisa');
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
			<StyledLabel htmlFor="question">Intrebare:</StyledLabel>
			<StyledTextarea
				name="question"
				value={question}
				onChange={e => handleQuestionChange(e)}
				rows="12"
				cols="60"
			/>
			<AddReviewButton disabled={isSubmitting} type="submit">
				Submit
			</AddReviewButton>
			{errorMessage && <FormError>{errorMessage}</FormError>}
			{succesMessage && <FormMessage>{succesMessage}</FormMessage>}
		</StyledReviewForm>
	);
};

export default ProductQuestion;
