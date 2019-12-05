import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withFormik } from 'formik';
import _ from 'lodash';
import { FormError, FormMessage } from '../../styles';
import regions from '../../helpers/regions';
import { AdressSchema } from '../../validation';
import isTokenExpired from '../../helpers/isTokenExpired';
import Cookies from 'js-cookie';
import { setIsLogged } from '../../store/Actions/ProductsActions';
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

		span {
			font-size: 1.4rem;
		}
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
const AdressForm = ({
	values,
	handleChange,
	handleSubmit,
	errors,
	touched,
	status,
	isSubmitting,
	setFieldValue,
	setRefresh,
	closePortal
}) => {
	console.log(values);
	return (
		<StyledForm onSubmit={handleSubmit}>
			<FlexRowContainer>
				<FlexColumnContainer width="45%">
					<label>
						Nume<span>*</span>:
					</label>
					<input name="lastName" type="text" value={values.lastName} onChange={handleChange} />
				</FlexColumnContainer>

				<FlexColumnContainer width="45%">
					<label>
						Prenume<span>*</span>:
					</label>
					<input name="firstName" type="text" value={values.firstName} onChange={handleChange} />
				</FlexColumnContainer>
			</FlexRowContainer>
			<FlexColumnContainer>
				<label>
					Numar telefon<span>*</span>:
				</label>
				<input name="phone" type="text" value={values.phone} onChange={handleChange} />
			</FlexColumnContainer>
			<FlexRowContainer>
				<FlexColumnContainer width="45%">
					<label>
						Judet<span>*</span>:
					</label>
					<select name="county" type="text" value={values.county} onChange={handleChange}>
						<option value={''} label={''} />
						{Object.keys(regions).map(x => <option value={x} label={x} />)}
					</select>
				</FlexColumnContainer>
				<FlexColumnContainer width="45%">
					<label>
						Oras<span>*</span>:
					</label>
					<select name="city" type="text" value={values.city} onChange={handleChange}>
						<option value={''} label={''} />
						{values.county !== '' &&
							regions[values.county].map(x => <option value={x.name} label={x.name} />)}
					</select>
				</FlexColumnContainer>
			</FlexRowContainer>{' '}
			<FlexColumnContainer>
				<label>
					Adresa<span>*</span>:
				</label>
				<input name="adress" type="text" value={values.adress} onChange={handleChange} />
			</FlexColumnContainer>
			<ButtonsWrapper>
				<StyledCancelButton type="button" onClick={closePortal}>
					Cancel
				</StyledCancelButton>
				<StyledSubmitButton type="submit">Submit</StyledSubmitButton>
			</ButtonsWrapper>
			{!_.isEmpty(errors) && <FormError>{Object.values(errors)[0]} </FormError>}
			{_.isEmpty(errors) && status && <FormMessage>{status.succes}</FormMessage>}
		</StyledForm>
	);
};

export default withFormik({
	enableReinitialize: true,
	mapPropsToValues({ firstName, lastName, phone, county, city, adress, id }) {
		return {
			id: id || undefined,
			firstName: firstName || '',
			lastName: lastName || '',
			phone: phone || '',
			county: county || '',
			city: city || '',
			adress: adress || ''
		};
	},
	async handleSubmit(values, { setErrors, setStatus, setSubmitting, props }) {
		const { history, dispatch, closePortal, setAdresses, id } = props;
		console.log(id);
		setStatus(null);

		if (isTokenExpired('Authorization')) {
			Cookies.remove('Authorization');
			dispatch(setIsLogged(false));
			history.push('/login');
		}
		const token = Cookies.get('Authorization');

		try {
			const headers = { Authorization: token };
			if (id === undefined) {
				const response = await axios.post('http://localhost:3333/user/adress', values, { headers: headers });
				const newAdress = response.data;
				setAdresses(adresses => [ ...adresses, newAdress ]);
			} else {
				const response = await axios.put('http://localhost:3333/user/adress', values, { headers: headers });
				const changedAdress = response.data;
				setAdresses(adresses => adresses.map(x => (x._id === changedAdress._id ? changedAdress : x)));
			}
			closePortal();
		} catch (err) {
			setErrors({ reqErrors: err.response.data.error });
		} finally {
			setSubmitting(false);
		}
	},
	validationSchema: AdressSchema,
	validateOnChange: false
})(AdressForm);
