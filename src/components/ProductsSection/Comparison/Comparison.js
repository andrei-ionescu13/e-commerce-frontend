import React from 'react';
import './Comparison.css';
import { ReactComponent as CheckedIcon } from '../../../assets/icons/checked.svg';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { comparedProductsSelector } from '../../../store/Selectors/ProductsSelector';
import ComparedItem from './ComparedItem';

const Comparison = ({ history }) => {
	const comparedProducts = useSelector(state => comparedProductsSelector(state));
	const comparedProductsRendered = [];
	comparedProducts.forEach(x => {
		comparedProductsRendered.push(<ComparedItem key={x._id} name={x.name} _id={x._id} imageURL={x.imageURL} />);
	});
	for (let index = 0; index < 4 - comparedProducts.length; index++) {
		comparedProductsRendered.push(<ComparedItem key={index} />);
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

export default withRouter(Comparison);
