import React from 'react';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../../store/Selectors/ProductsSelector';
import styled from 'styled-components';
import Product from './Product';

const Container = styled.div`
	width: 35rem;
	height: 30rem;
	display: none;
	position: absolute;
	top: 6rem;
	z-index: 2;
	background: white;
	border: 1px solid lightgray;
`;

const StyledProducts = styled.div`
	height: 80%;
	overflow: scroll;
	-ms-overflow-style: none;
	overscroll-behavior: contain;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledSummary = styled.div`
	height: 20%;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem;
	color: #888;
`;

const Info = () => {
	const cart = useSelector(state => cartSelector(state));

	return (
		<Container>
			<StyledProducts>
				{cart.products.map(x => (
					<Product
						key={x._id}
						name={x.product.name}
						price={x.product.discountedPrice || x.product.price}
						quantity={x.quantity}
						imgUrl={'http://localhost:3333/images/' + x.product.imagesURL[0] + '.jpg'}
					/>
				))}
			</StyledProducts>

			<StyledSummary>
				<div>{`TOTAL: ${cart.totalQuantity} produse`}</div>
				<div>{`${cart.totalPrice} lei`}</div>
			</StyledSummary>
		</Container>
	);
};

export default Info;
