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

const NoProductsFound = <h1 className="noProducts-message">Nu s-a gasit niciun produs</h1>;

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
			if (products.length > 0) {
				products = products.map(x => (
					<Product
						key={x._id}
						name={x.name}
						price={x.price}
						imageURL={'http://localhost:3333/images/' + x.imagesURL[0] + '.jpg'}
					/>
				));
				setProductsShown(
					products.slice(
						(parseInt(queryString.parse(location.search).p) - 1) * itemsPerPage,
						parseInt(queryString.parse(location.search).p) * itemsPerPage
					)
				);
			}
		},
		[ products, location.search, itemsPerPage ]
	);

	useEffect(
		() => {
			if (
				!(parseInt(queryString.parse(location.search).p) > 0) ||
				(parseInt(queryString.parse(location.search).p) > Math.ceil(products.length / itemsPerPage) &&
					products.length > 0)
			) {
				history.push({
					search: `?p=1`
				});
			}
		},
		[ products, location.search ]
	);
	console.log(actualPage);

	const onPageChangeHanler = e => {
		// history.push((e.selected + 1).toString());
		if (e.selected == 0) {
			history.push({
				search: ``
			});
		} else
			history.push({
				search: `?p=${(e.selected + 1).toString()}`
			});
		window.scrollTo(0, 0);
	};

	return (
		<div className="products-container">
			{badKeyword ? (
				NoProductsFound
			) : (
				<React.Fragment>
					<div className="products">{productsShown}</div>

					<ReactPaginate
						previousLabel={'Pagina anterioara'}
						nextLabel={'Pagina anterioara'}
						previousLinkClassName={'previous-page'}
						forcePage={parseInt(parseInt(queryString.parse(location.search).p)) - 1 || 0}
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
			)}
		</div>
	);
};

export default withRouter(Products);
