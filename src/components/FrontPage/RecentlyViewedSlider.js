import React, { useEffect, useState } from 'react';
import Slider from '../Slider';
import Product from '../Product/Product';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import { SliderContainer, SliderTitle } from '../../styles';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
// const StyledSpinner = styled(Spinner)`
// margin-top:25rem`;
const StyledSpinner = styled(Spinner)`left:50vw;

top:25rem;
position:absolute;`;
const RecentlyViewedSlider = ({ itemsPerSlide, numberOfItems }) => {
	const [ loading, setLoading ] = useState(false);
	const [ products, setProducts ] = useState([]);
	let productsIds = [];
	productsIds = localStorage.getObject('viewed-products');
	let productsRendered = [];
	if (!loading) {
		productsRendered = products.map((x) => (
			<Product
				quantity={x.quantity}
				key={x._id}
				_id={x._id}
				name={x.name}
				price={x.price}
				discountedPrice={x.discountedPrice}
				category={x.category}
				imagesURL={x.imagesURL}
				reviews={x.reviews}
			/>
		));
	}

	console.log(products, productsRendered);
	useEffect(() => {
		const fetchData = async () => {
			let productsIds = [];
			productsIds = localStorage.getObject('viewed-products');
			console.log(productsIds);
			if (productsIds === null || productsIds.length === 0) return;

			setLoading(true);
			const response = await axios.post(`http://localhost:3333/products/productsByIds`, {
				productsIds: productsIds
			});

			setProducts(response.data.reverse());

			setLoading(false);
		};
		fetchData();
	}, []);

	return (
		<React.Fragment>
			{productsIds == null || productsIds.length === 0 ? (
				undefined
			) : (
				<SliderContainer>
					{loading ? (
						undefined
					) : (
						<React.Fragment>
							<SliderTitle>
								<div>Recent vizitate de catre dvs.</div>
							</SliderTitle>
							<Slider items={productsRendered} initialItemsPerSlide={itemsPerSlide} />
						</React.Fragment>
					)}
				</SliderContainer>
			)}
		</React.Fragment>
	);
};

export default RecentlyViewedSlider;
