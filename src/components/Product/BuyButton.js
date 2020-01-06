import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { setAlert, setCart } from '../../store/Actions/ProductsActions';
import { useDispatch } from 'react-redux';

const StyledBuyButton = styled.button`
	user-select: none;
	cursor: pointer;
	margin-top: 1.8rem;
	margin-bottom: 1rem;
	height: 3rem;
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
const BuyButton = ({ productId }) => {
	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();
	const [ disabled, setDisabled ] = useState(false);

	const dispatch = useDispatch();

	const handleClick = async () => {
		if (!isAuthenticated) redirectToLogin();
		const headers = { Authorization: token };

		try {
			const response = await axios.post(`http://localhost:3333/user/cart/${productId}`, null, {
				headers: headers
			});
			const { _id, ...cart } = response.data;
			dispatch(setCart(cart));
		} catch (error) {
			if (error.response.status === 401) {
				redirectToLogin();
			} else if (error.response.status === 405) {
				dispatch(
					setAlert({
						show: true,
						message: error.response.data.error,
						type: 'error'
					})
				);
				setDisabled(true);

				setTimeout(() => {
					dispatch(
						setAlert({
							show: false,
							message: '',
							type: null
						})
					);
					setDisabled(false);
				}, 1500);

				return;
			}
		}
	};

	return (
		<StyledBuyButton disabled={disabled} onClick={handleClick}>
			Adauga in cos
		</StyledBuyButton>
	);
};

export default BuyButton;
