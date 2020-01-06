import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { resetSchema } from '../../validation';
import { StyledContainer, StyledUserForm, FormResponses, FormError, FormMessage } from '../../styles';
import _ from 'lodash';

const token = window.location.pathname.split('/')[2];

const PasswordReset = ({ password, confirmedPassword }) => {
	const passwordRef = useRef(null);
	const confirmedPasswordRef = useRef(null);
	const buttonRef = useRef(null);

	useEffect(() => {
		passwordRef.current.focus();
	}, []);

	const handleKeyPress = e => {
		const name = e.target.name;
		const key = e.key;
		if (name === 'password' && key === 'Enter') {
			e.preventDefault();
			confirmedPasswordRef.current.focus();
		} else if (name === 'confirmedPassword' && key === 'Enter') {
			e.preventDefault();
			buttonRef.current.focus();
		}
	};

	return (
		<StyledContainer>
			<Formik
				initialValues={{ password: password || '', confirmedPassword: confirmedPassword || '' }}
				validationSchema={resetSchema}
				validateOnChange={false}
				onSubmit={async (values, { resetForm, setErrors, setSubmitting, setStatus }) => {
					try {
						setStatus(null);
						await axios.post(`http://localhost:3333/user/reset/${token}`, values);
						resetForm();
						setStatus({ succes: 'Parola schimbata' });
					} catch (error) {
						setErrors({ reqErrors: error.response.data.error });
						console.log(error.response.data);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ values, handleChange, handleSubmit, errors, touched, isSubmitting, status }) => (
					<StyledUserForm method="post" onSubmit={e => handleSubmit(e)}>
						<input
							ref={passwordRef}
							name="password"
							type="password"
							placeholder="Parola"
							value={values.password}
							onKeyPress={e => handleKeyPress(e)}
							onChange={handleChange}
						/>
						<input
							ref={confirmedPasswordRef}
							name="confirmedPassword"
							type="password"
							placeholder="Confirmati parola"
							value={values.confirmedPassword}
							onKeyPress={e => handleKeyPress(e)}
							onChange={handleChange}
						/>
						<button disabled={isSubmitting} type="submit" ref={buttonRef}>
							Submit
						</button>
						<FormResponses>
							{errors.password && touched.password && <FormError> {errors.password} </FormError>}
							{errors.confirmedPassword &&
							touched.confirmedPassword && <FormError> {errors.confirmedPassword} </FormError>}
							{errors.reqErrors && <FormError>{errors.reqErrors.error || errors.reqErrors}</FormError>}
							{_.isEmpty(errors) && status && <FormMessage>{status.succes}</FormMessage>}
						</FormResponses>
					</StyledUserForm>
				)}
			</Formik>
		</StyledContainer>
	);
};

export default PasswordReset;
