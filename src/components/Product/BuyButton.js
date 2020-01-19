import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { setAlert, setCart } from '../../store/Actions/ProductsActions';
import { useDispatch } from 'react-redux';

const StyledBuyButton = styled.button`
	user-select: none;
	cursor: ${props => (props.disabledStyle ? 'auto' : 'pointer')};
	margin-top: 1.8rem;
	margin-bottom: 1rem;
	height: 3rem;
	width: 80%;
	border: none;
	outline: none;
	background-color: var(--primary-color);
	border-radius: .8rem;
	color: #f8f8ff;
	white-space: nowrap;
	opacity: ${props => props.disabledStyle && '.5'};

	/* @media (max-width: 800px) {
		font-size: 1.2rem;
	} */
	&:hover {
		background-color: ${props => (props.disabledStyle ? ' var(--primary-color)' : ' #fe7f01')};
	}
`;
const BuyButton = ({ productId, disabled }) => {
	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const [ isDisabled, setIsDisabled ] = useState(disabled);

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
				setIsDisabled(true);

				setTimeout(() => {
					dispatch(
						setAlert({
							show: false,
							message: '',
							type: null
						})
					);
					setIsDisabled(false);
				}, 1500);

				return;
			}
		}
	};

	return (
		<StyledBuyButton disabledStyle={disabled} disabled={isDisabled} onClick={handleClick}>
			Adauga in cos
		</StyledBuyButton>
	);
};

export default BuyButton;
