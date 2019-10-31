import React from 'react';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';
import styled from 'styled-components';

const StyledPrice = styled.div`
	font-size: 2.4rem;
	color: black;
	font-weight: bold;
	height: 2rem;

	sup {
		font-size: 1.5rem;
	}
`;

const ProductPrice = ({ price, discountedPrice }) => {
	const actualPrice = (discountedPrice || price).toString();

	return (
		<StyledPrice>
			{insertCharacterFromEnd(actualPrice.split('.')[0], '.', 3)}
			<sup>{Number.isInteger(parseFloat(actualPrice)) ? '00' : actualPrice.split('.')[1]}</sup>
		</StyledPrice>
	);
};

export default ProductPrice;
