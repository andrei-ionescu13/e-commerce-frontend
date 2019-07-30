import React from 'react';
import { ReactComponent as CartIcon } from '../../../../assets/icons/cart.svg';
import './Cart.css';
const Cart = () => {
	return (
		<div className="cart">
			<button className="cart-button">
				<CartIcon className="cart-icon" />
				<div className="cart-price">aads</div>
			</button>
			<div className="cart-content" />
		</div>
	);
};

export default Cart;
