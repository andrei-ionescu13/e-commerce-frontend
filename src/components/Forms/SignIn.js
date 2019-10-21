import React, { useEffect, useRef } from 'react';
import { withFormik } from 'formik';
import axios from 'axios';
import { signInSchema } from '../../validation';
import { StyledContainer, StyledUserForm, FormResponses, FormError, FormMessage } from '../../styles';
import _ from 'lodash';

let message = '';

const SignIn = ({ values, handleChange, handleSubmit, errors, touched }) => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmedPasswordRef = useRef(null);
	const buttonRef = useRef(null);
	// const message = 'Un e-mail de confirmare a fost trimis';
	useEffect(() => {
		emailRef.current.focus();
	}, []);

	const handleKeyPress = e => {
		const name = e.target.name;
		const key = e.key;
		if (name === 'email' && key === 'Enter') passwordRef.current.focus();
		else if (name === 'password' && key === 'Enter') confirmedPasswordRef.current.focus();
		else if (name === 'confirmedPassword' && key === 'Enter') buttonRef.current.focus();
	};
	console.log(errors);
	return (
		<StyledContainer>
			<StyledUserForm method="post" className="login-form" onSubmit={e => handleSubmit(e)}>
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
				<button type="submit" ref={buttonRef} className="login-button">
					SignIn
				</button>
				<FormResponses>
					{errors.email && touched.email && <FormError>{errors.email} </FormError>}
					{errors.password && touched.password && <FormError> {errors.password} </FormError>}
					{errors.confirmedPassword &&
					touched.confirmedPassword && <FormError> {errors.confirmedPassword} </FormError>}
					{errors.reqErrors && <FormError>{errors.reqErrors.error || errors.reqErrors}</FormError>}
					{message.length > 0 && <FormMessage>{message}</FormMessage>}
				</FormResponses>
			</StyledUserForm>
		</StyledContainer>
	);
};

export default withFormik({
	mapPropsToValues({ email, password, confirmedPassword }) {
		return { email: email || '', password: password || '', confirmedPassword: confirmedPassword || '' };
	},
	async handleSubmit(values, { resetForm, setErrors }) {
		try {
			const response = await axios.post('http://localhost:3333/user/signin', values);
			console.log(response.data);
			message = 'Un e-mail de confirmare a fost trimis';
			resetForm();
		} catch (err) {
			setErrors({ reqErrors: err.response.data.error });

			console.log(err.response.data.error);
		}
	},
	validationSchema: signInSchema,
	validateOnChange: false
})(SignIn);
