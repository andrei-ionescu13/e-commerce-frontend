import React from 'react';
import Slider from '../Slider';
import Product from '../Product/Product';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import { SliderContainer, SliderTitle } from '../../styles';
import Spinner from '../Spinner/Spinner';

const StyledSpinner = styled(Spinner)`
top:25rem;
position:absolute;`;

const PromotionsSlider = ({ itemsPerSlide, numberOfItems }) => {
	const [ products, loading ] = useFetch(`http://localhost:3333/products/promotions/${numberOfItems}`);

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
								<div>Promotii</div>
								<Link to="/promotions">(Click pentru a vedea toate promotiile)</Link>
							</SliderTitle>
							<Slider items={productsRendered} initialItemsPerSlide={itemsPerSlide} />
						</React.Fragment>
					)}
				</SliderContainer>
			)}
		</React.Fragment>
	);
};

export default PromotionsSlider;
