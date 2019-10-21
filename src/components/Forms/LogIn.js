import React, { useEffect, useRef } from 'react';
import { withFormik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { logInSchema } from '../../validation';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledUserForm, FormResponses, FormError } from '../../styles';
import { useHistory } from 'react-router-dom';

const RecoveryLink = styled(Link)`
	align-self: flex-start;
	text-decoration:none;
	font-size:1.6rem;
	
		&:focus {
			outline-color: rgba(255, 99, 71, 1);
		}
`;

const SignInLink = styled(Link)`
	margin:1rem;
	text-decoration:none;
		&:focus {
			outline-color: rgba(255, 99, 71, 1);
		}

`;

const LogIn = ({ values, handleChange, handleSubmit, errors, touched }) => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const buttonRef = useRef(null);
	const history = useHistory();

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
				<button ref={buttonRef} type="submit" className="login-button">
					LogIn
				</button>
				<FormResponses>
					{errors.email && touched.email && <FormError>{errors.email} </FormError>}
					{errors.password && touched.password && <FormError> {errors.password} </FormError>}
					{errors.reqErrors && <FormError>{errors.reqErrors.error || errors.reqErrors}</FormError>}
				</FormResponses>
			</StyledUserForm>
			<SignInLink to="/signin">Creare cont</SignInLink>
		</StyledContainer>
	);
};

export default withFormik({
	mapPropsToValues({ email, password }) {
		return {
			email: email || '',
			password: password || ''
		};
	},
	async handleSubmit(values, { resetForm, setErrors }) {
		try {
			const response = await axios.post('http://localhost:3333/user/login', values);
			console.log('succes');

			Cookies.set('authorization', `Bearer ${response.data.token}`);
			resetForm();
		} catch (err) {
			setErrors({ reqErrors: err.response.data.error });
			console.log(err.response.data.error);
		}
	},
	validationSchema: logInSchema,
	validateOnChange: false
})(LogIn);
