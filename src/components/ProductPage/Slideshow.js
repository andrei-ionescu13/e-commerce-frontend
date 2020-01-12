import React, { useState, useEffect } from 'react';
import Discount from '../Product/Discount';
import styled from 'styled-components';

const StyledSlideshow = styled.div`
	grid-area: s;
	justify-content: center;
	/* height: 100%; */
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

const MainImage = styled.img`
	width: 45rem;
	margin-bottom: 5rem;

	@media (max-width: 850px) {
		width: 80%;
	}
`;

const SecondaryImages = styled.div`
	img {
		cursor: pointer;
		width: 6rem;
		margin: 0 .3rem;
		border: solid 1px lightgray;
		margin-bottom: 1rem;

		@media (max-width: 850px) {
			width: 3rem;
		}
	}
`;

const Slideshow = ({ imagesURL, productName, price, discountedPrice }) => {
	const images = imagesURL.map(x => 'http://localhost:3333/images/' + x + '.jpg');
	const [ mainImage, setMainImage ] = useState();

	useEffect(
		() => {
			setMainImage(images[0]);
		},
		[ productName ]
	);

	const onClickHandler = e => {
		setMainImage(e.target.src);
	};

	return (
		<StyledSlideshow>
			<Discount price={price} discountedPrice={discountedPrice} />
			<MainImage src={mainImage} alt={productName} />
			<SecondaryImages>
				{images.map((x, index) => (
					<img src={x} key={index} alt={productName} onClick={e => onClickHandler(e)} />
				))}
			</SecondaryImages>
		</StyledSlideshow>
	);
};

export default Slideshow;
