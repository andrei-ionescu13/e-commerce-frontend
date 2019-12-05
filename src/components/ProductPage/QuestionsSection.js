import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Rating from '../Rating/Rating';
import isTokenExpired from '../../helpers/isTokenExpired';
import decodeToken from '../../helpers/decodeToken';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../../store/Actions/ProductsActions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AnswerForm from './AnswerForm';

const QuestionLinkButton = styled(Link)`
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

const Question = styled.div`
	display: flex;
	min-height: 10rem;
	border-top: 2px solid #f5f5f5;
`;

const QuestionUser = styled.div`
	flex: 1;
	align-self: stretch;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
	position: relative;

	div {
		bottom: 1rem;
		left: 1rem;
		font-size: 1.2rem;
	}
`;

const QuestionContent = styled.div`
	width: 82%;
	font-size: 1.5rem;
	word-break: break-all;
	border-left: 2px solid #f5f5f5;
	padding: 2rem;
	/* > p {
		margin: 2rem;
	} */
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
`;

const StyledHeader = styled.h4`text-align: center;`;

const QuestionsSection = ({ questions, setQuestions, productName }) => {
	let userId;

	const [ showAnswerForm, setShowAnswerForm ] = useState(false);

	const dispatch = useDispatch();
	const history = useHistory();

	const token = Cookies.get('Authorization');

	if (!isTokenExpired('Authorization')) {
		userId = decodeToken(token).id;
	}

	const handleAddAnswer = () => {
		setShowAnswerForm(true);
	};

	const handleDeleteQuestion = async questionId => {
		if (isTokenExpired('Authorization')) {
			Cookies.remove('Authorization');
			dispatch(setIsLogged(false));
			history.push('/login');
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
		if (isTokenExpired('Authorization')) {
			Cookies.remove('Authorization');
			dispatch(setIsLogged(false));
			history.push('/login');
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
			<Question key={question._id}>
				<QuestionUser>
					<h5>{`${question.user.lastName} ${question.user.firstName}`}</h5>
					<div>{new Date(question.date).toLocaleDateString('ro-RO')} </div>
				</QuestionUser>
				<QuestionContent>
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
				</QuestionContent>
			</Question>
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
