import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsSection.css';
import { setProductsAndFiltersAsync } from '../../store/Actions/ProductsActions';
import Filters from './Filters/Filters';
import DisplayCriteria from './DisplayCriteria/DisplayCriteria';
import Spinner from '../Spinner/Spinner';
import Products from './Products/Products';
import { productsLoadingSelector } from '../../store/Selectors/ProductsSelector';
import queryString from 'query-string';

const ProductsSection = ({ location, match, history }) => {
	const productsLoading = useSelector(state => productsLoadingSelector(state));
	const dispatch = useDispatch();
	useEffect(() => {
		const { p } = queryString.parse(location.search);
		console.log(p);
		console.log(match.params.categoryOrSearch);
		dispatch(setProductsAndFiltersAsync(`http://localhost:3333/${match.params.categoryOrSearch}`));
	}, []);
	return (
		<div className="products-section">
			{productsLoading ? <Spinner /> : <Products />}
			<Filters />
			<DisplayCriteria />
		</div>
	);
};

export default ProductsSection;
