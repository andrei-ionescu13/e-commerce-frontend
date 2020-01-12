import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import decodeToken from '../../helpers/decodeToken';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AnswerForm from './AnswerForm';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const QuestionLinkButton = styled(Link)`
	text-decoration:none;
	background:  var(--primary-color)
 ;
	color:white;
	height:4rem;
	width:13rem;
	display:flex;
	justify-content:center;
	align-items:center;
	font-size:1.7rem;
	margin:auto;
`;

const UserQuestion = styled.div`
	display: flex;
	min-height: 10rem;
	border-top: 2px solid #f5f5f5;

	@media (max-width: 720px) {
		flex-flow: column;
		padding-top: 1rem;
	}
`;

const User = styled.div`
	flex: 1;
	font-size: 1.5rem;
	align-self: stretch;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	width: 20%;

	h3 {
		margin: 0;

		padding: 0;
	}
	div {
		margin-top: 3rem;
		font-size: 1.2rem;
	}

	@media (max-width: 720px) {
		width: 40%;
		padding: 0 1rem;
		align-items: flex-start;
		border: none;
	}
`;

const Question = styled.div`
	width: 82%;
	font-size: 1.5rem;
	word-break: break-all;
	border-left: 2px solid #f5f5f5;
	padding: 2rem;
	/* > p {
		margin: 2rem;
	} */

	@media (max-width: 720px) {
		padding: 1rem;
	}
`;

const StyledButton = styled.button`
	font-weight: ${props => props.bold && 'bold'};
	background: transparent;
	color: #005eb8;
	font-size: 1.5rem;
	padding: 0;
	margin: 0;
	border: none;
	cursor: pointer;
`;

const Answer = styled.div`
	word-break: break-all;
	width: 82%;
	margin-left: auto;
	border-top: 2px solid #f5f5f5;
	border-left: 2px solid #f5f5f5;
	min-height: 10rem;
	padding: 2rem;

	h6 {
		padding: 0;
		margin: 0;
	}
	> p {
		font-size: 1.5rem;
	}

	@media (max-width: 720px) {
		width: 98%;
		border: none;
	}
`;

const StyledHeader = styled.h4`text-align: center;`;

const QuestionsSection = ({ questions, setQuestions, productName }) => {
	let userId;

	const [ showAnswerForm, setShowAnswerForm ] = useState(false);

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	if (isAuthenticated) {
		userId = decodeToken(token).id;
	}

	const handleAddAnswer = () => {
		setShowAnswerForm(true);
	};

	const handleDeleteQuestion = async questionId => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

		try {
			const headers = { Authorization: token };

			await axios.delete(`http://localhost:3333/question/${questionId}`, {
				headers: headers
			});

			setQuestions(questions.filter(x => x._id !== questionId));
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteAnswer = async (questionId, answerId) => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

		try {
			const headers = { Authorization: token };

			const questionIndex = questions.findIndex(x => x._id == questionId);

			questions[questionIndex].answers = questions[questionIndex].answers.filter(x => x._id !== answerId);
			console.log(questions[questionIndex].answers.filter(x => x._id !== answerId));
			setQuestions(questions);

			await axios.delete(`http://localhost:3333/question/answer/${questionId}/${answerId}`, {
				headers: headers
			});

			// setQuestions(questions.filter(x => x._id !== questionId));
		} catch (error) {
			console.log(error);
		}
	};

	const renderedReviews = questions.map(question => (
		<React.Fragment>
			<UserQuestion key={question._id}>
				<User>
					<h3>{`${question.user.lastName} ${question.user.firstName}`}</h3>
					<div>{new Date(question.date).toLocaleDateString('ro-RO')} </div>
				</User>
				<Question>
					<p> {question.content}</p>
					{userId === question.user._id ? (
						<StyledButton
							bold
							onClick={() => {
								handleDeleteQuestion(question._id);
							}}
						>
							Sterge
						</StyledButton>
					) : showAnswerForm ? (
						<AnswerForm
							questions={questions}
							setQuestions={setQuestions}
							questionId={question._id}
							setShow={setShowAnswerForm}
						/>
					) : (
						<StyledButton bold onClick={handleAddAnswer}>
							Adauga raspuns
						</StyledButton>
					)}
				</Question>
			</UserQuestion>
			{question.answers.map(answer => (
				<Answer>
					<h6>{`${answer.user.lastName} ${answer.user.firstName} - ${new Date(answer.date).toLocaleDateString(
						'ro-RO'
					)}`}</h6>
					<p>{answer.content}</p>
					{userId === answer.user._id && (
						<StyledButton
							onClick={() => {
								handleDeleteAnswer(question._id, answer._id);
							}}
						>
							Sterge
						</StyledButton>
					)}
				</Answer>
			))}
		</React.Fragment>
	));

	return (
		<React.Fragment>
			<QuestionLinkButton to={`/question/${productName}`}>Pune o intrebare</QuestionLinkButton>
			{renderedReviews.length > 0 ? renderedReviews : <StyledHeader>Nu exista intrebari</StyledHeader>}
		</React.Fragment>
	);
};

export default QuestionsSection;
