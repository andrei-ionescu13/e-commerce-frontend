import * as types from '../types';
import axios from 'axios';

export const setProducts = category => async dispatch => {
	let products = [];
	try {
		const result = await axios.get(`http://localhost:3333/${category}`);
		console.log(result.data[0].products);
		dispatch({
			type: types.SET_PRODUCTS,
			payload: result.data[0].products
		});
	} catch (error) {
		console.log(products);
	}
};

export const setProductsToEmpty = () => ({
	type: types.SET_PRODUCTS_TO_EMPTY
});
