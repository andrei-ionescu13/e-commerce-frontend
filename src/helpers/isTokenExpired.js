import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

const isTokenExpired = tokenName => {
	const token = Cookie.get(tokenName);
	if (!token) return true;
	const { exp } = jwt_decode(token.split(' ')[1]);
	if (Date.now() >= exp * 1000) {
		return true;
	}
	return false;
};

export default isTokenExpired;
