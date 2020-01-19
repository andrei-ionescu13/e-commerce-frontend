import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import useFetchAsAdmin from '../../hooks/useFetchAsAdmin';
import Review from './Review';
import ReactPaginate from 'react-paginate';
import { PaginationWrapper } from '../../styles';
import Order from './Order';

const StyledOrders = styled.div`
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
	align-self: flex-end;
`;

const InputContainer = styled.div`
	display: flex;
	justify-content: center;
	input {
		width: 25rem;
	}
`;

const Orders = () => {
	const [ orders, setOrders ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ page, setPage ] = useState(0);
	const [ total, setTotal ] = useState(0);
	const [ itemsPerPage, setItemsPerPage ] = useState(20);
	const [ statusSelected, setStatusSelected ] = useState('');
	const [ keyword, setKeyword ] = useState('');

	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const fetchData = async () => {
		if (!isAuthenticated || !isAdmin) {
			redirectToLogin();
		}
		try {
			setLoading(true);
			const headers = { Authorization: token };
			const response = await axios.get('http://localhost:3333/order/', {
				headers: headers,
				params: {
					page,
					limit: itemsPerPage,
					status: statusSelected,
					keyword: keyword
				}
			});

			setOrders(response.data.orders);
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
		[ page, statusSelected, keyword ]
	);

	const handlePageChange = e => setPage(e.selected);

	const handleSelectChange = e => setStatusSelected(e.target.value);

	const handleKeywordChange = e => setKeyword(e.target.value);

	return (
		<Container>
			<InputContainer>
				<input type="text" onChange={e => handleKeywordChange(e)} />
			</InputContainer>
			<SelectContainer>
				<label>Status:</label>
				<select defaultValue={statusSelected} onClick={e => handleSelectChange(e)}>
					<option value="">All</option>
					<option value="pending">Pending</option>
					<option value="active">Active</option>
					<option value="finished">Finished</option>
					<option value="canceled">Canceled</option>
					<option value="refunded">Refunded</option>
				</select>
			</SelectContainer>
			{!loading &&
			orders.length > 0 && (
				<React.Fragment>
					<StyledOrders>
						{orders.map(x => (
							<Order
								key={x._id}
								id={x._id}
								userId={x.user}
								createdAt={x.createdAt}
								totalQuantity={x.totalQuantity}
								totalPrice={x.totalPrice}
								status={x.status}
								products={x.products}
								deliveryData={x.deliveryData}
								billingData={x.billingData}
								deliveryFee={x.deliveryFee}
								observation={x.observation}
							/>
						))}
					</StyledOrders>

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

export default Orders;
