import React, { useState } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../store/Actions/ProductsActions';

const verifyAuthentication = () => {
	const token = Cookies.get('Authorization');
	if (!token) return false;
	const { exp } = jwt_decode(token.split(' ')[1]);
	if (Date.now() >= exp * 1000) {
		return false;
	}
	return true;
};

const useIsAuthenticated = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const token = Cookies.get('Authorization');

	const isAdmin = verifyAuthentication() ? jwt_decode(token.split(' ')[1]).admin : false;

	const isAuthenticated = verifyAuthentication();

	const redirectToLogin = () => {
		Cookies.remove('Authorization');
		dispatch(setIsLogged(false));
		history.push('/login');
	};

	return [ isAuthenticated, token, redirectToLogin, isAdmin ];
};

export default useIsAuthenticated;
