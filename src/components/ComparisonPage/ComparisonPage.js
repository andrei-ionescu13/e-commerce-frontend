import React, { useState, useEffect } from 'react';
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
	display:block;
	text-decoration:none;
	margin-top:1.5rem;
	height: 10rem;

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
	height: 6rem;
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

const StyledProduct = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	padding-left: 0;
	padding-bottom: 1rem;
	position: relative;
`;

const StyledProductTitle = styled.div`
	text-align: center;
	height: 5rem;
	color: black;
`;

const StyledHeader = styled.th`
	font-size: 2rem;
	background-color: var(--primary-color);
`;

const PaddedLeft = styled.td`padding: 0 2rem;`;

const StyledComparison = styled.table`
	width: var(--primary-width);
	margin: auto;
	border-collapse: collapse;
	margin-bottom: 5rem;
	table-layout: fixed;
	font-size: 1.4rem;
	color: #484848;

	th {
		border: 1px solid lightgray;
		padding: .6rem;
	}

	td {
		border: 1px solid lightgray;
	}

	tr:nth-child(even) {
		background-color: #f5f5f5;
	}

	img {
		width: 100%;
	}
`;

const StyledPrice = styled(Price)`

	@media (max-width: 750px) {
		font-size:1.6rem;

	sup{
		font-size:1rem;

	}
}
`;

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
				<StyledProduct>
					<StyledImageLink to={`/${x.name}`}>
						<img src={`http://localhost:3333/images/${x.imagesURL[0]}.jpg`} alt="" />
					</StyledImageLink>
					<StyledTitleLink to={`/${x.name}`}>
						<StyledProductTitle>{x.name}</StyledProductTitle>
					</StyledTitleLink>
					<RatingContainer>
						<ProductRating reviews={x.reviews} width="2rem" />
					</RatingContainer>
					<StyledPrice price={x.discountedPrice || x.price} />
					<OldPrice price={x.price} discountedPrice={x.discountedPrice} />
					<BuyButton />
					<WishlistButton />
					<Discount price={x.price} discountedPrice={x.discountedPrice} />
				</StyledProduct>
			</td>
		));

	const tableContent = [];
	if (!loading) {
		for (const [ key, value ] of Object.entries(productsSpecs)) {
			tableContent.push(
				<tr key={key}>
					<StyledHeader colSpan={comparedProducts.length + 1}>{key}</StyledHeader>
				</tr>
			);
			value.forEach(x => {
				tableContent.push(
					<tr key={x}>
						<th>{x}</th>
						{comparedProducts.map(x2 => (
							<PaddedLeft key={x2._id} key={x2._id}>
								{x2.informations[key] ? x2.informations[key][x] || ' - ' : ' - '}
							</PaddedLeft>
						))}
					</tr>
				);
			});
		}
	}

	return (
		!loading && (
			<StyledComparison>
				<tbody>
					<tr>
						<th>Produse</th>
						{tableHeader}
					</tr>
					<tr>
						<th>Brand</th>
						{comparedProducts.map(x2 => <PaddedLeft key={x2._id}>{x2.brand || ' - '}</PaddedLeft>)}
					</tr>
					{tableContent}
				</tbody>
			</StyledComparison>
		)
	);
	// return <h1>a</h1>;
};

export default ComparisonPage;
