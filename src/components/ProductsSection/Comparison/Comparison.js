import React, { useEffect } from 'react';
import './Comparison.css';
import { ReactComponent as CheckedIcon } from '../../../assets/icons/checked.svg';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { comparedProductsSelector } from '../../../store/Selectors/ProductsSelector';
import { setComparedProducts } from '../../../store/Actions/ProductsActions';
import ComparedItem from './ComparedItem';

const Comparison = () => {
	const comparedProducts = useSelector(state => comparedProductsSelector(state));
	const comparedProductsRendered = [];

	const history = useHistory();
	const dispatch = useDispatch();

	comparedProducts.forEach(x => {
		comparedProductsRendered.push(<ComparedItem key={x._id} name={x.name} _id={x._id} imageURL={x.imageURL} />);
	});
	for (let index = 0; index < 4 - comparedProducts.length; index++) {
		comparedProductsRendered.push(<ComparedItem key={index} />);
	}

	const compareOnClickHandler = () => history.push('/compare');

	useEffect(() => {
		const comparedProducts = localStorage.getObject('compared-products');
		if (comparedProducts) dispatch(setComparedProducts(comparedProducts));
	}, []);

	return (
		comparedProducts.length > 0 && (
			<div className="compare">
				{comparedProductsRendered}
				<button className="compare-button">
					<CheckedIcon className="compare-icon" onClick={() => compareOnClickHandler()} />
				</button>
			</div>
		)
	);
};

export default Comparison;
