import React from 'react';
import './Compare.css';
import { ReactComponent as CheckedIcon } from '../../../assets/icons/checked.svg';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { comparedProductsSelector } from '../../../store/Selectors/ProductsSelector';
import CompareItem from './CompareItem/CompareItem';
const Compare = ({ history }) => {
	const comparedProducts = useSelector(state => comparedProductsSelector(state));
	const comparedProductsRendered = [];
	comparedProducts.forEach(x => {
		comparedProductsRendered.push(<CompareItem product={x} />);
	});
	for (let index = 0; index < 4 - comparedProducts.length; index++) {
		comparedProductsRendered.push(<CompareItem key={index} />);
	}

	const compareOnClickHandler = () => history.push('/compare');

	return (
		<div className="compare">
			{comparedProductsRendered}
			<button className="compare-button">
				<CheckedIcon className="compare-icon" onClick={() => compareOnClickHandler()} />
			</button>
		</div>
	);
};

export default withRouter(Compare);
