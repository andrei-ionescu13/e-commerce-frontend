import React, { useState, useEffect } from 'react';
import './Products.css';
import { useSelector } from 'react-redux';
import {
	orderedProductsSelector,
	itemsPerPageSelector,
	badKeywordSelector
} from '../../../store/Selectors/ProductsSelector';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router-dom';
import Product from '../../Product/Product';
import queryString from 'query-string';
import _ from 'lodash';

const Products = ({ history, match, location }) => {
	let products = useSelector(state => orderedProductsSelector(state));

	const [ productsShown, setProductsShown ] = useState([]);
	const itemsPerPage = useSelector(state => itemsPerPageSelector(state));
	const badKeyword = useSelector(state => badKeywordSelector(state));
	const [ actualPage, setActualPage ] = useState(queryString.parse(location.search).p || 1);

	// useEffect(
	// 	() => {
	// 		setActualPage(parseInt(queryString.parse(location.search).p) || 1);
	// 	},
	// 	[ location ]
	// );
	useEffect(
		() => {
			const page = parseInt(queryString.parse(location.search).page) || 1;
			if (products.length > 0) {
				products = products.map(x => (
					<Product
						// id={x._id}
						key={x._id}
						// name={x.name}
						// price={x.price}
						// discountedPrice={x.discountedPrice}
						// imageURL={'http://localhost:3333/images/' + x.imagesURL[0] + '.jpg'}
						product={x}
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

	const onPageChangeHanler = e => {
		// history.push((e.selected + 1).toString());
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
			<React.Fragment>
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
					onPageChange={e => onPageChangeHanler(e)}
					containerClassName={'pagination'}
					pageLinkClassName={'page'}
					activeLinkClassName={'active'}
					// pageLinkClassName={'pages'}
					// activeClassName={'active'}
				/>
			</React.Fragment>
			)
		</div>
	);
};

export default withRouter(Products);
