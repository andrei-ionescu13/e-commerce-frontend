import React from 'react';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';
import styled from 'styled-components';

const StyledOldPrice = styled.div`
	font-size: 1.4rem;
	margin-top: 1rem;
	height: 2rem;
	color: grey;

	sup {
		display: inline-block;
		font-size: 1rem;
		text-decoration: none;
	}

	span {
		text-decoration: line-through;
	}
`;

const OldPrice = ({ price, discountedPrice }) => {
	return (
		<StyledOldPrice>
			<span>{discountedPrice && insertCharacterFromEnd(price.toString().split('.')[0], '.', 3)}</span>
			<sup>{discountedPrice && parseFloat(price).toFixed(2).toString().split('.')[1]}</sup>
			{discountedPrice && ' lei'}
		</StyledOldPrice>
	);
};

export default OldPrice;
