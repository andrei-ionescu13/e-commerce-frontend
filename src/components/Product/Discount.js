import React from 'react';
import getPercentage from '../../helpers/getPercentage';
import styled from 'styled-components';

const StyledDiscount = styled.div`
	user-select: none;
	position: absolute;
	top: 0;
	left: 0;
	background-color: coral;
	width: 25%;
	height: 10%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-right-radius: 1.5rem;
	opacity: ${(props) => (props.disabled ? '.5' : undefined)};
`;

const Discount = ({ price, discountedPrice, disabled }) => {
	return (
		discountedPrice && (
			<StyledDiscount disabled={disabled}>{`${Math.floor(
				100 - getPercentage(discountedPrice, price)
			)}%`}</StyledDiscount>
		)
	);
};

export default Discount;
