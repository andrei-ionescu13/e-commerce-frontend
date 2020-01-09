import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { logInSchema } from '../../validation';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StyledContainer, StyledUserForm, FormResponses, FormError } from '../../styles';
import { setIsLogged } from '../../store/Actions/ProductsActions';

const RecoveryLink = styled(Link)`
	align-self: flex-start;
	text-decoration:none;
	color: #005eb8;
	font-size:1.6rem;
	
		&:focus {
			outline-color: rgba(255, 99, 71, 1);
		}
`;

const SignInLink = styled(Link)`
	margin:1rem;
	color: #005eb8;
	text-decoration:none;
	
		&:focus {
			outline-color: rgba(255, 99, 71, 1);
		}

`;

const LogIn = ({ email, password }) => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const buttonRef = useRef(null);

	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	const handleKeyPress = e => {
		const name = e.target.name;
		const key = e.key;
		if (name === 'email' && key === 'Enter') {
			e.preventDefault();
			passwordRef.current.focus();
		} else if (name === 'password' && key === 'Enter') {
			e.preventDefault();
			buttonRef.current.focus();
		}
	};

	return (
		<StyledContainer>
			<Formik
				initialValues={{
					email: email || '',
					password: password || ''
				}}
				validationSchema={logInSchema}
				validateOnChange={false}
				onSubmit={async (values, { setErrors, setSubmitting }) => {
					try {
						const response = await axios.post('http://localhost:3333/user/login', {
							email: values.email,
							password: values.password
						});
						Cookies.set('Authorization', `Bearer ${response.data.token}`);
						dispatch(setIsLogged(true));
						history.push('/');
					} catch (err) {
						setErrors({ reqErrors: err.response.data.error });
						console.log(err.response.data.error);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
					<StyledUserForm method="post" onSubmit={handleSubmit}>
						<input
							ref={emailRef}
							name="email"
							type="text"
							placeholder="Email"
							onKeyPress={e => handleKeyPress(e)}
							value={values.email}
							onChange={handleChange}
						/>
						<input
							ref={passwordRef}
							name="password"
							type="password"
							placeholder="Parola"
							onKeyPress={e => handleKeyPress(e)}
							value={values.password}
							onChange={handleChange}
						/>
						<RecoveryLink css={`text-decoration:none;`} to="/recovery">
							Ai uitat parola?
						</RecoveryLink>
						<button disabled={isSubmitting} ref={buttonRef} type="submit">
							LogIn
						</button>
						<FormResponses>
							{errors.email && <FormError>{errors.email} </FormError>}
							{errors.password && <FormError> {errors.password} </FormError>}
							{errors.reqErrors && <FormError>{errors.reqErrors.error || errors.reqErrors}</FormError>}
						</FormResponses>
					</StyledUserForm>
				)}
			</Formik>
			<SignInLink to="/signup">Creare cont</SignInLink>
		</StyledContainer>
	);
};

export default LogIn;
