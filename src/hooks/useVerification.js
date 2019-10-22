import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const useVerification = tokenName => {
	const getToken = () => {
		return Cookies.get(tokenName);
	};

	const isExpired = () => {
		const token = getToken(tokenName);
		if (!token) return true;
		const { exp } = jwt_decode(token.split(' ')[1]);
		console.log(Date.now(), exp * 1000);
		if (Date.now() >= exp * 1000) {
			return true;
		}
		return false;
	};

	const setToken = token => {
		Cookies.set(tokenName, `Bearer ${token}`);
	};

	const deleteToken = () => {
		Cookies.remove(tokenName);
	};

	return { getToken, isExpired };
};

export default useVerification;
