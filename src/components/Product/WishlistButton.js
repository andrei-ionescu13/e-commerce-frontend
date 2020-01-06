import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../store/Actions/ProductsActions';
import { alertSelector } from '../../store/Selectors/ProductsSelector';
import Cookies from 'js-cookie';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const StyledWishlistButton = styled.button`
	cursor: pointer;
	display: flex;
	align-items: center;
	background: transparent;
	border: none;

	svg {
		width: 1rem;
	}

	div {
		margin-left: .4rem;
		font-size: 1.3rem;
	}

	&:hover {
		color: var(--primary-color);
		fill: var(--primary-color);
	}
`;

const WishlistButton = ({ productId }) => {
	const dispatch = useDispatch();

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();
	const [ disabled, setDisabled ] = useState(false);

	const handleClick = async () => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

		dispatch(
			setAlert({
				show: false,
				message: '',
				type: null
			})
		);

		try {
			const headers = { Authorization: token };
			await axios.post('http://localhost:3333/user/wishlist', { productId }, { headers: headers });
			dispatch(
				setAlert({
					show: true,
					message: 'Produsul a fost adaugat in wishlist',
					type: 'succes'
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
			}, 1000);
		} catch (error) {
			if (error.response.status === 405) {
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
				}, 1000);
			} else if (error.response.status === 401) {
				redirectToLogin();
			}
		}
	};
	return (
		<StyledWishlistButton disabled={disabled} onClick={() => handleClick()}>
			<EmptyHeartIcon />
			<div>Wishlist</div>
		</StyledWishlistButton>
	);
};

export default WishlistButton;
