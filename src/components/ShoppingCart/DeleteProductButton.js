import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useDispatch } from 'react-redux';
import { setCart } from '../../store/Actions/ProductsActions';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

const StyledCloseButton = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
`;

const DeleteProductButton = ({ productId }) => {
	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	const dispatch = useDispatch();

	const handleDelete = async () => {
		const headers = { Authorization: token };

		const response = await axios.delete(`http://localhost:3333/user/cart/product/${productId}`, {
			headers: headers
		});

		const { _id, ...cart } = response.data;
		console.log(productId);
		dispatch(setCart(cart));
	};

	return (
		<StyledCloseButton onClick={handleDelete}>
			<CloseIcon width="1.2rem" fill="#888" />
		</StyledCloseButton>
	);
};

export default DeleteProductButton;
