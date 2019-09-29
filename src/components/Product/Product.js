import React from 'react';
import { ReactComponent as CompareIcon } from '../../assets/icons/compare.svg';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';
import './Product.css';
import getPercentage from '../../helpers/getPercentage';

const insertCharacterFromEnd = (x, c, n) => {
	const length = x.length;
	if (length > n) return x.slice(0, length - n) + c + x.slice(length - n, length);
	return x;
};

const Product = ({ name, price, discountedPrice, imageURL }) => {
	const actualPrice = (discountedPrice || price).toString();

	console.log('111', insertCharacterFromEnd('1111', '.', 3));
	return (
		<div className="product">
			<img className="product-image" src={imageURL} alt="" />
			<div className="product-title">{name}</div>
			<div className="product-price">
				{insertCharacterFromEnd(actualPrice.split('.')[0], '.', 3)}
				<sup>{actualPrice.split('.')[1]}</sup>
			</div>
			<div className="product-oldPrice">
				{discountedPrice && insertCharacterFromEnd(price.toString().split('.')[0], '.', 3)}
				<sup>{discountedPrice && price.toString().split('.')[1]}</sup>
			</div>
			<button className="buy-button">Adauga in cos</button>
			{discountedPrice && (
				<div className="discount">{`${Math.floor(100 - getPercentage(discountedPrice, price))}%`}</div>
			)}
			<div className="flex-container">
				<div className="product-compare">
					<CompareIcon className="product-compare-icon" />
					<div className="product-compare-text">Compara</div>
				</div>
				<div className="product-whishlist">
					<EmptyHeartIcon className="product-wishlist-icon" />
					<div className="product-wishlist-text">Wishlist</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
