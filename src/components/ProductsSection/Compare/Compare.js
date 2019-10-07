import React from 'react';
import './Compare.css';
import { useSelector } from 'react-redux';
import { comparedProductsSelector } from '../../../store/Selectors/ProductsSelector';
import CompareItem from './CompareItem/CompareItem';
const Compare = () => {
	const comparedProducts = useSelector(state => comparedProductsSelector(state));
	const comparedProductsRendered = [];
	comparedProducts.forEach(x => {
		comparedProductsRendered.push(<CompareItem product={x} />);
	});
	for (let index = 0; index < 4 - comparedProducts.length; index++) {
		comparedProductsRendered.push(<CompareItem />);
	}
	return (
		<div
			className="compare"
			onClick={() => {
				console.log('apasat');
			}}
		>
			{comparedProductsRendered}
		</div>
	);
};

export default Compare;
