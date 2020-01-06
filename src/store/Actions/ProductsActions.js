import * as types from '../types';
import axios from 'axios';

export const setProductsAndFiltersAsync = url => async dispatch => {
	dispatch(setProductsLoading(true));
	try {
		const result = await axios.get(url);
		const products = result.data.products;
		const filters = result.data.filters;
		console.log(result);
		if (products.length === 0) {
			dispatch(setBadKeyword(true));
			dispatch(setProductsToEmpty());
		} else {
			dispatch(setBadKeyword(false));
			dispatch(setProducts(products));
			dispatch(setFilters(filters));
			dispatch(setProductsLoading(false));
		}
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(setProductsLoading(false));
	}
};

export const setFilters = filters => ({
	type: types.SET_FILTERS,
	payload: filters
});

export const setActiveFilters = activeFilters => ({
	type: types.SET_ACTIVE_FILTERS,
	payload: activeFilters
});

export const setProducts = products => ({
	type: types.SET_PRODUCTS,
	payload: products
});

export const setProductsToEmpty = () => ({
	type: types.SET_PRODUCTS_TO_EMPTY
});

export const setProduct = product => ({
	type: types.SET_PRODUCT,
	payload: product
});
export const setOrderBy = orderBy => ({
	type: types.SET_ORDER_BY,
	payload: orderBy
});

export const setShowAs = showAs => ({
	type: types.SET_SHOW_AS,
	payload: showAs
});

export const setItemsPerPage = itemsPerPage => ({
	type: types.SET_ITEMS_PER_PAGE,
	payload: itemsPerPage
});

export const setBadKeyword = badKeyword => ({
	type: types.SET_BAD_KEYWORD,
	payload: badKeyword
});

export const setProductsLoading = isLoading => ({
	type: types.SET_PRODUCTS_LOADING,
	payload: isLoading
});

export const setFiltersToEmpty = () => ({
	type: types.SET_FILTERS_TO_EMPTY
});

export const setComparedProducts = products => ({
	type: types.SET_COMPARED_PRODUCTS,
	payload: products
});

export const setIsLogged = isLogged => ({
	type: types.SET_IS_LOGGED,
	payload: isLogged
});

export const setAlert = alert => ({
	type: types.SET_ALERT,
	payload: alert
});

export const setCart = cart => ({
	type: types.SET_CART,
	payload: cart
});

export const setCartAsync = (url, config) => async dispatch => {
	const response = await axios.get(url, config);
	const { _id, ...cart } = response.data;
	dispatch(setCart({ ...cart, set: true }));
};
