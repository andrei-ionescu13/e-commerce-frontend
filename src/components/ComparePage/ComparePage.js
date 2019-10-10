import React from 'react';
import './ComparePage.css';
import { Link } from 'react-router-dom';

import getPercentage from '../../helpers/getPercentage';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';

const ComparePage = () => {
	const comparedProducts = localStorage.getObject('comparedProducts');
	const obj = {};
	comparedProducts.forEach(element => {
		Object.keys(element.informations).forEach(key1 => {
			obj[key1] = [];
			Object.keys(element.informations[key1]).forEach(key2 => {
				if (!obj[key1].includes(key2)) {
					obj[key1].push(key2);
				}
			});
		});
	});

	console.log(obj);

	const tableHeader = comparedProducts.map(x => (
		<td>
			<div className="comparison-product">
				<Link style={{ display: 'flex', justifyContent: 'center' }} to={`/${x.name}`}>
					<img src={`http://localhost:3333/images/${x.imagesURL[0]}.jpg`} alt="" />
				</Link>
				<Link style={{ textDecoration: 'none' }} to={`/${x.name}`}>
					<div className="comparison-product-title">{x.name}</div>
				</Link>
				<div className="comparison-product-price">
					{insertCharacterFromEnd((x.discountedPrice || x.price).toString().split('.')[0], '.', 3)}
					<sup>
						{Number.isInteger(parseFloat(x.discountedPrice || x.price)) ? (
							'00'
						) : (
							(x.discountedPrice || x.price).toString().split('.')[1]
						)}
					</sup>
				</div>
				<div className="comparison-product-oldPrice">
					{x.discountedPrice && insertCharacterFromEnd(x.price.toString().split('.')[0], '.', 3)}
					<sup>{x.discountedPrice && x.price.toString().split('.')[1]}</sup>
				</div>
				<button className="buy-button">Adauga in cos</button>
				<div className="product-whishlist">
					<EmptyHeartIcon className="product-wishlist-icon" />
					<div className="product-wishlist-text">Wishlist</div>
				</div>
				{x.discountedPrice && (
					<div className="comparison-product-discount">{`${Math.floor(
						100 - getPercentage(x.discountedPrice, x.price)
					)}%`}</div>
				)}
			</div>
		</td>
	));

	const tableContent = [];
	for (const [ key, value ] of Object.entries(obj)) {
		tableContent.push(
			<tr>
				<th className="header-section" colspan={comparedProducts.length + 1}>
					{key}
				</th>
			</tr>
		);
		value.forEach(x => {
			console.log(x);
			tableContent.push(
				<tr>
					<th>{x}</th>
					{comparedProducts.map(x2 => (
						<td className="table-pad-left">
							{x2.informations[key] ? x2.informations[key][x] || ' - ' : ' - '}
						</td>
					))}
				</tr>
			);
		});
	}
	return (
		<table className="comparison">
			<tr>
				<th>Produse</th>
				{tableHeader}
			</tr>
			<tr>
				<th>Brand</th>
				{comparedProducts.map(x2 => <td className="table-pad-left">{x2.brand || ' - '}</td>)}
			</tr>
			{tableContent}
		</table>
	);
};

export default ComparePage;
