import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { orderBySelector } from '../../../../store/Selectors/ProductsSelector';
import { setOrderBy } from '../../../../store/Actions/ProductsActions';
import './OrderBy.css';

const OrderBy = ({ history }) => {
	const dispatch = useDispatch();
	const orderBy = useSelector(state => orderBySelector(state));
	const onChangeHandler = e => {
		dispatch(setOrderBy(e.target.value));
		history.push('1');
	};

	return (
		<div className="orderBy">
			<label>Sorteaza dupa: </label>
			<select value={orderBy} onChange={e => onChangeHandler(e)} name="orderBy">
				<option value="name">Nume</option>
				<option value="price-asc">Pret crescator</option>
				<option value="price-desc">Pret descrescator</option>
				<option value="discount">Cel mai mare discount</option>
			</select>
		</div>
	);
};

export default withRouter(OrderBy);
