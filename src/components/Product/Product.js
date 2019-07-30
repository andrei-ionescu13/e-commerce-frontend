import React from 'react';
import { ReactComponent as CompareIcon } from '../../assets/icons/compare.svg';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';
import './Product.css';
const Product = ({ name }) => {
	return (
		<div className="product">
			<img className="product-image" src="/Procesor AMD RYZEN 3 2200G, 3.5GHz, 6MB, socket AM4.jpg" alt="" />
			<div className="product-title">{name}</div>
			<div className="product-price">312312</div>
			<div className="product-discountedPrice">asda</div>
			<button className="buy-button">Adauga in cos</button>
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
