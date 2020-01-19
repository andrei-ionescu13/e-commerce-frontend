import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import useFetchAsAdmin from '../../hooks/useFetchAsAdmin';
import Review from './Review';
import ReactPaginate from 'react-paginate';
import { PaginationWrapper } from '../../styles';
import Question from './Question';

const StyledQuestions = styled.div`
	display: flex;
	flex-flow: column;
`;

const Container = styled.div`
	display: flex;
	flex-flow: column;
	width: 100rem;
	margin: 20rem auto 0 auto;
`;

const NoQuestionsMessage = styled.h1`text-align: center;`;

const Questions = () => {
	const [ questions, setQuestions ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ page, setPage ] = useState(0);
	const [ total, setTotal ] = useState(0);
	const [ itemsPerPage, setItemsPerPage ] = useState(20);

	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	console.log(questions);
	const fetchData = async () => {
		if (!isAuthenticated || !isAdmin) {
			redirectToLogin();
		}
		try {
			setLoading(true);
			const headers = { Authorization: token };
			const response = await axios.get('http://localhost:3333/question/', {
				headers: headers,
				params: {
					page,
					limit: itemsPerPage
				}
			});
			setQuestions(response.data.questions);
			setTotal(response.data.total);
			setLoading(false);
		} catch (error) {
			if (error.response.status === 401) {
				redirectToLogin();
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(
		() => {
			fetchData();
		},
		[ page ]
	);

	const handlePageChange = e => setPage(e.selected);

	const handleDeleteQuestion = async questionId => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

		try {
			const headers = { Authorization: token };

			const response = await axios.delete(`http://localhost:3333/question/${questionId}`, {
				headers: headers
			});

			setQuestions(questions.filter(x => x._id !== questionId));
			setTotal(response.data.total);

			if ((total - 1) % itemsPerPage === 0) setPage(page => page - 1);
		} catch (error) {
			console.log(error);
		}
	};

	// const handleSelectChange = e => setOrderBy(e.target.value);

	return (
		!loading &&
		(questions.length > 0 && (
			<Container>
				{/* <SelectContainer>
					<label>Ordoneaza:</label>
					<select defaultValue={orderBy} onChange={e => handleSelectChange(e)}>
						<option value="-rating">Rating</option>
						<option value="-createdAt">Cele mai noi</option>
						<option value="createdAt">Cele mai vechi</option>
					</select>
				</SelectContainer> */}
				<StyledQuestions>
					{questions.map(x => (
						<Question
							id={x._id}
							key={x._id}
							deleteQuestion={() => handleDeleteQuestion(x._id)}
							productId={x.product}
							userId={x.user}
							rating={x.rating}
							review={x.review}
							createdAt={x.createdAt}
							content={x.content}
							ans={x.answers}
						/>
					))}
				</StyledQuestions>
				{questions.length > 0 && (
					<PaginationWrapper admin>
						<ReactPaginate
							previousLabel={'<'}
							forcePage={page}
							nextLabel={'>'}
							previousLinkClassName={'previous-page'}
							disableInitialCallback={true}
							nextLinkClassName={'next-page'}
							breakLabel={'...'}
							breakClassName={'break-me'}
							pageCount={Math.ceil(total / itemsPerPage)}
							marginPagesDisplayed={2}
							pageRangeDisplayed={3}
							onPageChange={e => handlePageChange(e)}
							containerClassName={'pagination'}
							pageLinkClassName={'page'}
							activeLinkClassName={'active'}
						/>
					</PaginationWrapper>
				)}
			</Container>
		))
	);
};

export default Questions;
