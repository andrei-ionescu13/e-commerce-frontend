import React, { useState, useEffect } from 'react';
import './ProductPage.css';
import axios from 'axios';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';
import Slideshow from './Slideshow/Slideshow';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';
import { ReactComponent as CompareIcon } from '../../assets/icons/compare.svg';
import getPercentage from '../../helpers/getPercentage';
import Specifications from './Specifications/Specifications';
const ProductPage = ({ location }) => {
	const [ loading, setLoading ] = useState(true);
	const productName = location.pathname.substring(1);
	const [ product, setProduct ] = useState({});
	const [ actualPrice, setActualPrice ] = useState();

	useEffect(() => {
		axios
			.get(`http://localhost:3333/product/${productName}`)
			.then(result => {
				console.log(result.data);
				setProduct(result.data);
				setActualPrice((result.data.discountedPrice || result.data.price).toString());

				setLoading(false);
			})
			.catch(err => console.log(err));
	}, []);
	!loading && console.log(product.imagesURL[0]);
	return (
		!loading && (
			<div className="productPage">
				<div className="productPage-product">
					<div className="productPage-product-title">{product.name}</div>
					<Slideshow
						imagesURL={product.imagesURL}
						productName={product.name}
						price={product.price}
						discountedPrice={product.discountedPrice}
					/>
					<div className="productPage-product-rightSide">
						<div className="productPage-product-price">
							{insertCharacterFromEnd(actualPrice.split('.')[0], '.', 3)}
							<sup>{Number.isInteger(parseFloat(actualPrice)) ? '00' : actualPrice.split('.')[1]}</sup>
						</div>
						<div className="productPage-product-oldPrice">
							{product.discountedPrice &&
								insertCharacterFromEnd(product.price.toString().split('.')[0], '.', 3)}
							<sup>{product.discountedPrice && product.price.toString().split('.')[1]}</sup>
						</div>
						<button className="productPage-product-buyButton"> Adauga in cos</button>
						<div />
						<div className="productPage-flex-container">
							<div className="productPage-product-compare">
								<CompareIcon className="productPage-product-compare-icon" />
								<div className="productPage-product-compare-text">Compara</div>
							</div>
							<div className="productPage-product-wishlist">
								<EmptyHeartIcon className="productPage-product-wishlist-icon" />
								<div className="productPage-product-wishlist-text">Wishlist</div>
							</div>
						</div>
					</div>
				</div>
				<Specifications specs={product.informations} />
			</div>
		)
	);
};

export default ProductPage;
