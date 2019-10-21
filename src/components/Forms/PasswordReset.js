import React, { useEffect, useRef } from 'react';
import { withFormik } from 'formik';
import axios from 'axios';
import { resetSchema } from '../../validation';
import { StyledContainer, StyledUserForm, FormResponses, FormError, FormMessage } from '../../styles';
import { withRouter } from 'react-router-dom';

let message = '';

const token = window.location.pathname.split('/')[2];

const PasswordReset = ({ values, handleChange, handleSubmit, errors, touched, match }) => {
	const passwordRef = useRef(null);
	const confirmedPasswordRef = useRef(null);
	const buttonRef = useRef(null);
	useEffect(() => {
		passwordRef.current.focus();
	}, []);
	const handleKeyPress = e => {
		const name = e.target.name;
		const key = e.key;
		if (name === 'password' && key === 'Enter') confirmedPasswordRef.current.focus();
		else if (name === 'confirmedPassword' && key === 'Enter') buttonRef.current.focus();
	};

	return (
		<StyledContainer>
			<StyledUserForm method="post" className="login-form" onSubmit={e => handleSubmit(e)}>
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
					{errors.password && touched.password && <FormError> {errors.password} </FormError>}
					{errors.confirmedPassword &&
					touched.confirmedPassword && <FormError> {errors.confirmedPassword} </FormError>}
					{message.length > 0 && <FormMessage>{message}</FormMessage>}
				</FormResponses>
			</StyledUserForm>
		</StyledContainer>
	);
};

export default withRouter(
	withFormik({
		mapPropsToValues({ password, confirmedPassword }) {
			return { password: password || '', confirmedPassword: confirmedPassword || '' };
		},
		async handleSubmit(values, { resetForm }) {
			try {
				await axios.post(`http://localhost:3333/user/reset/${token}`, values);
				message = 'Parola schimbata';

				resetForm();
			} catch (error) {
				console.log(error);
			}
		},
		validationSchema: resetSchema
	})(PasswordReset)
);
