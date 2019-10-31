import React from 'react';
import Slider from './Slider';
import { useSelector } from 'react-redux';
import { productsSelector } from '../store/Selectors/ProductsSelector';
import Product from './Product/Product';
import styled from 'styled-components';

const StyledTitle = styled.div`
	width: 80vw;
	margin: 0 auto 4rem auto;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--primary-color);
	height: 4rem;
`;

const items = [];
for (let index = 0; index < 10; index++) {
	items.push(<div style={{ background: 'green' }}>index</div>);
}

const PromotionsSlider = () => {
	let products = useSelector(state => productsSelector(state));
	const Rendered = products.map(x => (
		<Product
			key={x._id}
			_id={x._id}
			name={x.name}
			price={x.price}
			discountedPrice={x.discountedPrice}
			category={x.category}
			imagesURL={x.imagesURL}
		/>
	));

	console.log(Rendered);
	return (
		<React.Fragment>
			<StyledTitle>Promotii</StyledTitle>
			<Slider items={Rendered} itemsPerSlide={6} />
		</React.Fragment>
	);
};

export default PromotionsSlider;
