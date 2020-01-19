import React, { useEffect } from 'react';
import { setActiveFilters } from '../../../store/Actions/ProductsActions';
import {
	filtersSelector,
	productsSelector,
	badKeywordSelector,
	productsLoadingSelector
} from '../../../store/Selectors/ProductsSelector';
import { useDispatch, useSelector } from 'react-redux';
import getByKey from '../../../helpers/getByKey';
import _ from 'lodash';
import queryString from 'query-string';
import Filter from './Filter';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledFilters = styled.div`
	border: 2px solid var(--primary-color);
	grid-area: f;
	min-height: 90vh;
	min-width: 25.2rem;

	@media (max-width: 700px) {
		display: ${(props) => !props.mobile && 'none'};
		border: ${(props) => props.mobile && 'none'};
	}
`;

const Filters = ({ mobile }) => {
	const productsLoading = useSelector((state) => productsLoadingSelector(state));
	const filters = useSelector((state) => filtersSelector(state));
	const products = useSelector((state) => productsSelector(state));
	const badKeyword = useSelector((state) => badKeywordSelector(state));

	const dispatch = useDispatch();
	const location = useLocation();

	let array = [];

	if (products.length > 0 && filters.length > 0 && !productsLoading) {
		let [ prices, ...otherFilters ] = filters;
		prices = prices.pret;
		filters.forEach((element) => array.push([]));

		for (let index = 0; index < products.length; index++) {
			const productPrice = products[index].discountedPrice || products[index].price;
			for (let i = 0; i < prices.length; i++) {
				if (i === 0 && productPrice < prices[0]) {
					array[0].push(`Sub ${prices[0]}`);
				} else if (productPrice > prices[i - 1] && productPrice <= prices[i]) {
					array[0].push(`${prices[i - 1]} - ${prices[i]}`);
				} else if (i === prices.length - 1 && productPrice > prices[i]) {
					array[0].push(`Peste ${prices[i]}`);
				}
			}

			for (let index2 = 0; index2 < otherFilters.length; index2++) {
				let value = getByKey(products[index], otherFilters[index2]);
				if (typeof value === 'undefined') continue;
				value = value.toString().trim();
				if (value.includes(',')) {
					value = value.split(',');
					value.forEach((x) => {
						array[index2 + 1].push(x.trim());
					});
				} else array[index2 + 1].push(value);
			}
		}
		array.forEach((x, index) => (array[index] = _.countBy(array[index], (x) => x.toString())));
	}

	useEffect(
		() => {
			if (filters.length > 0) {
				const activeFilters = queryString.parse(location.search);
				for (let [ key, value ] of Object.entries(activeFilters)) {
					if (!filters.includes(key) && key !== 'pret') {
						delete activeFilters[key];
					}
				}
				dispatch(setActiveFilters(activeFilters));
			}
		},
		[ location.search, filters ]
	);
	return (
		<StyledFilters mobile={mobile}>
			{array.map((x, index) => (
				<Filter
					key={index}
					filterName={typeof filters[index] === 'object' ? Object.keys(filters[index])[0] : filters[index]}
					filterValues={array[index]}
				/>
			))}
		</StyledFilters>
	);
};

export default Filters;
