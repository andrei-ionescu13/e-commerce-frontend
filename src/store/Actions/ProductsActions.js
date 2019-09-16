import * as types from '../types';
import axios from 'axios';

export const setProductsAndFiltersAsync = url => async dispatch => {
	dispatch(setProductsLoading(true));
	let products = [];
	try {
		const result = await axios.get(url);
		if (result.data.products.length === 0) {
			dispatch(setBadKeyword(true));
			dispatch(setProductsToEmpty());
		} else {
			dispatch(setBadKeyword(false));

			dispatch(setProducts(result.data.products));
			dispatch(setFilters(result.data.filters));
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
