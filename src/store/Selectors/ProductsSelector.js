import { createSelector } from 'reselect';

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
	console.log(orderBy);
	switch (orderBy) {
		case 'most-popular':
			break;

		case 'name':
			return [ ...products.sort((a, b) => (a.name < b.name ? -1 : 1)) ];

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
