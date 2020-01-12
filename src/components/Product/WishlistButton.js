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
	cursor: ${props => (props.disabledStyle ? 'auto' : 'pointer')};
	display: flex;
	align-items: center;
	background: transparent;
	border: none;
	opacity: ${props => props.disabledStyle && '.5'};
	svg {
		width: 1rem;
	}

	div {
		margin-left: .4rem;
		font-size: 1.3rem;
	}

	&:hover {
		color: ${props => (props.disabledStyle ? 'inherit' : 'var(--primary-color)')};
		fill: ${props => (props.disabledStyle ? 'inherit' : 'var(--primary-color)')};
	}
`;

const WishlistButton = ({ productId, disabled }) => {
	const dispatch = useDispatch();

	const [ isDisabled, setIsDisabled ] = useState(disabled);

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

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
				}, 1000);
			} else if (error.response.status === 401) {
				redirectToLogin();
			}
		}
	};
	return (
		<StyledWishlistButton disabledStyle={disabled} disabled={isDisabled} onClick={handleClick}>
			<EmptyHeartIcon />
			<div>Wishlist</div>
		</StyledWishlistButton>
	);
};

export default WishlistButton;
