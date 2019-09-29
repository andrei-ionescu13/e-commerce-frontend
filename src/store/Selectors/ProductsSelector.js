import { createSelector } from 'reselect';
import getByKey from '../../helpers/getByKey';
import getPercentage from '../../helpers/getPercentage';
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
export const activeFiltersSelector = state => state.products.activeFilters;

export const orderedProductsSelector = createSelector(
	productsSelector,
	orderBySelector,
	activeFiltersSelector,
	(products, orderBy, activeFilters) => {
		const filteredProducts = products.filter(x => {
			let returnProduct = false;
			if (Object.entries(activeFilters).length === 0) returnProduct = true;
			for (let [ key, value ] of Object.entries(activeFilters)) {
				if (key === 'pret') {
					const productPrice = x.discountedPrice || x.price;
					console.log('productPrice', productPrice);
					if (Array.isArray(activeFilters[key])) {
						activeFilters[key].forEach(element => {
							if (element.includes('Sub ') && productPrice < parseFloat(element.replace('Sub  ', '')))
								returnProduct = true;

							if (
								element.includes(' - ') &&
								productPrice > parseFloat(element.split(' - ')[0]) &&
								productPrice <= parseFloat(element.split(' - ')[1])
							) {
								returnProduct = true;
							}

							if (element.includes('Peste ') && productPrice > parseFloat(element.replace('Peste ', '')))
								returnProduct = true;
						});
					} else {
						if (
							activeFilters[key].includes('Sub ') &&
							productPrice < parseFloat(activeFilters[key].replace('Sub ', ''))
						)
							returnProduct = true;

						if (
							activeFilters[key].includes(' - ') &&
							productPrice > parseFloat(activeFilters[key].split(' - ')[0]) &&
							productPrice <= parseFloat(activeFilters[key].split(' - ')[1])
						)
							returnProduct = true;

						if (
							activeFilters[key].includes('Peste ') &&
							productPrice > parseFloat(activeFilters[key].replace('Peste ', ''))
						)
							returnProduct = true;
					}
				} else if (value.includes(getByKey(x, key).toString())) returnProduct = true;
			}
			return returnProduct;
		});

		switch (orderBy) {
			case 'most-popular':
				break;

			case 'name':
				return filteredProducts.sort((a, b) => (a.name < b.name ? -1 : 1));

			case 'price-asc':
				return filteredProducts.sort((a, b) => (a.price < b.price ? -1 : 1));

			case 'price-desc':
				return filteredProducts.sort((a, b) => (a.price < b.price ? 1 : -1));

			case 'discount':
				return filteredProducts
					.filter(x => x.discountedPrice)
					.sort((a, b) => {
						return 100 - getPercentage(a.discountedPrice, a.price) >
						100 - getPercentage(b.discountedPrice, b.price)
							? -1
							: 1;
					})
					.concat(filteredProducts.filter(x => !x.discountedPrice));

			default:
				break;
		}
	}
);
