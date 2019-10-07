import React from 'react';
import './CompareItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { comparedProductsSelector } from '../../../../store/Selectors/ProductsSelector';
import { setComparedProducts } from '../../../../store/Actions/ProductsActions';

const CompareItem = ({ product }) => {
	const comparedProducts = useSelector(state => comparedProductsSelector(state));
	const dispatch = useDispatch();

	const deleteOnClickHandler = () => {
		const products = comparedProducts.filter(x => x._id !== product._id);
		dispatch(setComparedProducts(products));
		localStorage.setObject('comparedProducts', products);
	};

	return product ? (
		<div className="compare-item">
			<button className="delete-compare-item-btn" onClick={() => deleteOnClickHandler()}>
				x
			</button>
			<img src={`http://localhost:3333/images/${product.imagesURL[0]}.jpg`} alt="" />
		</div>
	) : (
		<div className="compare-item" />
	);
};

export default CompareItem;
