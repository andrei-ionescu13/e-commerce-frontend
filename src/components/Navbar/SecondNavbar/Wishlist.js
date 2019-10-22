import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/icons/heart.svg';
import styled from 'styled-components';

const StyledWishlist = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 0 .5rem;

	&:hover {
		background-color: #484848;
	}

	svg {
		width: 2.5rem;
	}

	div {
		margin-left: .5rem;
		color: white;
	}
`;

const Wishlist = () => {
	return (
		<StyledWishlist className="wishlist">
			<HeartIcon />
			<div>Wishlist</div>
		</StyledWishlist>
	);
};

export default Wishlist;
