import React, { useEffect } from 'react';
import { ReactComponent as CheckedIcon } from '../../../assets/icons/checked.svg';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { comparedProductsSelector } from '../../../store/Selectors/ProductsSelector';
import { setComparedProducts } from '../../../store/Actions/ProductsActions';
import ComparedItem from './ComparedItem';
import styled from 'styled-components';

const StyledComparison = styled.div`
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	border: 1px solid lightgray;
	padding: .5rem;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	align-items: center;
	height: 22rem;
	cursor: pointer;
	background: white;
`;

const StyledItem = styled.div`
	width: 4rem;
	height: 4rem;
	border: 1px solid lightgray;
	position: relative;
`;

const DeleteButton = styled.div`
	border: none;
	width: 4rem;
	margin: .5rem 0;
	background-color: var(--primary-color);
	cursor: pointer;
`;

const CompareButton = styled.button`
	border: none;
	width: 4rem;
	margin: .5rem 0;
	background-color: var(--primary-color);
	cursor: pointer;
`;

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
			<StyledComparison>
				{comparedProductsRendered}
				<CompareButton>
					<CheckedIcon width="60%" onClick={() => compareOnClickHandler()} />
				</CompareButton>
			</StyledComparison>
		)
	);
};

export default Comparison;
