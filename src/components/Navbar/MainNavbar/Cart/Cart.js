import React, { useEffect } from 'react';
import { ReactComponent as CartIcon } from '../../../../assets/icons/cart.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../../../../store/Selectors/ProductsSelector';
import { setCartAsync, setCart } from '../../../../store/Actions/ProductsActions';
import useIsAuthenticated from '../../../../hooks/useIsAuthenticated';
import Info from './Info';

const Dropdown = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	&:hover {
		> div {
			display: flex;
			flex-flow: column;
			@media (max-width: 700px) {
				display: none;
			}
		}
	}
`;

const StyledCart = styled(Link)`
	cursor: pointer;
	text-decoration:none;
	display:block;
	height:6rem;
	position: relative;
	display:flex;
	align-items:center;

	>div{
	border: .2rem solid var(--primary-color);
	padding: .4rem;
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
}
`;

const StyledPrice = styled.div`
	font-size: 1.2rem;
	color: white;
	white-space: nowrap;
	min-height: 1.4rem;
`;

const StyledCircle = styled.div`
	font-size: 1.2rem;
	color: white;
	background: var(--primary-color);
	width: 1.8rem;
	height: 1.8rem;
	padding: .8rem;
	position: absolute;
	right: -.7rem;
	top: 0rem;
	border-radius: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Cart = () => {
	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	const cart = useSelector(state => cartSelector(state));

	const dispatch = useDispatch();

	useEffect(
		() => {
			if (isAuthenticated) {
				const headers = { Authorization: token };
				dispatch(setCartAsync(`http://localhost:3333/user/cart`, { headers: headers }));
			} else dispatch(setCart(null));
		},
		[ token ]
	);

	return (
		<Dropdown>
			<StyledCart to="/cart">
				<div>
					<CartIcon />
					<StyledPrice>{cart && cart.totalPrice}</StyledPrice>
					{cart && <StyledCircle>{cart.totalQuantity}</StyledCircle>}
				</div>
			</StyledCart>
			{cart && <Info />}
		</Dropdown>
	);
};

export default Cart;
