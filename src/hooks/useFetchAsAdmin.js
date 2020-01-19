import { useState, useEffect } from 'react';
import axios from 'axios';
import useIsAuthenticated from './useIsAuthenticated';

const useFetchAsAdmin = url => {
	const [ data, setData ] = useState();
	const [ loading, setLoading ] = useState(true);
	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const fetchData = async () => {
		if (!isAuthenticated || !isAdmin) {
			redirectToLogin();
		}
		try {
			setLoading(true);
			const headers = { Authorization: token };
			const response = await axios.get(url, { headers: headers });
			setData(response.data);
			setLoading(false);
		} catch (error) {
			if (error.response.status === 401) {
				redirectToLogin();
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return [ data, loading ];
};

export default useFetchAsAdmin;
