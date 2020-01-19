import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { Formik } from 'formik';
import axios from 'axios';
import ro from 'date-fns/locale/ro';
import 'react-datepicker/dist/react-datepicker.css';
import { userDataSchema } from '../../validation';
import _ from 'lodash';
import { FormError, FormMessage } from '../../styles';
import Cookies from 'js-cookie';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const StyledForm = styled.form`
	display: flex;
	flex-flow: column;
	height: 60rem;
	border: 1px solid lightgray;
	padding: 2.5rem;
	box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	background-color: white;

	label {
		font-size: 1.7rem;
		margin: 1rem 0;

		span {
			font-size: 1.4rem;
		}
	}
	input {
		padding-left: 1rem;
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
`;

const FlexRowContainer = styled.div`
	display: flex;
	justify-content: space-between;

	@media (max-width: 710px) {
		display: block;
	}
`;

const DatePickerWrapper = styled.div`
	.react-datepicker-wrapper,
	input {
		width: 100% !important;
	}

	.react-datepicker {
		width: 25rem;
		height: 25rem;
		font-size: 1.5rem;
	}

	.react-datepicker__day-name,
	.react-datepicker__day {
		margin: .8rem !important;
	}

	.react-datepicker__day--selected,
	.react-datepicker__day--keyboard-selected {
		background: var(--primary-color);
	}

	.react-datepicker__month-container {
		width: 100%;
		height: 100%;
	}
`;

const StyledButton = styled.button`
	display: block;
	width: 30%;
	height: 4rem;
	color: var(--primary-color);
	font-size: 2.2rem;
	border: 2px solid var(--primary-color);
	cursor: pointer;
	background: transparent;
	margin: 15rem auto 0 auto;
	&:hover {
		color: white;
		background: var(--primary-color);
	}

	&:focus {
		outline-color: var(--primary-color);
		color: white;
		background: var(--primary-color);
		box-shadow: 0 0 3pt 1pt var(--primary-color);
	}

	@media (max-width: 710px) {
		font-size: 1.7rem;
	}
`;

registerLocale('ro', ro);

const UserDataForm = ({ firstName, lastName, phone, dateOfBirth }) => {
	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const lastMonth = new Date();
	lastMonth.setMonth(lastMonth.getMonth() - 168);

	return (
		<Formik
			enableReinitialize={true}
			initialValues={{
				firstName: firstName || '',
				lastName: lastName || '',
				phone: phone || '',
				dateOfBirth: new Date(dateOfBirth) || null
			}}
			validationSchema={userDataSchema}
			validateOnChange={false}
			onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
				setStatus(null);

				if (!isAuthenticated) {
					redirectToLogin();
				}

				try {
					const headers = { Authorization: token };
					console.log(values);
					await axios.post('http://localhost:3333/user/data', values, { headers: headers });
					setStatus({ succes: 'Datele au fost salvate' });
				} catch (err) {
					setErrors({ serverErrors: err.response.data.error });
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ values, handleChange, handleSubmit, errors, touched, status, isSubmitting, setFieldValue }) => (
				<StyledForm onSubmit={handleSubmit}>
					<FlexRowContainer>
						<FlexColumnContainer>
							<label>
								Nume<span> *</span>:
							</label>
							<input name="lastName" type="text" value={values.lastName} onChange={handleChange} />
						</FlexColumnContainer>

						<FlexColumnContainer>
							<label>
								Prenume<span> *</span>:
							</label>
							<input name="firstName" type="text" value={values.firstName} onChange={handleChange} />
						</FlexColumnContainer>
					</FlexRowContainer>
					<FlexColumnContainer>
						<label>
							Numar telefon<span> *</span>:
						</label>
						<input name="phone" type="text" value={values.phone} onChange={handleChange} />
					</FlexColumnContainer>
					<FlexColumnContainer>
						<label>Data nasterii:</label>
						<DatePickerWrapper>
							<DatePicker
								autcomplete="off"
								name="dateOfBirth"
								locale="ro"
								maxDate={lastMonth}
								selected={values.dateOfBirth}
								value={values.dateOfBirth}
								onChange={e => setFieldValue('dateOfBirth', e)}
							/>
						</DatePickerWrapper>
					</FlexColumnContainer>
					<StyledButton disabled={isSubmitting} type="submit">
						Submit
					</StyledButton>
					{!_.isEmpty(errors) && <FormError>{Object.values(errors)[0]} </FormError>}
					{_.isEmpty(errors) && status && <FormMessage>{status.succes}</FormMessage>}
				</StyledForm>
			)}
		</Formik>
	);
};

export default UserDataForm;
