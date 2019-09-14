import { createSelector } from 'reselect';
import getByKey from '../../helpers/getByKey';
export const productsSelector = state => {
	const products = [ ...state.products.products ];
	return products;
};
export const filteredProductsSelector = state => state.products.filteredProducts;
export const itemsPerPageSelector = state => state.products.itemsPerPage;
export const orderBySelector = state => state.products.orderBy;
export const showAsSelector = state => state.products.showAs;
export const filtersSelector = state => state.products.filters;
export const badKeywordSelector = state => state.products.badKeyword;
export const productsLoadingSelector = state => state.products.productsLoading;

export const orderedProductsSelector = createSelector(productsSelector, orderBySelector, (products, orderBy) => {
	const fff = {
		brand: [ 'TOSHIBA' ],
		'Capacitate (GB)': [ '1000' ]
	};
	switch (orderBy) {
		case 'most-popular':
			break;

		case 'name':
			return [
				...products.sort((a, b) => (a.name < b.name ? -1 : 1)).filter(x => {
					console.log('loooog', getByKey(x, 'Capacitate (GB)'));
					for (let [ key, value ] of Object.entries(fff)) {
						if (value.includes(getByKey(x, key).toString().toUpperCase())) return true;
					}
					return false;
				})
			];

		case 'price-asc':
			return [ ...products.sort((a, b) => (a.price < b.price ? -1 : 1)) ];

		case 'price-desc':
			const array = [ ...products ];
			return array.sort((a, b) => (a.price < b.price ? 1 : -1));

		case 'discount':
			break;

		default:
			break;
	}
});
