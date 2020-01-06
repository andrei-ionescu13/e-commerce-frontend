import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import { recoverySchema } from '../../validation';
import { StyledContainer, StyledUserForm, FormResponses, FormError, FormMessage } from '../../styles';
import axios from 'axios';
import _ from 'lodash';

const PasswordRecovery = ({ email }) => {
	const emailRef = useRef(null);

	useEffect(() => {
		emailRef.current.focus();
	}, {});

	return (
		<StyledContainer>
			<Formik
				initialValues={{ email: email || '' }}
				validationSchema={recoverySchema}
				validateOnChange={false}
				onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
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
				}}
			>
				{({ values, handleChange, handleSubmit, errors, touched, isSubmitting, status }) => (
					<StyledUserForm method="post" onSubmit={handleSubmit}>
						<input
							ref={emailRef}
							name="email"
							type="text"
							placeholder="Email"
							value={values.email}
							onChange={handleChange}
						/>
						<button disabled={isSubmitting} type="submit" className="login-button">
							Submit
						</button>
						<FormResponses>
							{errors.email && touched.email && <FormError>{errors.email} </FormError>}
							{errors.reqErrors && <FormError>{errors.reqErrors.error || errors.reqErrors}</FormError>}
							{_.isEmpty(errors) && status && <FormMessage>{status.succes}</FormMessage>}
						</FormResponses>
					</StyledUserForm>
				)}
			</Formik>
		</StyledContainer>
	);
};

export default PasswordRecovery;
