import React from 'react';
import styled from 'styled-components';

const StyledBuyButton = styled.button`
	user-select: none;
	cursor: pointer;
	margin-top: 1.8rem;
	margin-bottom: 1rem;
	height: 3.8rem;
	width: 80%;
	border: none;
	outline: none;
	background-color: var(--primary-color);
	border-radius: .8rem;
	color: #f8f8ff;

	&:hover {
		background-color: #fe7f01;
	}
`;
const BuyButton = () => {
	return <StyledBuyButton>Adauga in cos</StyledBuyButton>;
};

export default BuyButton;
