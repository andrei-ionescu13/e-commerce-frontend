import React from 'react';
import { ReactComponent as CartIcon } from '../../../assets/icons/cart.svg';
import styled from 'styled-components';

const StyledCard = styled.button`
	cursor: pointer;
	background: transparent;
	border: .2rem solid var(--primary-color);
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 7rem;
	height: 5rem;

	svg {
		width: 2.5rem;
		fill: var(--primary-color);
	}

	> div {
		font-size: 1.2rem;
		color: white;
		white-space: nowrap;
	}
`;

const Cart = () => {
	return (
		<StyledCard>
			<CartIcon />
			<div>aads</div>
		</StyledCard>
	);
};

export default Cart;
