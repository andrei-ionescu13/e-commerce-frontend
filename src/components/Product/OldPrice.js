import React from 'react';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';
import styled from 'styled-components';

const StyledOldPrice = styled.div`
	font-size: 1.4rem;
	height: 2rem;
	color: grey;
	text-decoration: line-through;

	sup {
		display: inline-block;
		font-size: 1rem;
		text-decoration: none;
	}
`;

const ProductOldPrice = ({ price, discountedPrice }) => {
	return (
		<StyledOldPrice>
			{discountedPrice && insertCharacterFromEnd(price.toString().split('.')[0], '.', 3)}
			<sup>{discountedPrice && price.toString().split('.')[1]}</sup>
		</StyledOldPrice>
	);
};

export default ProductOldPrice;
