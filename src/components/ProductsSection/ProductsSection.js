import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsSection.css';
import {
	setProductsAndFiltersAsync,
	setActiveFilters,
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
import Compare from './Compare/Compare';

const NoProductsFound = <h1 className="noProducts-message">Nu s-a gasit niciun produs</h1>;

const ProductsSection = ({ location, match, history }) => {
	const badKeyword = useSelector(state => badKeywordSelector(state));
	const productsLoading = useSelector(state => productsLoadingSelector(state));
	const comparedProducts = useSelector(state => comparedProductsSelector(state));
	const dispatch = useDispatch();
	const keyword = queryString.parse(location.search).keyword;
	const [ showCompare, setShowCompare ] = useState(false);
	useEffect(
		() => {
			dispatch(setProductsToEmpty);
			dispatch(setFiltersToEmpty);
			if (location.pathname.includes('search')) {
				const keyword = queryString.parse(location.search).keyword;
				dispatch(setProductsAndFiltersAsync(`http://localhost:3333/search/${keyword}`));
			} else dispatch(setProductsAndFiltersAsync(`http://localhost:3333/${match.params.category}`));

			return function() {
				dispatch(setProductsToEmpty);
				dispatch(setFiltersToEmpty);
			};
		},
		[ keyword, match.params.category ]
	);

	useEffect(() => {
		const comparedProducts = localStorage.getObject('comparedProducts');
		if (comparedProducts) dispatch(setComparedProducts(comparedProducts));
	}, []);
	return badKeyword ? (
		NoProductsFound
	) : (
		<div className="products-section">
			{productsLoading ? <Spinner /> : <Products />}
			<Filters />
			<DisplayCriteria />
			{comparedProducts.length > 0 && <Compare />}
		</div>
	);
};

export default ProductsSection;
