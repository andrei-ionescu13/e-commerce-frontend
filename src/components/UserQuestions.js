import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Spinner from './Spinner/Spinner';
import useIsAuthenticated from '../hooks/useIsAuthenticated';
const Container = styled.div`
	width: var(--primary-width);
	margin: auto;
`;

const StyledHeader = styled.h4`text-align: center;`;

const UserReview = styled.div`
	display: flex;
	min-height: 10rem;
	border-top: 2px solid #f5f5f5;
	align-items: center;

	@media (max-width: 720px) {
		flex-flow: column;
		padding-top: 1rem;
	}
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
	
	img {
		padding-top: 1rem;
		width: 30%;
 		min-width:8rem;
	}

	@media (max-width: 720px) {
	width: 40%;
	padding: 0 1rem;
	align-items: flex-start;
	border:none;
	}
`;

const Question = styled.div`
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
	margin-top: 1rem;
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
const UserQuestions = () => {
	const [ questions, setQuestions ] = useState([]);
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
				const response = await axios.get('http://localhost:3333/user/questions', { headers: headers });
				setQuestions(response.data);
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

	const handleDelete = async questionId => {
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
	return (
		<Container>
			<StyledHeader>Intrebari</StyledHeader>
			{loading ? (
				<Spinner top="20rem" />
			) : (
				questions.map(x => (
					<UserReview>
						<Product to={x.product.name}>
							<div>{x.product.name}</div>
							<img src={`http://localhost:3333/images/${x.product.imagesURL[0]}.jpg`} />
						</Product>
						<Question>
							<StyledDate>{new Date(x.date).toLocaleDateString('ro-RO')} </StyledDate>
							<p> {x.content}</p>
							<DeleteButton
								onClick={() => {
									handleDelete(x._id);
								}}
							>
								Sterge
							</DeleteButton>
						</Question>
					</UserReview>
				))
			)}
		</Container>
	);
};

export default UserQuestions;
