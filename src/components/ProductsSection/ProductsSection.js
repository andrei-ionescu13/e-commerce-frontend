import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import './ProductsSection.css';
import { setProducts } from '../../store/Actions/ProductsActions';
import Filters from './Filters/Filters';
import OrderBy from './OrderBy/OrderBy';
import Spinner from '../Spinner/Spinner';
const Products = lazy(() => import('./Products/Products'));

const ProductsSection = ({ match }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setProducts(match.params.category));
	}, []);
	return (
		<div className="products-section">
			<Suspense fallback={<Spinner />}>
				<Products />
			</Suspense>

			<Filters />
			<OrderBy />
		</div>
	);
};

export default ProductsSection;
