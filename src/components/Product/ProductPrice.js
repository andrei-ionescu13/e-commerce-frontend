import React from 'react';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';

const ProductPrice = ({ price, discountedPrice }) => {
	const actualPrice = (discountedPrice || price).toString();

	return (
		<div className="product-price">
			{insertCharacterFromEnd(actualPrice.split('.')[0], '.', 3)}
			<sup>{Number.isInteger(parseFloat(actualPrice)) ? '00' : actualPrice.split('.')[1]}</sup>
		</div>
	);
};

export default ProductPrice;
