import * as types from '../types';

const initialState = {
	showAs: 'table',
	itemsPerPage: 8,
	orderBy: 'price-asc',
	products: [],
	filteredProducts: [],
	filters: []
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SET_PRODUCTS:
			return {
				...state,
				products: payload
			};
		case types.SET_PRODUCTS_TO_EMPTY:
			return {
				...state,
				products: []
			};
		default:
			return state;
	}
};

export default reducer;
