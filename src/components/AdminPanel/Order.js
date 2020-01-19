import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import axios from 'axios';

const StyledOrder = styled.div`
	padding: .5rem 1rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	border: 1px solid #888;
	border-bottom: none;
	font-size: 1.6rem;

	&:nth-last-child(1) {
		border-bottom: 1px solid #888;
	}

	> div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h3 {
		grid-column: 1 / 4;
		text-align: center;
	}
`;

const StyledButton = styled.button`
	font-weight: 600;
	background: transparent;
	color: #005eb8;
	font-size: 1.5rem;
	padding: 0;
	border: none;
	cursor: pointer;
	align-self: flex-end;
	margin: 0;
	grid-column: 3 / 4;
`;

const StyledLink = styled(Link)`
    color:#0074D9;
    text-decoration:none;
    display:inline-block;
   
`;

const StyledProduct = styled.div`
	grid-column: 1/4;
	justify-content: space-between !important;
	padding: 1rem 0;

	> div {
		display: flex;
		align-items: center;
		width: 25%;

		&:nth-child(1) {
			width: 50%;
		}
	}
`;

const StyledAddress = styled.div`
	grid-column: ${props => props.gridColumn || undefined};
	margin: auto;
	flex-flow: column;
`;

const Observation = styled.div`grid-column: 1 / 4;`;

const StyledForm = styled.form`
	margin: 2rem 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Order = ({
	id,
	userId,
	createdAt,
	totalQuantity,
	totalPrice,
	status,
	products,
	deliveryData,
	billingData,
	deliveryFee,
	observation
}) => {
	const [ showInfo, setShowInfo ] = useState(false);
	const [ showChangeButton, setShowChangeButton ] = useState(false);
	const [ actualStatus, setActualStatus ] = useState(status);
	const [ initialStatus, setInitialStatus ] = useState(status);
	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const handleShowInfo = () => setShowInfo(showInfo => !showInfo);

	const handleStatusChange = e => {
		const value = e.target.value;
		if (value === status) setShowChangeButton(false);
		else if (value !== actualStatus) setShowChangeButton(true);

		setActualStatus(value);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!isAuthenticated) {
			redirectToLogin();
		}
		setInitialStatus(actualStatus);
		setShowChangeButton(false);

		try {
			const headers = { Authorization: token };

			await axios.put(
				`http://localhost:3333/order/${id}/status`,
				{
					status: actualStatus
				},
				{
					headers: headers
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const selectDisabled =
		initialStatus === 'finished' || initialStatus === 'canceled' || initialStatus === 'refunded' ? true : false;
	console.log(selectDisabled);

	return (
		<StyledOrder>
			<div>
				Id: <StyledLink to={`/admin/order/${id}`}>{id}</StyledLink>
			</div>
			<div>
				User: <StyledLink to={`/admin/user/${userId}`}> {userId}</StyledLink>
			</div>
			<div>{`Date: ${new Date(createdAt).toLocaleDateString('ro-RO')}`}</div>
			<div>{`Quantity: ${totalQuantity}`}</div>
			<div>{`Total price: ${totalPrice} lei`}</div>
			<StyledForm onSubmit={e => handleSubmit(e)}>
				<div>{`Status: `}</div>
				<select disabled={selectDisabled} defaultValue={actualStatus} onChange={e => handleStatusChange(e)}>
					<option value="pending">Pending</option>
					<option value="active">Active</option>
					<option value="finished">Finished</option>
					<option value="canceled">Canceled</option>
					<option value="refunded">Refunded</option>
				</select>
				{showChangeButton && <StyledButton type="submit">Change</StyledButton>}
			</StyledForm>
			<StyledButton type="button" onClick={handleShowInfo}>
				More Info
			</StyledButton>{' '}
			{/* <MoreInfo> */}
			{/* <div>{deliveryFee}</div> */}
			{showInfo && (
				<React.Fragment>
					<div>{`Delivery fee: ${deliveryFee}`}</div>
					<StyledAddress gridColumn="1/2">
						<h4>Date livrare</h4>
						<div>{`Nume: ${deliveryData.lastName}`}</div>
						<div>{`Prenume: ${deliveryData.firstName}`}</div>
						<div>{`Telefon: ${deliveryData.phone}`}</div>
						<div>{`Judet: ${deliveryData.county}`}</div>
						<div>{`Oras: ${deliveryData.city}`}</div>
						<div>{`Adresa: ${deliveryData.address}`}</div>
					</StyledAddress>
					<StyledAddress gridColumn="3/4">
						<h4>Date facturare</h4>

						<div>{`Nume: ${billingData.lastName}`}</div>
						<div>{`Prenume: ${billingData.firstName}`}</div>
						<div>{`Telefon: ${billingData.phone}`}</div>
						<div>{`Judet: ${billingData.county}`}</div>
						<div>{`Oras: ${billingData.city}`}</div>
						<div>{`Adresa: ${billingData.address}`}</div>
					</StyledAddress>
					<h3>Produse</h3>
					{products.map(x => (
						<StyledProduct>
							<div>
								Product:{' '}
								<StyledLink to={`/admin/products/${x.product._id}`}> {x.product.name}</StyledLink>
							</div>
							<div>{`Quantity: ${x.quantity}`}</div>
							<div>{` Price: ${x.product.discountedPrice || x.product.price}`}</div>
						</StyledProduct>
					))}{' '}
					{observation !== '' && (
						<React.Fragment>
							<h3>Observatie</h3>
							<Observation>{observation}</Observation>
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</StyledOrder>
	);
};

export default Order;
