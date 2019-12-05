import * as types from '../types';

const initialState = {
	showAs: 'table',
	itemsPerPage: 8,
	orderBy: 'price-asc',
	products: [],
	product: {},
	filters: [],
	activeFilters: {},
	badKeyword: false,
	productsLoading: false,
	comparedProducts: [],
	showComparison: false,
	isLogged: null,
	alert: {
		show: false,
		message: '',
		type: null
	}
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SET_PRODUCTS:
			return {
				...state,
				products: payload
			};

		case types.SET_PRODUCT:
			return {
				...state,
				product: payload
			};
		case types.SET_FILTERS:
			return {
				...state,
				filters: payload
			};

		case types.SET_ACTIVE_FILTERS:
			return {
				...state,
				activeFilters: payload
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
		case types.SET_FILTERS_TO_EMPTY: {
			return {
				...state,
				filters: [],
				activeFilters: {}
			};
		}
		case types.SET_COMPARED_PRODUCTS: {
			return {
				...state,
				comparedProducts: payload
			};
		}
		case types.SET_IS_LOGGED: {
			return {
				...state,
				isLogged: payload
			};
		}
		case types.SET_ALERT: {
			return {
				...state,
				alert: payload
			};
		}
		default:
			return state;
	}
};

export default reducer;
