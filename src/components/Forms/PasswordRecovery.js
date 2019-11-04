import React, { useEffect, useRef } from 'react';
import { withFormik } from 'formik';
import { recoverySchema } from '../../validation';
import { StyledContainer, StyledUserForm, FormResponses, FormError, FormMessage } from '../../styles';
import axios from 'axios';
import _ from 'lodash';

const PasswordRecovery = ({ values, handleChange, handleSubmit, errors, touched, isSubmitting, status }) => {
	const emailRef = useRef(null);
	const buttonRef = useRef(null);

	useEffect(() => {
		emailRef.current.focus();
	}, {});

	const handleKeyPress = e => {
		if (e.target.name === 'email' && e.key === 'Enter') buttonRef.current.focus();
	};
	return (
		<StyledContainer>
			<StyledUserForm method="post" className="login-form" onSubmit={handleSubmit}>
				<input
					ref={emailRef}
					name="email"
					type="text"
					placeholder="Email"
					value={values.email}
					onKeyPress={e => handleKeyPress(e)}
					onChange={handleChange}
				/>
				<button disabled={isSubmitting} type="submit" ref={buttonRef} className="login-button">
					Submit
				</button>
				<FormResponses>
					{errors.email && touched.email && <FormError>{errors.email} </FormError>}
					{errors.reqErrors && <FormError>{errors.reqErrors.error || errors.reqErrors}</FormError>}
					{_.isEmpty(errors) && status && <FormMessage>{status.succes}</FormMessage>}
				</FormResponses>
			</StyledUserForm>
		</StyledContainer>
	);
};

export default withFormik({
	mapPropsToValues({ email }) {
		return { email: email || '' };
	},
	async handleSubmit(values, { resetForm, setErrors, setStatus, setSubmitting }) {
		try {
			setStatus(null);
			console.log(values);
			await axios.post('http://localhost:3333/user/recovery', values);
			resetForm();
			setStatus({ succes: 'Un e-mail de resetare a fost trimis' });
		} catch (error) {
			setErrors({ reqErrors: error.response.data.error });

			console.log(error.response.data);
		} finally {
			setSubmitting(false);
		}
	},
	validationSchema: recoverySchema,
	validateOnChange: false
})(PasswordRecovery);
