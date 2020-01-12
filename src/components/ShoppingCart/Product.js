import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import axios from 'axios';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useDispatch } from 'react-redux';
import { setCart } from '../../store/Actions/ProductsActions';
import DeleteProductButton from './DeleteProductButton';
import OldPrice from '../Product/OldPrice';
import Price from '../Product/Price';

const StyledProduct = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 11rem;
	a {
		display: flex;
		align-items: center;
		height: 100%;
		img {
			height: 50%;
		}
	}

	input {
		width: 3rem;
		text-align: center;
	}
`;

const StyledName = styled(Link)`
	display: flex;
	align-items: center;
    width: 50%;
    text-decoration:none;
    color:#888;
`;

const StyledPricing = styled.div`
	height: 20%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	div {
		margin: .5rem;
	}
`;

const ChangeQuantityButton = styled.button`
	font-weight: 600;
	background: transparent;
	color: #005eb8;
	font-size: 1.5rem;
	padding: 0;
	margin-left: 1rem;
	border: none;
	cursor: pointer;

	visibility: ${props => (props.hide ? 'hidden' : 'visible')};
`;

const FlexContainer = styled.div`display: flex;`;

const checkInteger = value => !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));

const Product = ({ imgURL, name, price, discountedPrice, quantity, productId, productQuantity }) => {
	const [ quantitySelected, setQuantitySelected ] = useState(quantity);

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	const dispatch = useDispatch();

	const handleQuantityChange = e => {
		setQuantitySelected(e.target.value);
	};

	useEffect(
		() => {
			if (checkInteger(quantitySelected) === false && quantitySelected !== '') setQuantitySelected(1);
			else if (quantitySelected > 10) setQuantitySelected(10);
			else if (quantitySelected < 0) setQuantitySelected(1);
		},
		[ quantitySelected ]
	);

	const handleSelectQuantity = async () => {
		console.log(productId);
		const headers = { Authorization: token };
		const newQuantity = quantitySelected !== '' ? quantitySelected : 1;
		const response = await axios.put(
			`http://localhost:3333/user/cart/product/quantity/${productId}`,
			{ quantity: newQuantity },
			{
				headers: headers
			}
		);

		const { _id, ...cart } = response.data;
		console.log(productId);
		dispatch(setCart(cart));
	};

	return (
		<StyledProduct>
			<Link to={`/${name}`}>
				<img src={imgURL} />
			</Link>
			<StyledName to={`/${name}`}>{name}</StyledName>
			<FlexContainer>
				<input value={quantitySelected} onChange={e => handleQuantityChange(e)} />
				<ChangeQuantityButton hide={quantity === quantitySelected} onClick={handleSelectQuantity}>
					Modifica
				</ChangeQuantityButton>
			</FlexContainer>
			<StyledPricing>
				{/* {discountedPrice && <div>{discountedPrice}</div>} */}
				{/* <div>{price}</div> */}
				<Price primarySize="1.5rem" secondarySize="1.2rem" price={discountedPrice || price} />
				<OldPrice price={price} discountedPrice={discountedPrice} />
			</StyledPricing>

			<DeleteProductButton type="button" productId={productId} />
		</StyledProduct>
	);
};

export default Product;
