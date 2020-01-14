import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, config) => {
	const [ data, setData ] = useState();
	const [ loading, setLoading ] = useState(true);

	const fetchData = async () => {
		try {
			setLoading(true);
			const response = await axios.get(url, config);
			setData(response.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return [ data, loading ];
};

export default useFetch;
