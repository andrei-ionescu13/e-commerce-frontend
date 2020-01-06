import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { signInSchema } from '../../validation';
import { StyledContainer, StyledUserForm, FormResponses, FormError, FormMessage } from '../../styles';
import Spinner from '../Spinner/Spinner';
import _ from 'lodash';

const SignUp = ({ firstName, lastName, email, password, confirmedPassword }) => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmedPasswordRef = useRef(null);
	const buttonRef = useRef(null);
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);

	useEffect(() => {
		lastNameRef.current.focus();
	}, []);

	const handleKeyPress = e => {
		const name = e.target.name;
		const key = e.key;
		if (name === 'lastName' && key === 'Enter') {
			e.preventDefault();
			firstNameRef.current.focus();
		} else if (name === 'firstName' && key === 'Enter') {
			e.preventDefault();
			emailRef.current.focus();
		} else if (name === 'email' && key === 'Enter') {
			e.preventDefault();
			passwordRef.current.focus();
		} else if (name === 'password' && key === 'Enter') {
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
				initialValues={{
					firstName: firstName || '',
					lastName: lastName || '',
					email: email || '',
					password: password || '',
					confirmedPassword: confirmedPassword || ''
				}}
				validationSchema={signInSchema}
				validateOnChange={false}
				onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
					try {
						setStatus(null);
						await axios.post('http://localhost:3333/user/signin', values);
						resetForm();
						setStatus({ succes: 'Un email de verificare a fost trimis' });
					} catch (err) {
						setErrors({ reqErrors: err.response.data.error });
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ values, handleChange, handleSubmit, errors, touched, status, isSubmitting }) => (
					<StyledUserForm method="post" className="login-form" onSubmit={e => handleSubmit(e)}>
						<input
							ref={lastNameRef}
							name="lastName"
							type="text"
							placeholder="Nume"
							value={values.lastName}
							onKeyPress={e => handleKeyPress(e)}
							onChange={handleChange}
						/>
						<input
							ref={firstNameRef}
							name="firstName"
							type="text"
							placeholder="Prenume"
							value={values.firstName}
							onKeyPress={e => handleKeyPress(e)}
							onChange={handleChange}
						/>
						<input
							ref={emailRef}
							name="email"
							type="text"
							placeholder="Email"
							value={values.email}
							onKeyPress={e => handleKeyPress(e)}
							onChange={handleChange}
						/>
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
							{!isSubmitting ? (
								'SignUp'
							) : (
								<Spinner width="3px" height="3px" font="4px" color="rgba(255, 99, 71, 1)" />
							)}
						</button>
						<FormResponses>
							{!_.isEmpty(errors) && <FormError>{Object.values(errors)[0]} </FormError>}
							{_.isEmpty(errors) && status && <FormMessage>{status.succes}</FormMessage>}
						</FormResponses>
					</StyledUserForm>
				)}
			</Formik>
		</StyledContainer>
	);
};

export default SignUp;
