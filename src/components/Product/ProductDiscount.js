import React from 'react';
import getPercentage from '../../helpers/getPercentage';

const ProductDiscount = ({ price, discountedPrice }) => {
	return (
		discountedPrice && (
			<div className="discount">{`${Math.floor(100 - getPercentage(discountedPrice, price))}%`}</div>
		)
	);
};

export default ProductDiscount;
