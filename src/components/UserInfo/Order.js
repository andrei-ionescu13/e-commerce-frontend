import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { PortalWithState } from 'react-portal';
import AddressForm from './AddressForm';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import Price from '../Product/Price';
import { Link, useLocation } from 'react-router-dom';

const Container = styled.div`
	border: 1px solid #888;
	width: 100rem;
	margin: 2rem auto 0 auto;
	font-size: 1.4rem;

	@media (max-width: 1050px) {
		width: 95vw;
	}
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-areas: "a1 a2" "info info";
	grid-gap: 5rem;
	margin: 5rem;

	@media (max-width: 800px) {
		display: block;
	}
`;

const StyledAddress = styled.div`
	border-radius: .3rem;
	grid-area: ${props => props.area};
	border: 1px solid #888;
	/* padding: 1rem 2rem; */
	line-height: 2.5rem;

	div {
		padding: 1rem 2rem;
	}

	@media (max-width: 800px) {
		margin-top: 5rem;
	}
`;

const StyledHeading = styled.h4`
	padding: .5rem 2rem;
	margin: 0;
	border-bottom: 1px solid #888;
	background: #f1f1f1;
	font-size: 1.8rem;
`;
const StyledProducts = styled.div`
	grid-area: info;
	border-radius: .3rem;
	border: 1px solid #888;

	@media (max-width: 800px) {
		margin-top: 5rem;
	}
`;

const StyledProduct = styled.div`
	height: 6rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	img {
		height: 70%;
	}

	a {
		flex-basis: 70%;
		display: block;
		color: #037;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
	}

	@media (max-width: 800px) {
		font-size: 1.1rem;
	}
`;

const StyledInfo = styled.div`margin: 2rem 5rem;`;

const StyledSummary = styled.div`
	margin-right: 5rem;
	display: flex;
	flex-flow: column;
	align-items: flex-end;

	> div {
		margin: .2rem 0;
		width: 28%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

const Order = () => {
	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();
	const [ order, setOrder ] = useState({});
	const [ loading, setLoading ] = useState(true);

	const params = useParams();
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			if (!isAuthenticated) {
				redirectToLogin();
			}
			try {
				const headers = { Authorization: token };
				const response = await axios.get(`http://localhost:3333/user/order/${params.id}`, { headers: headers });
				setOrder(response.data);
				console.log(response.data);
			} catch (error) {
				if (error.response.status === 401) history.push('/');
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<Container>
			{!loading && (
				<React.Fragment>
					<StyledHeading>{`Comanda ${order._id}`}</StyledHeading>
					<StyledInfo>
						<div>{`Plasata in data de: ${new Date(order.createdAt).toLocaleDateString('ro-Ro', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}`}</div>
						<div>{`Status: ${order.status}`}</div>
					</StyledInfo>
					<GridContainer>
						<StyledAddress area="a1">
							<StyledHeading>Adresa facturare</StyledHeading>
							<div>
								{`${order.billingData.lastName} ${order.billingData.firstName}`}
								<br />
								{order.billingData.address}
								<br />
								{`${order.billingData.city}, ${order.billingData.county},`}
								<br />
								{`T: ${order.billingData.phone}`}
							</div>
						</StyledAddress>
						<StyledAddress area="a2">
							<StyledHeading>Adresa livrare</StyledHeading>
							<div>
								{`${order.deliveryData.lastName} ${order.deliveryData.firstName}`}
								<br />
								{order.deliveryData.address}
								<br />
								{`${order.deliveryData.city}, ${order.deliveryData.county},`}
								<br />
								{`T: ${order.deliveryData.phone}`}
							</div>
						</StyledAddress>
						<StyledProducts>
							<StyledHeading>Produse comandate</StyledHeading>
							{order.products.map(x => (
								<StyledProduct key={x._id}>
									<img src={`http://localhost:3333/images/${x.product.imagesURL[0]}.jpg`} />
									<Link to={`/${x.product.name}`}>{x.product.name}</Link>
									<div>{`x${x.quantity}`}</div>
									<Price
										primarySize="1.4rem"
										secondarySize="1rem"
										price={x.product.discountedPrice || x.product.price}
									/>
								</StyledProduct>
							))}
						</StyledProducts>
					</GridContainer>
					<StyledSummary>
						<div>
							<div>Subtotal:</div>
							<Price primarySize="1.4rem" secondarySize="1rem" price={order.totalPrice - 18} />
						</div>
						<div>
							<div>Transport:</div>
							<Price primarySize="1.4rem" secondarySize="1rem" price={18} />
						</div>
						<div>
							<div>Total:</div>
							<Price primarySize="1.4rem" secondarySize="1rem" price={order.totalPrice} />
						</div>
					</StyledSummary>
				</React.Fragment>
			)}
		</Container>
	);
};

export default Order;
