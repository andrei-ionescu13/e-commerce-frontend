import React from 'react';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';

const ProductOldPrice = ({ price, discountedPrice }) => {
	return (
		<div className="product-oldPrice">
			{discountedPrice && insertCharacterFromEnd(price.toString().split('.')[0], '.', 3)}
			<sup>{discountedPrice && price.toString().split('.')[1]}</sup>
		</div>
	);
};

export default ProductOldPrice;
