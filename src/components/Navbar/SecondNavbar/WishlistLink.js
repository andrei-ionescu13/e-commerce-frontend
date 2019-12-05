import React from 'react';
import { ReactComponent as HeartIcon } from '../../../assets/icons/heart.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
	cursor: pointer;
	display: flex;
	align-items: center;
	padding: 0 .5rem;
	text-decoration:none;
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

const WishlistLink = () => {
	return (
		<StyledLink to="/wishlist">
			<HeartIcon />
			<div>Wishlist</div>
		</StyledLink>
	);
};

export default WishlistLink;
