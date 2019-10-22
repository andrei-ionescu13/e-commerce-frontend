import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { comparedProductsSelector } from '../../../store/Selectors/ProductsSelector';
import { setComparedProducts, setShowComparison } from '../../../store/Actions/ProductsActions';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledComparedItem = styled.div`
	width: 4rem;
	height: 4rem;
	border: 1px solid lightgray;
	position: relative;

	img {
		max-width: 100%;
	}

	button {
		cursor: pointer;
		user-select: none;
		border: none;
		background-color: red;
		display: flex;
		justify-content: center;
		position: absolute;
		top: -.5rem;
		right: -.5rem;
		border-radius: 50%;
		height: 40%;
		width: 40%;
		line-height: 40%;
		padding-bottom: .2rem;
	}
`;

const ComparedItem = ({ _id, name, imageURL }) => {
	const comparedProducts = useSelector(state => comparedProductsSelector(state));

	const dispatch = useDispatch();

	const deleteOnClickHandler = () => {
		const products = comparedProducts.filter(x => x._id !== _id);
		dispatch(setComparedProducts(products));
		localStorage.setObject('compared-products', products);
	};

	useEffect(() => {
		const comparedProducts = localStorage.getObject('compared-products');
		console.log(comparedProducts, 'comparedProducts');
		if (comparedProducts) dispatch(setComparedProducts(comparedProducts));
	}, []);

	return _id ? (
		<StyledComparedItem>
			<button onClick={() => deleteOnClickHandler()}>x</button>
			<Link to={`/${name}`}>
				<img src={`http://localhost:3333/images/${imageURL}.jpg`} alt={imageURL} />
			</Link>
		</StyledComparedItem>
	) : (
		<div className="compare-item" />
	);
};

export default ComparedItem;
