import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CompareIcon } from '../../assets/icons/compare.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setComparedProducts, setAlert } from '../../store/Actions/ProductsActions';
import { alertSelector } from '../../store/Selectors/ProductsSelector';

const StyledCompareButton = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	background: transparent;
	border: none;

	svg {
		width: 1rem;
	}

	div {
		margin-left: .4rem;
		font-size: 1.3rem;
	}

	&:hover {
		color: var(--primary-color);
		fill: var(--primary-color);
	}
`;

const CompareButton = ({ _id, category, imageURL, name }) => {
	const dispatch = useDispatch();

	const alert = useSelector(state => alertSelector(state));

	const handleOnClick = () => {
		const comparedProducts = [];
		const comparedProductsInStorage = localStorage.getObject('compared-products');

		if (comparedProductsInStorage && comparedProductsInStorage.length > 0) {
			if (comparedProductsInStorage[0].category !== category) {
				dispatch(
					setAlert({
						show: true,
						message: 'Produsele comparate trebuie sa fie din aceeasi categorie',
						type: 'error'
					})
				);

				setTimeout(() => {
					dispatch(
						setAlert({
							show: false,
							message: '',
							type: null
						})
					);
				}, 3000);
				return;
			}
			if (comparedProductsInStorage.length >= 4) {
				dispatch(
					setAlert({
						show: true,
						message: 'Puteti compara maximum 4 produse',
						type: 'error'
					})
				);

				setTimeout(() => {
					dispatch(
						setAlert({
							show: false,
							message: '',
							type: null
						})
					);
				}, 3000);
				return;
			}
			comparedProductsInStorage.forEach(x => {
				if (x._id === _id) {
					return;
				}
				comparedProducts.push(x);
			});
		}

		comparedProducts.push({ _id, name, category, imageURL });
		if (comparedProducts.length > 0) dispatch(setComparedProducts(comparedProducts));

		localStorage.setObject('compared-products', comparedProducts);
	};

	return (
		<StyledCompareButton disabled={alert.show} onClick={() => handleOnClick()}>
			<CompareIcon />
			<div>Compara</div>
		</StyledCompareButton>
	);
};

export default CompareButton;
