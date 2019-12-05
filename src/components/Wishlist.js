import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Product from './Product/Product';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../store/Actions/ProductsActions';
import isTokenExpired from '../helpers/isTokenExpired';
import { useHistory } from 'react-router-dom';
import Comparison from './ProductsSection/Comparison/Comparison';

const Container = styled.div`
	width: 70%;
	margin: auto;
	margin-top: 2rem;
`;

const WishlistTitle = styled.div`
	background: var(--primary-color);
	height: 4rem;
	font-size: 2.8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-column-gap: 2rem;
	grid-row-gap: 5rem;
`;

const NoProductsMessage = styled.div`
	width: 40%;
	height: 10rem;
	border: 2px solid lightgray;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Wishlist = () => {
	const [ products, setProducts ] = useState();
	const [ loading, setLoading ] = useState(true);

	const history = useHistory();
	const dispatch = useDispatch();

	const fetchData = async () => {
		if (isTokenExpired('Authorization')) {
			dispatch(setIsLogged(false));
			history.push('/login');
		}
		const token = Cookies.get('Authorization');
		setLoading(true);
		const headers = { Authorization: token };
		try {
			const response = await axios.get('http://localhost:3333/user/wishlist', { headers: headers });
			setProducts(response.data);
		} catch (error) {
			if (error.response.status === 404) {
				dispatch(setIsLogged(false));
				history.push('/login');
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteProduct = async productId => {
		const token = Cookies.get('Authorization');
		const headers = { Authorization: token };

		try {
			const response = await axios.put(
				'http://localhost:3333/user/wishlist',
				{ productId: productId },
				{ headers: headers }
			);
			setProducts(products.filter(x => x._id != productId));
		} catch (error) {
			console.log(error);
			if (error.response.status === 401 || 404);
			{
				Cookies.remove('Authorization');
				dispatch(setIsLogged(false));
				history.push('/login');
			}
		}
	};

	return (
		!loading && (
			<React.Fragment>
				<Container>
					<WishlistTitle>Wishlist</WishlistTitle>
					{products.length > 0 ? (
						<Grid>
							{products.map(x => (
								<Product
									key={x._id}
									_id={x._id}
									name={x.name}
									price={x.price}
									discountedPrice={x.discountedPrice}
									category={x.category}
									imagesURL={x.imagesURL}
									reviews={x.reviews}
									showWishlist={false}
									showDelete={true}
									deleteFunction={() => deleteProduct(x._id)}
								/>
							))}
						</Grid>
					) : (
						<NoProductsMessage>Nu aveti produse in wishlist</NoProductsMessage>
					)}
				</Container>
				<Comparison />
			</React.Fragment>
		)
	);
};

export default Wishlist;
