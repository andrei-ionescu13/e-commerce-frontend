import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = url => {
	const [ data, setData ] = useState();
	const [ loading, setLoading ] = useState(true);

	const fetchData = async () => {
		try {
			setLoading(true);
			const result = await axios.get(url);
			setData(result.data);
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
