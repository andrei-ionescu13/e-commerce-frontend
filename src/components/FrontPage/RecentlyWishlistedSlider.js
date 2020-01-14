import React from 'react';
import Slider from '../Slider';
import Product from '../Product/Product';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import { SliderContainer, SliderTitle } from '../../styles';
import Spinner from '../Spinner/Spinner';

const StyledSpinner = styled(Spinner)`
left:50vw;
top:25rem;
position:absolute;`;

const RecentlyWishlistedSlider = ({ itemsPerSlide, numberOfItems }) => {
	const [ products, loading ] = useFetch(`http://localhost:3333/productInformation/recently-wishlisted`);

	console.log(products);
	let productsRendered = [];
	if (!loading) {
		productsRendered = products.map(x => (
			<Product
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

	return (
		<React.Fragment>
			{products != undefined &&
			products.length > 0 && (
				<SliderContainer>
					{loading ? (
						undefined
					) : (
						<React.Fragment>
							<SliderTitle>
								<div>Recent adaugate la Favorite</div>
							</SliderTitle>
							<Slider items={productsRendered} initialItemsPerSlide={itemsPerSlide} />
						</React.Fragment>
					)}
				</SliderContainer>
			)}
		</React.Fragment>
	);
};

export default RecentlyWishlistedSlider;
