import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Answer from './Answer';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import axios from 'axios';

const StyledQuestion = styled.div`
	display: flex;
	flex-flow: column;
	border: 1px solid #888;
	border-bottom: none;
	font-size: 1.6rem;

	&:nth-last-child(1) {
		border-bottom: 1px solid #888;
	}
`;

const Info = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding: 0 1rem;
	border-bottom: 1px solid #888;
`;

const Content = styled.div`padding: 0 3rem;`;

const StyledButton = styled.button`
	font-weight: 600;
	background: transparent;
	color: #005eb8;
	font-size: 1.5rem;
	padding: 0;
	border: none;
	cursor: pointer;
	align-self: flex-end;
	margin: 1rem;
`;

const StyledLink = styled(Link)`
    color:#0074D9;
    text-decoration:none;
`;

const Question = ({ id, productId, userId, content, deleteQuestion, createdAt, ans }) => {
	const [ showAnswers, setShowAnswers ] = useState(false);
	const [ answers, setAnswers ] = useState(ans);

	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const handleShowAnswers = () => setShowAnswers(showAnswers => !showAnswers);

	const handleDeleteAnswer = async (questionId, answerId) => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

		try {
			const headers = { Authorization: token };

			await axios.delete(`http://localhost:3333/question/answer/${questionId}/${answerId}`, {
				headers: headers
			});

			setAnswers(answers.filter(x => x._id !== answerId));

			// const questionIndex = questions.findIndex(x => x._id == questionId);

			// questions[questionIndex].answers = questions[questionIndex].answers.filter(x => x._id !== answerId);
			// console.log(questions[questionIndex].answers.filter(x => x._id !== answerId));
			// setQuestions(questions);

			// setQuestions(questions.filter(x => x._id !== questionId));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<StyledQuestion>
				<Info>
					<div>
						Id: <StyledLink to={`/admin/question/${id}`}>{id}</StyledLink>
					</div>
					<div>
						Product: <StyledLink to={`/admin/product/${productId}`}>{productId}</StyledLink>
					</div>
					<div>
						User: <StyledLink to={`/admin/user/${userId}`}> {userId}</StyledLink>
					</div>
					<div>{`Data: ${new Date(createdAt).toLocaleDateString('ro-RO')}`}</div>
				</Info>
				<Content>
					Intrebare:<br />
					{content}
				</Content>
				{answers.length > 0 && <StyledButton onClick={handleShowAnswers}>Show answers</StyledButton>}
				<StyledButton onClick={deleteQuestion}>Delete</StyledButton>
			</StyledQuestion>
			{showAnswers &&
				answers.map(x => (
					<Answer
						key={x._id}
						deleteAnswer={() => handleDeleteAnswer(id, x._id)}
						userId={x.user}
						content={x.content}
						createdAt={x.createdAt}
					/>
				))}
		</React.Fragment>
	);
};

export default Question;
