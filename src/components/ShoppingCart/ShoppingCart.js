import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartSelector } from '../../store/Selectors/ProductsSelector';
import styled from 'styled-components';
import Product from './Product';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { setCartAsync, setCart, setAlert } from '../../store/Actions/ProductsActions';
import axios from 'axios';
import Address from '../UserInfo/Address';
import { PortalWithState } from 'react-portal';
import Modal from '../Modal';
import AddressForm from '../UserInfo/AddressForm';
import Spinner from '../Spinner/Spinner';
import { Formik } from 'formik';
import { orderSchema } from '../../validation';
import { FormError } from '../../styles';

const StyledProducts = styled.div`
	border: 1px solid #888;
	padding: 0 3rem;
	width: 110rem;
	margin: auto;
	font-size: 1.5rem;

	@media (max-width: 1120px) {
		font-size: 1.3rem;
	}

	@media (max-width: 1120px) {
		width: 95vw;
		padding: 0 1rem;
	}
`;

const StyledSummary = styled.div`
	border: 1px solid #888;
	border-top: none;
	padding: 3rem;
	width: 110rem;
	margin: auto;
	font-size: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 1120px) {
		width: 95vw;
		padding: 3rem 1rem;
	}
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

	@media (max-width: 1120px) {
		width: 100vw;
		padding: 0 5vw;
	}
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

const StyledHeader1 = styled.div`
	background: var(--primary-color);
	width: 110rem;
	color: white;
	margin: 2rem auto 2rem auto;
	display: flex;
	justify-content: center;
	padding: 1rem 0;

	@media (max-width: 1120px) {
		width: 100vw;
	}
`;

const StyledHeader2 = styled.div`
	background: var(--primary-color);
	width: 100%;
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
		width: 35rem;
	}

	@media (max-width: 1120px) {
		width: 100vw;
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
	@media (max-width: 1120px) {
		width: 100vw;
	}
`;

const StyledMessage = styled.h3`
	text-align: center;
	color: ${props => props.color || 'black'};
`;

const ShoppingCart = () => {
	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	const [ disabled, setDisabled ] = useState(false);
	const [ addresses, setAddresses ] = useState([]);
	const [ userIsLoading, setUserIsLoading ] = useState(true);
	const [ deliveryAddressIndex, setDeliveryAddressIndex ] = useState(0);
	const [ billingAddressIndex, setBillingAddressIndex ] = useState(0);
	const [ observation, setObservation ] = useState('');
	const [ paymentMethod, setPaymentMethod ] = useState('cashOnDelivery');
	const [ errorMessage, setErrorMessage ] = useState(null);
	const [ submitted, setSubmitted ] = useState(false);
	const cart = useSelector(state => cartSelector(state));

	const handleDeliveryAddressIndexChange = e => setDeliveryAddressIndex(e.target.value);
	const handleBillingAddressIndexChange = e => setBillingAddressIndex(e.target.value);
	const handleObservationChange = e => setObservation(e.target.value);
	const handlePaymentMethodChange = e => setPaymentMethod(e.target.value);

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

	const handleSubmit = async e => {
		e.preventDefault();
		setErrorMessage(null);
		setDisabled(true);
		if (addresses[billingAddressIndex] === undefined || addresses[deliveryAddressIndex] === undefined) {
			dispatch(
				setAlert({
					show: true,
					message: 'Va rugam selectati o adresa',
					type: 'error'
				})
			);
			setDisabled(true);

			setTimeout(() => {
				dispatch(
					setAlert({
						show: false,
						message: '',
						type: null
					})
				);
				setDisabled(false);
			}, 2000);
		}
		try {
			await orderSchema.validate({ observation });
		} catch (error) {
			setErrorMessage(error.message);
			console.log(error);
			return;
		} finally {
			setDisabled(false);
		}
		try {
			const headers = { Authorization: token };
			const response = await axios.post(
				'http://localhost:3333/order',
				{
					deliveryData: addresses[deliveryAddressIndex],
					billingData: addresses[billingAddressIndex],
					paymentMethod: paymentMethod,
					observation: observation
				},
				{ headers: headers }
			);

			const cart = response.data;
			setSubmitted(true);
			dispatch(setCart(cart));
		} catch (err) {
			console.log(err.response.data.error);
			dispatch(
				setAlert({
					show: true,
					message: err.response.data.error,
					type: 'error'
				})
			);
			setDisabled(true);

			setTimeout(() => {
				dispatch(
					setAlert({
						show: false,
						message: '',
						type: null
					})
				);
				setDisabled(false);
			}, 2000);
		} finally {
			setDisabled(false);
		}
	};

	return (
		<React.Fragment>
			{submitted ? (
				<StyledMessage color="green">Comanda dvs. a fost trimisa</StyledMessage>
			) : cart && !userIsLoading ? cart.products.length > 0 ? (
				<React.Fragment>
					<StyledHeader1>Cos de cumparaturi</StyledHeader1>
					<StyledProducts>
						{cart.products.map(x => (
							<Product
								key={x._id}
								productId={x.product._id}
								imgURL={'http://localhost:3333/images/' + x.product.imagesURL[0] + '.jpg'}
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

					<PortalWithState closeOnOutsideClick closeOnEsc>
						{({ openPortal, closePortal, isOpen, portal }) => (
							<React.Fragment>
								<React.Fragment>
									{portal(
										<Modal close={closePortal}>
											<AddressForm setAddresses={setAddresses} closePortal={closePortal} />
										</Modal>
									)}
								</React.Fragment>
								<StyledForm
									onSubmit={e => handleSubmit(e)}
									method="post"
									id="checkoutForm"
									name="checkoutForm"
								>
									<React.Fragment>
										<StyledHeader2>Date de livrare</StyledHeader2>
										<AdressesContainer>
											{addresses.length === 0 ? (
												<h5>Nu aveti nici o adresa salvata</h5>
											) : (
												addresses.map((x, index) => (
													<RadioContainer key={x._id}>
														<StyledCenter>
															<input
																form="checkoutForm"
																type="radio"
																value={index}
																name="deliveryAdressIndex"
																checked={deliveryAddressIndex == index}
																onChange={e => handleDeliveryAddressIndexChange(e)}
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

											<React.Fragment>
												<AddAddressButton type="button" onClick={openPortal}>
													Adauga adresa
												</AddAddressButton>
											</React.Fragment>
										</AdressesContainer>
										<StyledHeader2>Date de facturare</StyledHeader2>
										<AdressesContainer>
											{addresses.length === 0 ? (
												<h5>Nu aveti nici o adresa salvata</h5>
											) : (
												addresses.map((x, index) => (
													<RadioContainer key={x._id}>
														<StyledCenter>
															<input
																form="checkoutForm"
																type="radio"
																value={index}
																name="billingAdressIndex"
																checked={billingAddressIndex == index}
																onChange={e => handleBillingAddressIndexChange(e)}
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
										<StyledHeader2>Metoda de plata</StyledHeader2>
										<StyledRadioContainer>
											<input
												form="checkoutForm"
												type="radio"
												value="cashOnDelivery"
												name="paymentMethod"
												checked={paymentMethod === 'cashOnDelivery'}
												onChange={e => handlePaymentMethodChange(e)}
											/>
											<label>Numerar cu plata la livrarea comenzii</label>
										</StyledRadioContainer>
										<ObservationContainer>
											<label>Observatii:</label>
											<textarea
												form="checkoutForm"
												value={observation}
												name="observation"
												onChange={e => handleObservationChange(e)}
												rows="12"
												cols="60"
											/>
										</ObservationContainer>
										<StyledButton
											type="submit"
											name="button2"
											value="buttonVal2"
											form="checkoutForm"
											disabled={disabled}
										>
											Trimite comanda
										</StyledButton>
										{errorMessage && <FormError>{errorMessage}</FormError>}
									</React.Fragment>
								</StyledForm>
								)
							</React.Fragment>
						)}
					</PortalWithState>
				</React.Fragment>
			) : (
				<StyledMessage>Cosul dvs. este gol</StyledMessage>
			) : (
				<Spinner top="50rem" />
			)}
		</React.Fragment>
	);
};

export default ShoppingCart;
