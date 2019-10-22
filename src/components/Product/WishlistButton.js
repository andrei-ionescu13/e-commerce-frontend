import React from 'react';
import styled from 'styled-components';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';

const StyledWishlistButton = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	background: transparent;
	border: none;

	svg {
		width: 1rem;
	}

	div {
		margin-left: .4rem;
		font-size: 1.3rem;
	}

	&:hover {
		color: var(--primary-color);
		fill: var(--primary-color);
	}
`;
const WishlistButton = () => {
	return (
		<StyledWishlistButton>
			<EmptyHeartIcon />
			<div>Wishlist</div>
		</StyledWishlistButton>
	);
};

export default WishlistButton;
