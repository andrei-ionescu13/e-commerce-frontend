import React, { useState, useEffect } from 'react';
import './ComparisonPage.css';
import { Link } from 'react-router-dom';
import Price from '../Product/Price';
import OldPrice from '../Product/OldPrice';
import BuyButton from '../Product/BuyButton';
import WishlistButton from '../Product/WishlistButton';
import Discount from '../Product/Discount';
import axios from 'axios';
import styled from 'styled-components';
import ProductRating from '../Product/ProductRating';

const StyledTitleLink = styled(Link)`
	text-decoration:none;
	margin-top:1.5rem;
`;

const StyledImageLink = styled(Link)`
	display: flex;
	justify-content: center;
	width:50%;
`;

const RatingContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
`;

const getAllSpecs = comparedProducts => {
	const productsSpecs = {};
	comparedProducts.forEach(element => {
		Object.keys(element.informations).forEach(key1 => {
			productsSpecs[key1] = [];
			Object.keys(element.informations[key1]).forEach(key2 => {
				if (!productsSpecs[key1].includes(key2)) {
					productsSpecs[key1].push(key2);
				}
			});
		});
	});
	return productsSpecs;
};

const ComparisonPage = () => {
	const [ comparedProducts, setComparedProducts ] = useState();
	const [ productsSpecs, setProductsSpecs ] = useState();
	const [ loading, setLoading ] = useState(true);

	const fetchdata = async () => {
		const comparedProducts = localStorage.getObject('compared-products');
		const comparedProductsIds = comparedProducts.map(x => x._id);
		const response = await axios.post(`http://localhost:3333/products/productsByIds`, {
			productsIds: comparedProductsIds
		});
		setComparedProducts(response.data);
		setProductsSpecs(getAllSpecs(response.data));
		setLoading(false);
	};

	useEffect(() => {
		fetchdata();
	}, []);

	const tableHeader =
		!loading &&
		comparedProducts.map(x => (
			<td key={x._id}>
				<div className="comparison-product">
					<StyledImageLink to={`/${x.name}`}>
						<img src={`http://localhost:3333/images/${x.imagesURL[0]}.jpg`} alt="" />
					</StyledImageLink>
					<StyledTitleLink to={`/${x.name}`}>
						<div className="comparison-product-title">{x.name}</div>
					</StyledTitleLink>
					<RatingContainer>
						<ProductRating reviews={x.reviews} width="2rem" />
					</RatingContainer>
					<Price price={x.price} discountedPrice={x.discountedPrice} />
					<OldPrice price={x.price} discountedPrice={x.discountedPrice} />
					<BuyButton />
					<WishlistButton />
					<Discount price={x.price} discountedPrice={x.discountedPrice} />
				</div>
			</td>
		));

	const tableContent = [];
	if (!loading) {
		for (const [ key, value ] of Object.entries(productsSpecs)) {
			tableContent.push(
				<tr key={key}>
					<th className="header-section" colSpan={comparedProducts.length + 1}>
						{key}
					</th>
				</tr>
			);
			value.forEach(x => {
				tableContent.push(
					<tr key={x}>
						<th>{x}</th>
						{comparedProducts.map(x2 => (
							<td key={x2._id} className="table-pad-left" key={x2._id}>
								{x2.informations[key] ? x2.informations[key][x] || ' - ' : ' - '}
							</td>
						))}
					</tr>
				);
			});
		}
	}

	return (
		!loading && (
			<table className="comparison">
				<tbody>
					<tr>
						<th>Produse</th>
						{tableHeader}
					</tr>
					<tr>
						<th>Brand</th>
						{comparedProducts.map(x2 => (
							<td key={x2._id} className="table-pad-left">
								{x2.brand || ' - '}
							</td>
						))}
					</tr>
					{tableContent}
				</tbody>
			</table>
		)
	);
	// return <h1>a</h1>;
};

export default ComparisonPage;
