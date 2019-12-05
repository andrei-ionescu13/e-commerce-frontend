import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import isTokenExpired from '../../helpers/isTokenExpired';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../../store/Actions/ProductsActions';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { answerSchema } from '../../validation';
import { FormError } from '../../styles';

const StyledButton = styled.button`
	font-weight: 600;
	background: transparent;
	color: var(--primary-color);
	font-size: 1.5rem;
	margin: .5rem;
	border: none;
	cursor: pointer;
`;

const StyledForm = styled.form`
	input {
		border: none;
		background: transparent;
		border-bottom: 1px solid lightgray;
		width: 50%;
		outline: none;
		margin: 2rem;
		font-size: 1.5rem;
	}
`;

const FlexContainer = styled.div`
	display: flex;
	flex-flow: column;
`;

const AnswerForm = ({ questions, setQuestions, questionId, setShow }) => {
	const [ answer, setAnswer ] = useState('');
	const [ isSubmitting, setIsSubmitting ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState(null);

	const answerRef = useRef(null);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleAnswerChange = e => {
		setAnswer(e.target.value);
	};

	useEffect(() => {
		answerRef.current.focus();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		setIsSubmitting(true);

		if (isTokenExpired('Authorization')) {
			Cookies.remove('Authorization');
			dispatch(setIsLogged(false));
			history.push('/login');
		}

		setErrorMessage(null);

		try {
			await answerSchema.validate({ answer });
		} catch (error) {
			setErrorMessage(error.message);
			return;
		} finally {
			setIsSubmitting(false);
		}

		const token = Cookies.get('Authorization');

		try {
			const headers = { Authorization: token };
			const result = await axios.post(
				`http://localhost:3333/question/answer/${questionId}`,
				{ answer },
				{ headers: headers }
			);
			const questionIndex = questions.findIndex(x => x._id === result.data.questionId);
			questions[questionIndex].answers.push(result.data.answer);
			setQuestions(questions);
			setShow(false);

			console.log(result.data);
		} catch (error) {
			console.log(error);
			if (error.response.status === 401) {
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
		<StyledForm onSubmit={handleSubmit}>
			<FlexContainer>
				<div>
					<input ref={answerRef} onChange={e => handleAnswerChange(e)} placeholder="Raspuns" />
					<StyledButton type="button" onClick={() => setShow(false)}>
						Cancel
					</StyledButton>
					<StyledButton type="submit" value={answer}>
						Submit
					</StyledButton>
				</div>
				{errorMessage && <FormError>{errorMessage}</FormError>}
			</FlexContainer>
		</StyledForm>
	);
};

export default AnswerForm;
