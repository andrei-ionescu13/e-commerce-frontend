import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import useFetchAsAdmin from '../../hooks/useFetchAsAdmin';
import Review from './Review';
import ReactPaginate from 'react-paginate';
import { PaginationWrapper } from '../../styles';
import User from './User';

const StyledUsers = styled.div`
	display: flex;
	flex-flow: column;
`;

const Container = styled.div`
	display: flex;
	flex-flow: column;
	width: 100rem;
	margin: 20rem auto 0 auto;
`;
const SelectContainer = styled.div`
	margin: 2rem 0;
	display: flex;
	align-items: center;
`;

const Users = () => {
	const [ users, setUsers ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ page, setPage ] = useState(0);
	const [ total, setTotal ] = useState(0);
	const [ itemsPerPage, setItemsPerPage ] = useState(20);
	const [ orderBy, setOrderBy ] = useState('-createdAt');

	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	console.log(users);

	const fetchData = async () => {
		if (!isAuthenticated || !isAdmin) {
			redirectToLogin();
		}
		try {
			setLoading(true);
			const headers = { Authorization: token };
			const response = await axios.get('http://localhost:3333/user/', {
				headers: headers,
				params: {
					page,
					limit: itemsPerPage,
					orderBy
				}
			});
			setUsers(response.data.users);
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
		[ page, orderBy ]
	);

	const handlePageChange = e => setPage(e.selected);

	return (
		<Container>
			{!loading &&
			users.length > 0 && (
				<React.Fragment>
					<StyledUsers>
						{users.map(x => (
							<User
								key={x._id}
								id={x._id}
								firstName={x.firstName}
								lastName={x.lastName}
								phone={x.phone}
								addresses={x.deliveryAddresses}
								orders={x.orders}
								email={x.email}
								active={x.active}
								createdAt={x.createdAt}
							/>
						))}
					</StyledUsers>

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
				</React.Fragment>
			)}
		</Container>
	);
};

export default Users;
