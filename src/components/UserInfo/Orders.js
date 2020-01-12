import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { PortalWithState } from 'react-portal';
import AddressForm from './AddressForm';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import Price from '../Product/Price';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`
	width: 70vw;
	margin: auto;
	border: 1px solid #888;
	border-bottom: none;

	@media (max-width: 860px) {
		width: 90vw;
	}
`;

const StyledTitle = styled.h3`text-align: center;`;

const StyledOrder = styled(Link)`
	text-decoration:none;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	color: #888;
	border-bottom: 1px solid #888;
	font-size: 1.6rem;
	padding: .5rem 0;
	
	@media (max-width: 630px) {
		font-size: 1.3rem;
	}
`;

const StyledPrice = styled(Price)`
	font-size: 1.6rem;
	sup {
		font-size: 1.1rem;
	}
	
	@media (max-width: 630px) {
	font-size: 1.3rem;
	sup {
		font-size: .8rem;
	}
}
`;

const Orders = () => {
	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();
	const [ orders, setOrders ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const location = useLocation();
	console.log(loading);
	useEffect(() => {
		const fetchData = async () => {
			if (!isAuthenticated) {
				redirectToLogin();
			}

			try {
				const headers = { Authorization: token };
				const response = await axios.get('http://localhost:3333/user/orders', { headers: headers });
				setOrders(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<React.Fragment>
			<StyledTitle>Istoric Comenzi</StyledTitle>
			{!loading && (
				<Container>
					{orders.map(x => (
						<StyledOrder to={`${location.pathname}/${x._id}`}>
							<div>{x._id}</div>
							<div>
								{new Date(x.createdAt).toLocaleDateString('ro-Ro', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</div>
							<div>{x.status}</div>
							<div>{`x${x.totalQuantity}`}</div>

							<StyledPrice className="order-price" color="#888" price={x.totalPrice} />
						</StyledOrder>
					))}
				</Container>
			)}
		</React.Fragment>
	);
};

export default Orders;
