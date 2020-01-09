import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledProduct = styled(Link)`
	height: 25%;
	display: flex;
	font-size: 1.2rem;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #888;
	padding: 0 1rem;
	text-decoration:none;
	color:#888;
	img {
		height: 80%;
	}
`;

const StyledName = styled.p`
	display: block;
	width: 50%;
`;

const Product = ({ name, price, quantity, imgUrl }) => {
	return (
		<StyledProduct to={`/${name}`}>
			<img src={imgUrl} />
			<StyledName>{name}</StyledName>
			<div>{`x${quantity}`}</div>
			<div>{`${price} lei`}</div>
		</StyledProduct>
	);
};

export default Product;
