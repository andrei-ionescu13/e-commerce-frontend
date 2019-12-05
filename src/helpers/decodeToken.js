import Cookie from 'js-cookie';
import jwt_decode from 'jwt-decode';

const decodeToken = token => {
	if (!token) return;
	return jwt_decode(token.split(' ')[1]);
};

export default decodeToken;
