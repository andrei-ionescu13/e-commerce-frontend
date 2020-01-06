import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { itemsPerPageSelector } from '../../../../store/Selectors/ProductsSelector';
import { setItemsPerPage } from '../../../../store/Actions/ProductsActions';
import './Show.css';

const Show = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const itemsPerPage = useSelector(state => itemsPerPageSelector(state));

	const onChangeHandler = e => {
		dispatch(setItemsPerPage(e.target.value));
		const params = new URLSearchParams(location.search);
		params.delete('page');
		history.push({
			search: params.toString()
		});
	};

	return (
		<div className="show">
			<label>Arata: </label>
			<select value={itemsPerPage} onChange={e => onChangeHandler(e)} name="show">
				<option value="4">4</option>
				<option value="8">8</option>
				<option value="16">16</option>
			</select>
		</div>
	);
};

export default Show;
