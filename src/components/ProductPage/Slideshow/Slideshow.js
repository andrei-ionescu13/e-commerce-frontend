import React, { useState } from 'react';
import getPercentage from '../../../helpers/getPercentage';

import './Slideshow.css';
const Slideshow = ({ imagesURL, productName, price, discountedPrice }) => {
	const images = imagesURL.map(x => 'http://localhost:3333/images/' + x + '.jpg');
	const [ mainImage, setMainImage ] = useState(images[0]);

	const onClickHandler = e => {
		setMainImage(e.target.src);
	};

	return (
		<div className="productPage-product-slideshow">
			{discountedPrice && (
				<div className="slideshow-discount">{`${Math.floor(
					100 - getPercentage(discountedPrice, price)
				)}%`}</div>
			)}
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
