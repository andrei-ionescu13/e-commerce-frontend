import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Formik } from 'formik';
import _ from 'lodash';
import { FormError, FormMessage } from '../../styles';
import regions from '../../helpers/regions';
import { AddressSchema } from '../../validation';
import Cookies from 'js-cookie';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
const StyledForm = styled.form`
	display: flex;
	flex-flow: column;
	width: 60rem;
	height: 60rem;
	margin: 3rem auto 0 auto;
	border: 1px solid lightgray;
	padding: 2.5rem;
	background: white;
	box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	label {
		font-size: 1.7rem;
		margin: 1rem 0;
	}
	input,
	select {
		padding-left: 1rem;

		padding-right: 1rem;
		height: 3rem;
		outline: none;
		border: 1px solid lightgray;
		font-size: 1.5rem;
		&:focus {
			border: 1px solid var(--primary-color);
		}
	}
`;

const FlexColumnContainer = styled.div`
	display: flex;
	flex-flow: column;
	width: ${props => props.width};
`;

const FlexRowContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ButtonsWrapper = styled.div`
	display: flex;
	margin-top: 12rem;
	align-self: center;
	width: 40%;
`;

const StyledSubmitButton = styled.button`
	display: block;
	height: 3.5rem;
	width: 50%;

	color: white;
	background: var(--primary-color);
	font-size: 2.2rem;
	border: 2px solid var(--primary-color);
	cursor: pointer;
`;

const StyledCancelButton = styled.button`
	display: block;
	width: 50%;
	height: 3.5rem;
	color: var(--primary-color);
	font-size: 2.2rem;
	border: 2px solid var(--primary-color);
	cursor: pointer;
	background: transparent;
`;

const AddressForm = ({ setAddresses, closePortal, id, firstName, lastName, phone, county, city, address }) => {
	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	return (
		<Formik
			enableReinitialize={true}
			initialValues={{
				id: id || undefined,
				firstName: firstName || '',
				lastName: lastName || '',
				phone: phone || '',
				county: county || '',
				city: city || '',
				address: address || ''
			}}
			validationSchema={AddressSchema}
			validateOnChange={false}
			onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
				setStatus(null);

				if (!isAuthenticated) {
					redirectToLogin();
				}

				try {
					const headers = { Authorization: token };
					if (id === undefined) {
						const response = await axios.post('http://localhost:3333/user/address', values, {
							headers: headers
						});
						const newAddress = response.data;
						setAddresses(addresses => [ ...addresses, newAddress ]);
					} else {
						const response = await axios.put('http://localhost:3333/user/address', values, {
							headers: headers
						});
						const changedAddress = response.data;
						setAddresses(addresses =>
							addresses.map(x => (x._id === changedAddress._id ? changedAddress : x))
						);
					}
					closePortal();
				} catch (err) {
					console.log(err.response);
					setErrors({ reqErrors: err.response.data.error });
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({
				values,
				handleChange,
				handleSubmit,
				errors,
				touched,
				status,
				isSubmitting,
				setFieldValue,
				setRefresh
			}) => (
				<StyledForm name="adressForm" id="adressForm" onSubmit={handleSubmit}>
					<FlexRowContainer>
						<FlexColumnContainer width="45%">
							<label>Nume:</label>
							<input
								form="adressForm"
								name="lastName"
								type="text"
								value={values.lastName}
								onChange={handleChange}
							/>
						</FlexColumnContainer>

						<FlexColumnContainer width="45%">
							<label>Prenume:</label>
							<input
								form="adressForm"
								name="firstName"
								type="text"
								value={values.firstName}
								onChange={handleChange}
							/>
						</FlexColumnContainer>
					</FlexRowContainer>
					<FlexColumnContainer>
						<label>Numar telefon:</label>
						<input
							form="adressForm"
							name="phone"
							type="text"
							value={values.phone}
							onChange={handleChange}
						/>
					</FlexColumnContainer>
					<FlexRowContainer>
						<FlexColumnContainer width="45%">
							<label>Judet:</label>
							<select
								form="adressForm"
								name="county"
								type="text"
								value={values.county}
								onChange={handleChange}
							>
								<option value={''} label={''} />
								{Object.keys(regions).map(x => <option value={x} label={x} />)}
							</select>
						</FlexColumnContainer>
						<FlexColumnContainer width="45%">
							<label>Oras:</label>
							<select
								form="adressForm"
								name="city"
								type="text"
								value={values.city}
								onChange={handleChange}
							>
								<option value={''} label={''} />
								{values.county !== '' &&
									regions[values.county].map(x => <option value={x.name} label={x.name} />)}
							</select>
						</FlexColumnContainer>
					</FlexRowContainer>
					<FlexColumnContainer>
						<label>Adresa:</label>
						<input
							form="adressForm"
							name="address"
							type="text"
							value={values.address}
							onChange={handleChange}
						/>
					</FlexColumnContainer>
					<ButtonsWrapper>
						<StyledCancelButton type="button" onClick={closePortal}>
							Cancel
						</StyledCancelButton>
						<StyledSubmitButton
							disabled={isSubmitting}
							form="adressForm"
							name="button1"
							value="buttonVal1"
							type="submit"
						>
							Submit
						</StyledSubmitButton>
					</ButtonsWrapper>
					{!_.isEmpty(errors) && <FormError>{Object.values(errors)[0]} </FormError>}
					{_.isEmpty(errors) && status && <FormMessage>{status.succes}</FormMessage>}
				</StyledForm>
			)}
		</Formik>
	);
};

export default AddressForm;
