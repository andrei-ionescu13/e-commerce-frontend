import React, { useState, useEffect } from 'react';
import './Products.css';
import { useSelector } from 'react-redux';
import { orderedProductsSelector, itemsPerPageSelector } from '../../../store/Selectors/ProductsSelector';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router-dom';
import Product from '../../Product/Product';
import queryString from 'query-string';
import _ from 'lodash';
import styled from 'styled-components';
import { Alert } from '../../../styles';

const StyledProducts = styled.div`
	grid-area: p;
	display: grid;
	justify-items: center;
	align-content: flex-start;
	min-height: 1764px;
	grid-template-columns: repeat(4, 1fr);
	grid-row-gap: 5rem;
	grid-column-gap: 4rem;

	> a {
		width: 20rem;
	}
`;

const Products = ({ history, location }) => {
	let products = useSelector(state => orderedProductsSelector(state));
	const [ productsShown, setProductsShown ] = useState([]);
	const itemsPerPage = useSelector(state => itemsPerPageSelector(state));
	const [ showAlert, setShowAlert ] = useState(false);

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
		<div className="products-container">
			<div className="products">{productsShown}</div>
			<ReactPaginate
				previousLabel={'Pagina anterioara'}
				nextLabel={'Pagina anterioara'}
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
			)
		</div>
	);
};

export default withRouter(Products);
