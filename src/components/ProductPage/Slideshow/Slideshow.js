import React, { useState } from 'react';
import './Slideshow.css';
const Slideshow = ({ imagesURL, productName }) => {
	const images = imagesURL.map(x => 'http://localhost:3333/images/' + x + '.jpg');
	const [ mainImage, setMainImage ] = useState(images[0]);

	const onClickHandler = e => {
		setMainImage(e.target.src);
	};

	return (
		<div className="productPage-product-slideshow">
			<img className="main-image" src={mainImage} alt={productName} />
			<div className="secondary-images">
				{images.map(x => <img src={x} alt={productName} onClick={e => onClickHandler(e)} />)}
			</div>
		</div>
	);
};

export default Slideshow;
