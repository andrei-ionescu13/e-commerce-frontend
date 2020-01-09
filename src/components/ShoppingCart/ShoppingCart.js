import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartSelector } from '../../store/Selectors/ProductsSelector';
import styled from 'styled-components';
import Product from './Product';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { setCartAsync, setCart } from '../../store/Actions/ProductsActions';
import axios from 'axios';
import Address from '../UserInfo/Address';
import { PortalWithState } from 'react-portal';
import Modal from '../Modal';
import AddressForm from '../UserInfo/AddressForm';
import Spinner from '../Spinner/Spinner';
import { Formik } from 'formik';

const StyledProducts = styled.div`
	border: 1px solid #888;
	padding: 0 3rem;
	width: 110rem;
	margin: auto;
	font-size: 1.5rem;
`;

const StyledSummary = styled.div`
	border: 1px solid #888;
	border-top: none;
	padding: 5rem 3rem;
	width: 110rem;
	margin: auto;
	font-size: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const FlexColumnContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 5rem;
`;

const AdressesContainer = styled.div`
	width: 110rem;
	margin: auto;
	padding: 0 10rem;
`;

const AddAddressButton = styled.button`
	height: 3.5rem;
	width: 11rem;
	border: 2px solid var(--primary-color);
	background: white;
	cursor: pointer;
	font-size: 1.3rem;
	border-radius: .3rem;

	&:hover {
		background: var(--primary-color);
		color: white;
	}
`;

const StyledHeader = styled.div`
	background: var(--primary-color);
	width: 110rem;
	color: white;
	margin: 2rem auto 2rem auto;
	display: flex;
	justify-content: center;
	padding: 1rem 0;
`;

const RadioContainer = styled.div`
	display: flex;
	justify-content: space-between;

	input {
	}

	> div:nth-child(2) {
		flex-basis: 95%;
	}
`;

const StyledRadioContainer = styled.div`
	padding: 0 11rem;
	font-size: 1.6rem;
`;

const StyledCenter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const ObservationContainer = styled.div`
	width: 110rem;
	margin: 12rem auto 0 auto;
	display: flex;
	flex-flow: column;
	align-items: center;
	color: #888;
	textarea {
		font-size: 2rem;
		padding: 1rem;
		width: 50%;
	}
`;

const StyledButton = styled.button`
	display: block;
	background: transparent;
	margin: 1rem auto 0 auto;
	padding: 1.5rem 3.5rem;
	border: 2px solid var(--primary-color);
	cursor: pointer;
	color: var(--primary-color);
	font-size: 1.5rem;
	font-weight: bold;
	&:hover {
		background: var(--primary-color);
		color: white;
	}
`;

const StyledForm = styled.form`
	width: 110rem;
	margin: auto;
`;

const EmptyCartWarning = styled.h3`text-align: center;`;

const ShoppingCart = ({ deliveryAdressIndex, billingAdressIndex, observation, paymentMethod }) => {
	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	const [ addresses, setAddresses ] = useState([]);
	const [ userIsLoading, setUserIsLoading ] = useState(true);

	const cart = useSelector(state => cartSelector(state));

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchData = async () => {
			if (!isAuthenticated) {
				redirectToLogin();
			}

			try {
				const headers = { Authorization: token };
				const response = await axios.get('http://localhost:3333/user/data', { headers: headers });
				const user = response.data;

				setAddresses(user.deliveryAddresses);
			} catch (error) {
			} finally {
				setUserIsLoading(false);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			const headers = { Authorization: token };
			dispatch(setCartAsync(`http://localhost:3333/user/cart`, { headers: headers }));
		} else
			// else dispatch(setCart(null));
			redirectToLogin();
	}, []);

	return (
		<React.Fragment>
			<Formik
				initialValues={{
					deliveryAdressIndex: deliveryAdressIndex || 0,
					billingAdressIndex: billingAdressIndex || 0,
					observation: observation || '',
					paymentMethod: paymentMethod || 'cashOnDelivery',
					cart: cart
				}}
				// validationSchema={logInSchema}
				validateOnChange={false}
				onSubmit={async (values, { setErrors, setSubmitting }) => {
					try {
						const headers = { Authorization: token };
						const order = await axios.post(
							'http://localhost:3333/order',
							{
								deliveryData: addresses[values.deliveryAdressIndex],
								billingData: addresses[values.billingAdressIndex],
								paymentMethod: values.paymentMethod,
								observation: values.observation
							},
							{ headers: headers }
						);
						console.log(order.data);
					} catch (err) {
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ values, handleChange, handleSubmit, errors, touched, status, isSubmitting }) => (
					<StyledForm method="post" onSubmit={handleSubmit}>
						{cart &&
							!userIsLoading &&
							(cart.products.length > 0 ? (
								<React.Fragment>
									<React.Fragment>
										<StyledHeader>Cos de cumparaturi</StyledHeader>
										<StyledProducts>
											{cart.products.map(x => (
												<Product
													key={x._id}
													productId={x.product._id}
													imgURL={
														'http://localhost:3333/images/' +
														x.product.imagesURL[0] +
														'.jpg'
													}
													name={x.product.name}
													price={x.product.price}
													discountedPrice={x.product.discountedPrice}
													quantity={x.quantity}
													productQuantity={x.product.quantity}
												/>
											))}
										</StyledProducts>
										<StyledSummary>
											<div>{`TOTAL: ${cart.totalQuantity} produse`}</div>
											<FlexColumnContainer>
												<div>Livrare la domiciliu: 18 lei</div>
												<div>{`TOTAL comanda: ${cart.totalPrice + 18} lei`}</div>
											</FlexColumnContainer>
										</StyledSummary>
									</React.Fragment>

									<StyledHeader>Date de livrare</StyledHeader>
									<AdressesContainer>
										{addresses.length === 0 ? (
											<h5>Nu aveti nici o adresa salvata</h5>
										) : (
											addresses.map((x, index) => (
												<RadioContainer key={x._id}>
													<StyledCenter>
														<input
															type="radio"
															value={index}
															name="deliveryAdressIndex"
															checked={values.deliveryAdressIndex == index}
															onChange={handleChange}
														/>
													</StyledCenter>
													<Address
														setAddresses={setAddresses}
														key={x._id}
														id={x._id}
														firstName={x.firstName}
														lastName={x.lastName}
														phone={x.phone}
														county={x.county}
														city={x.city}
														address={x.address}
													/>
												</RadioContainer>
											))
										)}
										<PortalWithState closeOnOutsideClick closeOnEsc>
											{({ openPortal, closePortal, isOpen, portal }) => (
												<React.Fragment>
													<AddAddressButton onClick={openPortal}>
														Adauga adresa
													</AddAddressButton>
													{portal(
														<Modal close={closePortal}>
															<AddressForm
																setAddresses={setAddresses}
																closePortal={closePortal}
															/>
														</Modal>
													)}
												</React.Fragment>
											)}
										</PortalWithState>
									</AdressesContainer>
									<StyledHeader>Date de facturare</StyledHeader>
									<AdressesContainer>
										{addresses.length === 0 ? (
											<h5>Nu aveti nici o adresa salvata</h5>
										) : (
											addresses.map((x, index) => (
												<RadioContainer key={x._id}>
													<StyledCenter>
														<input
															type="radio"
															value={index}
															name="billingAdressIndex"
															checked={values.billingAdressIndex == index}
															onChange={handleChange}
														/>
													</StyledCenter>
													<Address
														setAddresses={setAddresses}
														key={x._id}
														id={x._id}
														firstName={x.firstName}
														lastName={x.lastName}
														phone={x.phone}
														county={x.county}
														city={x.city}
														address={x.address}
													/>
												</RadioContainer>
											))
										)}
									</AdressesContainer>
									<StyledHeader>Metoda de plata</StyledHeader>
									<StyledRadioContainer>
										<input
											type="radio"
											value="cashOnDelivery"
											name="paymentMethod"
											checked={values.paymentMethod === 'cashOnDelivery'}
											onChange={handleChange}
										/>
										<label>Numerar cu plata la livrarea comenzii</label>
									</StyledRadioContainer>
									<ObservationContainer>
										<label>Observatii:</label>
										<textarea
											value={observation}
											name="observation"
											onChange={handleChange}
											rows="12"
											cols="60"
										/>
									</ObservationContainer>
									<StyledButton>Trimite comanda</StyledButton>
								</React.Fragment>
							) : (
								<EmptyCartWarning>Cosul dvs. este gol</EmptyCartWarning>
							))}
					</StyledForm>
				)}
			</Formik>
		</React.Fragment>
	);
};

export default ShoppingCart;
