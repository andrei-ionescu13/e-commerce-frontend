import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAsSelector } from '../../../store/Selectors/ProductsSelector';
import { setShowAs } from '../../../store/Actions/ProductsActions';

const ShowAs = () => {
	const dispatch = useDispatch();
	const showAs = useSelector(state => showAsSelector(state));
	const onChangeHandler = e => {
		dispatch(setShowAs(e.target.value));
	};
	return (
		<div className="showAs">
			<label>Vezi: </label>
			<select value={showAs} onChange={e => onChangeHandler(e)} name="showAs">
				<option value="table">Tabel</option>
				<option value="list">Lista</option>
			</select>
		</div>
	);
};

export default ShowAs;
