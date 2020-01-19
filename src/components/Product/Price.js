import React from 'react';
import insertCharacterFromEnd from '../../helpers/insertCharacterFromEnd';
import styled from 'styled-components';

const StyledPrice = styled.div`
	font-size: ${(props) => props.primarySize || '2.4rem'};
	color: ${(props) => props.color || 'black'};
	font-weight: bold;
	height: 2rem;
	white-space: nowrap;
	sup {
		font-size: ${(props) => props.secondarySize || '1.5rem'};
	}
	opacity: ${(props) => (props.disabled ? '.5' : undefined)};
`;

const Price = ({ price, primarySize, secondarySize, color, className, opacity, disabled }) => {
	const actualPrice = price.toString();

	return (
		<StyledPrice
			opacity={opacity}
			className={className}
			primarySize={primarySize}
			secondarySize={secondarySize}
			color={color}
			disabled={disabled}
		>
			{`${insertCharacterFromEnd(actualPrice.split('.')[0], '.', 3)}`}
			<sup>{`${parseFloat(actualPrice).toFixed(2).toString().split('.')[1]} `}</sup> lei
		</StyledPrice>
	);
};

export default Price;
