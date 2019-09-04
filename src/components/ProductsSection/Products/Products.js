import React, { useState, useEffect } from 'react';
import './Products.css';
import { useSelector } from 'react-redux';
import { productsSelector, itemsPerPageSelector } from '../../../store/Selectors/ProductsSelector';
import ReactPaginate from 'react-paginate';
import { withRouter } from 'react-router-dom';
import Product from '../../Product/Product';
const Products = ({ history, match }) => {
	let products = useSelector(state => productsSelector(state));

	const [ productsShown, setProductsShown ] = useState([]);
	const [ onBadPage, setOnBadPage ] = useState(false);
	const itemsPerPage = useSelector(state => itemsPerPageSelector(state));

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
					products.slice((match.params.pageNumber - 1) * itemsPerPage, match.params.pageNumber * itemsPerPage)
				);
			}
		},
		[ products, match.params.pageNumber ]
	);

	useEffect(
		() => {
			if (parseInt(match.params.pageNumber) > Math.ceil(products.length / itemsPerPage) && products.length > 0) {
				history.push('1');
				setOnBadPage(true);
			}
		},
		[ match.params.pageNumber, products ]
	);

	let a;
	if (onBadPage) a = 0;
	else a = parseInt(match.params.pageNumber) - 1;
	return (
		<div className="products-container">
			<div className="products">{productsShown}</div>
			{console.log(
				<ReactPaginate
					previousLabel={'Pagina anterioara'}
					nextLabel={'Pagina anterioara'}
					previousLinkClassName={'previous-page'}
					initialPage={a}
					disableInitialCallback={true}
					nextLinkClassName={'next-page'}
					breakLabel={'...'}
					breakClassName={'break-me'}
					pageCount={Math.ceil(products.length / itemsPerPage)}
					marginPagesDisplayed={2}
					pageRangeDisplayed={3}
					onPageChange={e => {
						history.push((e.selected + 1).toString());
						window.scrollTo(0, 0);
					}}
					containerClassName={'pagination'}
					pageLinkClassName={'page'}
					activeLinkClassName={'active'}
					// pageLinkClassName={'pages'}
					// activeClassName={'active'}
				/>
			)}
			<ReactPaginate
				previousLabel={'Pagina anterioara'}
				nextLabel={'Pagina anterioara'}
				previousLinkClassName={'previous-page'}
				initialPage={onBadPage ? 0 : parseInt(match.params.pageNumber) - 1}
				disableInitialCallback={true}
				nextLinkClassName={'next-page'}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={Math.ceil(products.length / itemsPerPage)}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={e => {
					history.push((e.selected + 1).toString());
					window.scrollTo(0, 0);
				}}
				containerClassName={'pagination'}
				pageLinkClassName={'page'}
				activeLinkClassName={'active'}
				// pageLinkClassName={'pages'}
				// activeClassName={'active'}
			/>
		</div>
	);
};

export default withRouter(Products);
