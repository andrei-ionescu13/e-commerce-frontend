import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { orderBySelector } from '../../../store/Selectors/ProductsSelector';
import { setOrderBy } from '../../../store/Actions/ProductsActions';
import queryString from 'query-string';

const OrderBy = () => {
	const dispatch = useDispatch();
	const orderBy = useSelector(state => orderBySelector(state));

	const history = useHistory();
	const location = useLocation();

	useEffect(
		() => {
			const orderBy = queryString.parse(location.search).orderBy || 'price-asc';
			dispatch(setOrderBy(orderBy));
		},
		[ location.search ]
	);

	const onChangeHandler = e => {
		const params = new URLSearchParams(location.search);
		const orderBy = e.target.value;
		params.set('orderBy', orderBy);
		params.delete('page');
		dispatch(setOrderBy(orderBy));
		history.push({
			search: params.toString()
		});
	};

	return (
		<div className="orderBy">
			<label>Sorteaza dupa: </label>
			<select value={orderBy} onChange={e => onChangeHandler(e)} name="orderBy">
				<option value="name">Nume</option>
				<option value="price-asc">Pret crescator</option>
				<option value="price-desc">Pret descrescator</option>
				<option value="discount">Cel mai mare discount</option>
				<option value="rating">Rating</option>
				<option value="reviews-number">Nr. review-uri</option>
			</select>
		</div>
	);
};

export default OrderBy;
