import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { orderedProductsSelector, itemsPerPageSelector } from '../../store/Selectors/ProductsSelector';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router-dom';
import Product from '../Product/Product';
import queryString from 'query-string';
import _ from 'lodash';
import styled from 'styled-components';
import useWindowDimensions from '../../hooks/useWindowSize';

const Wrapper = styled.div`
	.pagination {
		margin: auto 9rem auto 0;
		display: flex;
		list-style-type: none;
		justify-content: center;
		align-content: center;

		@media (max-width: 1050px) {
			font-size: 1.3rem;
		}
	}

	.page,
	.previous-page,
	.next-page {
		user-select: none;
		color: var(--primary-color);
		cursor: pointer;
		border: 1.5px solid var(--primary-color);
		padding: .4rem 1.5rem;
		margin: 0 .2rem;
		outline: none;
	}
	.page:hover,
	.previous-page:hover,
	.next-page:hover,
	.page:focus {
		background-color: var(--primary-color);
		color: black;
	}

	.active {
		background-color: var(--primary-color);
		color: black;
	}

	.break-me {
		cursor: pointer;
		color: var(--primary-color);
	}
`;

const StyledProducts = styled.div`
	grid-area: p;
	display: grid;
	justify-items: center;
	align-content: flex-start;
	min-height: 1764px;
	grid-gap: 2rem;
	grid-template-columns: repeat(4, 1fr);

	> div {
		width: 85%;
	}

	@media (max-width: 1200px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 1050px) {
		grid-template-columns: repeat(2, 1fr);
	}
`;

const Products = () => {
	const { width } = useWindowDimensions();
	let products = useSelector(state => orderedProductsSelector(state));
	const [ productsShown, setProductsShown ] = useState([]);
	const itemsPerPage = useSelector(state => itemsPerPageSelector(state));

	const history = useHistory();
	const location = useLocation();

	useEffect(
		() => {
			const page = parseInt(queryString.parse(location.search).page) || 1;
			if (products.length > 0) {
				products = products.map(x => (
					<Product
						key={x._id}
						_id={x._id}
						name={x.name}
						price={x.price}
						discountedPrice={x.discountedPrice}
						category={x.category}
						imagesURL={x.imagesURL}
						reviews={x.reviews}
					/>
				));
				setProductsShown(products.slice((page - 1) * itemsPerPage, page * itemsPerPage));
			}
		},
		[ products, location.search, itemsPerPage ]
	);

	useEffect(
		() => {
			const page = parseInt(queryString.parse(location.search).page) || 1;

			if (!(page > 0) || (page > Math.ceil(products.length / itemsPerPage) && products.length > 0)) {
				history.push({
					search: ``
				});
			}
		},
		[ products, location.search ]
	);

	const onPageChangeHandler = e => {
		const params = new URLSearchParams(location.search);

		if (e.selected == 0) {
			params.delete('page');

			history.push({
				search: params.toString()
			});
		} else {
			params.set('page', `${e.selected + 1}`);
			history.push({
				search: params.toString()
			});
		}
		window.scrollTo(0, 0);
	};

	return (
		<Wrapper>
			<StyledProducts>{productsShown}</StyledProducts>
			<ReactPaginate
				previousLabel={width < 1050 ? '<' : 'Pagina anterioare'}
				nextLabel={width < 1050 ? '>' : 'Pagina urmatoare'}
				previousLinkClassName={'previous-page'}
				forcePage={parseInt(queryString.parse(location.search).page) - 1 || 0}
				disableInitialCallback={true}
				nextLinkClassName={'next-page'}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={Math.ceil(products.length / itemsPerPage)}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={e => onPageChangeHandler(e)}
				containerClassName={'pagination'}
				pageLinkClassName={'page'}
				activeLinkClassName={'active'}
			/>
		</Wrapper>
	);
};

export default Products;
