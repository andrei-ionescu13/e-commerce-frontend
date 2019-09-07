import * as types from '../types';

const initialState = {
	showAs: 'table',
	itemsPerPage: 8,
	orderBy: 'price-asc',
	products: [],
	filters: [],
	badKeyword: false,
	productsLoading: false
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SET_PRODUCTS:
			return {
				...state,
				products: payload
			};

		case types.SET_FILTERS:
			return {
				...state,
				filters: payload
			};

		case types.SET_PRODUCTS_TO_EMPTY:
			return {
				...state,
				products: []
			};
		case types.SET_ORDER_BY:
			return {
				...state,
				orderBy: payload
			};
		case types.SET_SHOW_AS: {
			return {
				...state,
				showAs: payload
			};
		}
		case types.SET_ITEMS_PER_PAGE: {
			return {
				...state,
				itemsPerPage: payload
			};
		}
		case types.SET_BAD_KEYWORD:
			return {
				...state,
				badKeyword: payload
			};

		case types.SET_PRODUCTS_LOADING: {
			return {
				...state,
				productsLoading: payload
			};
		}
		default:
			return state;
	}
};

export default reducer;
