import React from 'react';
import { ReactComponent as CompareIcon } from '../../assets/icons/compare.svg';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';
import { setComparedProducts } from '../../store/Actions/ProductsActions';
import { useDispatch } from 'react-redux';
import './Product.css';
import getPercentage from '../../helpers/getPercentage';
import { Link } from 'react-router-dom';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';

const Product = ({ product }) => {
	const { name, price, discountedPrice } = product;
	const imageURL = `http://localhost:3333/images/${product.imagesURL[0]}.jpg`;
	const actualPrice = (discountedPrice || price).toString();

	const dispatch = useDispatch();

	const compareOnClickHandler = () => {
		const comparedProducts = [];
		const comparedProductsInStorage = localStorage.getObject('comparedProducts');

		if (comparedProductsInStorage && comparedProductsInStorage.length > 0) {
			if (comparedProductsInStorage[0].category !== product.category) {
				return;
			}
			if (comparedProductsInStorage.length >= 4) return;
			comparedProductsInStorage.forEach(x => {
				if (x._id === product._id) {
					return;
				}
				comparedProducts.push(x);
			});
		}
		comparedProducts.push(product);
		dispatch(setComparedProducts(comparedProducts));
		localStorage.setObject('comparedProducts', comparedProducts);
	};

	return (
		<div className="product">
			<Link to={`/${name}`}>
				<img className="product-image" src={imageURL} alt="" />
			</Link>
			<Link style={{ textDecoration: 'none' }} to={`/${name}`}>
				<div className="product-title">{name}</div>
			</Link>
			<div className="product-price">
				{insertCharacterFromEnd(actualPrice.split('.')[0], '.', 3)}
				<sup>{Number.isInteger(parseFloat(actualPrice)) ? '00' : actualPrice.split('.')[1]}</sup>
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
				<div className="product-compare" onClick={() => compareOnClickHandler()}>
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
