import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsSection.css';
import {
	setProductsAndFiltersAsync,
	setProductsToEmpty,
	setFiltersToEmpty,
	setComparedProducts
} from '../../store/Actions/ProductsActions';
import Filters from './Filters/Filters';
import DisplayCriteria from './DisplayCriteria/DisplayCriteria';
import Spinner from '../Spinner/Spinner';
import Products from './Products/Products';
import {
	productsLoadingSelector,
	badKeywordSelector,
	comparedProductsSelector
} from '../../store/Selectors/ProductsSelector';
import queryString from 'query-string';
import Comparison from './Comparison/Comparison';

const NoProductsFound = <h1 className="noProducts-message">Nu s-a gasit niciun produs</h1>;

const ProductsSection = ({ location, match }) => {
	const badKeyword = useSelector(state => badKeywordSelector(state));
	const productsLoading = useSelector(state => productsLoadingSelector(state));
	const dispatch = useDispatch();
	const query = queryString.parse(location.search).query;

	useEffect(
		() => {
			let urlToCall = '';
			const str = location.pathname.split('/')[1];
			dispatch(setProductsToEmpty);
			dispatch(setFiltersToEmpty);
			switch (str) {
				case 'search':
					urlToCall = `http://localhost:3333/products/search/${query}`;
					break;

				case 'promotions':
					urlToCall = `http://localhost:3333/products/promotions`;
					break;
				default:
					urlToCall = `http://localhost:3333/category/${match.params.category}`;
					break;
			}

			dispatch(setProductsAndFiltersAsync(urlToCall));
			return function() {
				dispatch(setProductsToEmpty);
				dispatch(setFiltersToEmpty);
			};
		},
		[ query, match.params.category ]
	);

	return badKeyword ? (
		NoProductsFound
	) : (
		<div className="products-section">
			{productsLoading ? <Spinner /> : <Products />}
			<Filters />
			<DisplayCriteria />
			<Comparison />
		</div>
	);
};

export default ProductsSection;
