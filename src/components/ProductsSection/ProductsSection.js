import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductsAndFiltersAsync, setProductsToEmpty, setFiltersToEmpty } from '../../store/Actions/ProductsActions';
import Filters from './Filters/Filters';
import DisplayCriteria from './DisplayCriteria/DisplayCriteria';
import Spinner from '../Spinner/Spinner';
import Products from './Products';
import { productsLoadingSelector, badKeywordSelector } from '../../store/Selectors/ProductsSelector';
import queryString from 'query-string';
import Comparison from './Comparison/Comparison';
import styled from 'styled-components';

const StyledProductsSection = styled.div`
	width: var(--primary-width);
	margin: auto;
	margin-top: 1em;
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-areas: "f d" "f p";

	@media (max-width: 700px) {
		display: block;
	}
`;

const NoProductsFoundMessage = styled.h1`
	font-size: 2rem;
	text-align: center;
	border: 1px solid black;
	width: 30%;
	margin: auto;
	margin-top: 5rem;
	padding: 1rem;
`;

const FlexContainer = styled.div`
	padding: 2rem;
	width: var(--primary-width);
	margin: auto;
	margin-top: 1em;
	display: none;
	justify-content: center;
	button {
		height: 3rem;
		width: 100%;
		margin: 1rem;
	}
	@media (max-width: 700px) {
		display: flex;
	}
`;

const NoProductsFound = <NoProductsFoundMessage>Nu s-a gasit niciun produs</NoProductsFoundMessage>;

const ProductsSection = ({ location, match }) => {
	const badKeyword = useSelector(state => badKeywordSelector(state));
	const productsLoading = useSelector(state => productsLoadingSelector(state));
	const dispatch = useDispatch();
	const query = queryString.parse(location.search).query;

	useEffect(
		() => {
			let urlToCall = '';
			const str = location.pathname.split('/')[1];
			dispatch(setProductsToEmpty);
			dispatch(setFiltersToEmpty);
			switch (str) {
				case 'search':
					urlToCall = `http://localhost:3333/products/search/${query}`;
					break;

				case 'promotions':
					urlToCall = `http://localhost:3333/products/promotions`;
					break;
				default:
					urlToCall = `http://localhost:3333/category/${match.params.category}`;
					break;
			}

			dispatch(setProductsAndFiltersAsync(urlToCall));
			return function() {
				dispatch(setProductsToEmpty);
				dispatch(setFiltersToEmpty);
			};
		},
		[ query, match.params.category ]
	);

	return badKeyword ? (
		NoProductsFound
	) : (
		<React.Fragment>
			<FlexContainer>
				<button>Filtreaza</button>
				<button>Arata</button>
			</FlexContainer>
			<StyledProductsSection>
				{productsLoading ? <Spinner /> : <Products />}
				<Filters />
				<DisplayCriteria />
				<Comparison />
			</StyledProductsSection>
		</React.Fragment>
	);
};

export default ProductsSection;
