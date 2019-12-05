import React, { useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as EmptyHeartIcon } from '../../assets/icons/empty-heart.svg';
import axios from 'axios';
import isTokenExpired from '../../helpers/isTokenExpired';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogged, setAlert } from '../../store/Actions/ProductsActions';
import { alertSelector } from '../../store/Selectors/ProductsSelector';
import Cookies from 'js-cookie';

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
	const history = useHistory();
	const dispatch = useDispatch();

	const alert = useSelector(state => alertSelector(state));

	const handleClick = async () => {
		if (isTokenExpired('Authorization')) {
			dispatch(setIsLogged(false));
			history.push('/login');
		}
		const token = Cookies.get('Authorization');

		try {
			const headers = { Authorization: token };
			const response = await axios.post(
				'http://localhost:3333/user/wishlist',
				{ productId },
				{ headers: headers }
			);
			dispatch(
				setAlert({
					show: true,
					message: 'Produsul a fost adaugat in wishlist',
					type: 'succes'
				})
			);

			setTimeout(() => {
				dispatch(
					setAlert({
						show: false,
						message: '',
						type: null
					})
				);
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
				setTimeout(() => {
					dispatch(
						setAlert({
							show: false,
							message: '',
							type: null
						})
					);
				}, 1000);
			} else if (error.response.status === 401 || 404) {
				dispatch(setIsLogged(false));
				history.push('/login');
			}
		}
	};
	return (
		<StyledWishlistButton disabled={alert.show} onClick={() => handleClick()}>
			<EmptyHeartIcon />
			<div>Wishlist</div>
		</StyledWishlistButton>
	);
};

export default WishlistButton;
