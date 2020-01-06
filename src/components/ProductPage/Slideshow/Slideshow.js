import React, { useState, useEffect } from 'react';
import Discount from '../../Product/Discount';

import './Slideshow.css';
const Slideshow = ({ imagesURL, productName, price, discountedPrice }) => {
	const images = imagesURL.map(x => 'http://localhost:3333/images/' + x + '.jpg');
	const [ mainImage, setMainImage ] = useState();

	useEffect(
		() => {
			setMainImage(images[0]);
		},
		[ productName ]
	);

	const onClickHandler = e => {
		setMainImage(e.target.src);
	};

	return (
		<div className="productPage-product-slideshow">
			<Discount price={price} discountedPrice={discountedPrice} />
			<img className="main-image" src={mainImage} alt={productName} />
			<div className="secondary-images">
				{images.map((x, index) => (
					<img src={x} key={index} alt={productName} onClick={e => onClickHandler(e)} />
				))}
			</div>
		</div>
	);
};

export default Slideshow;
