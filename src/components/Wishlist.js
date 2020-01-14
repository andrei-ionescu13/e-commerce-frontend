import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Product from './Product/Product';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../store/Actions/ProductsActions';
import { useHistory } from 'react-router-dom';
import Comparison from './ProductsSection/Comparison/Comparison';
import useIsAuthenticated from '../hooks/useIsAuthenticated';

const Container = styled.div`
	width: var(--primary-width);
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
	grid-column-gap: 2rem;
	grid-row-gap: 5rem;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	const history = useHistory();
	const dispatch = useDispatch();

	const fetchData = async () => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

		setLoading(true);
		const headers = { Authorization: token };
		try {
			const response = await axios.get('http://localhost:3333/user/wishlist', { headers: headers });
			setProducts(response.data);
		} catch (error) {
			if (error.response.status === 404) {
				redirectToLogin();
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const deleteProduct = async productId => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

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
				redirectToLogin();
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
									wishlistProduct={true}
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
