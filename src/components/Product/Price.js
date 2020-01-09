import React from 'react';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';
import styled from 'styled-components';

const StyledPrice = styled.div`
	font-size: ${props => props.primarySize || '2.4rem'};
	color: black;
	font-weight: bold;
	height: 2rem;

	sup {
		font-size: ${props => props.secondarySize || '1.5rem'};
	}
`;

const Price = ({ price, discountedPrice, primarySize, secondarySize }) => {
	const actualPrice = (discountedPrice || price).toString();

	return (
		<StyledPrice primarySize={primarySize} secondarySize={secondarySize}>
			{`${insertCharacterFromEnd(actualPrice.split('.')[0], '.', 3)}`}
			<sup>{`${parseFloat(actualPrice).toFixed(2).toString().split('.')[1]} `}</sup> lei
		</StyledPrice>
	);
};

export default Price;
