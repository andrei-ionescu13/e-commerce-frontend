import React, { useState, useEffect } from 'react';
import { ReactComponent as LeftArrowIcon } from '../assets/icons/left-arrow.svg';
import { ReactComponent as RightArrowIcon } from '../assets/icons/right-arrow.svg';
import styled from 'styled-components';
import useWindowDimensions from '../hooks/useWindowSize';

const StyledSlider = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-gap: 4rem;

	@media (max-width: 1200px) {
		grid-template-columns: repeat(5, 1fr);
	}
	@media (max-width: 1000px) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media (max-width: 750px) {
		grid-template-columns: repeat(3, 1fr);
	}
	/* display: flex;
	justify-content: flex-start;

	> div {
		flex-basis: calc(100% / 6);
	} */
`;

const StyledLeftArrow = styled.button`
	position: absolute;
	align-self: center;
	padding: .5rem 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	outline: none;
	background-color: transparent;
	border: .2rem solid var(--primary-color);
	z-index: 1;
	left: -6rem;

	&:hover {
		background-color: var(--primary-color);
	}

	@media (max-width: 1200px) {
		left: 0;
	}
`;

const StyledRightArrow = styled.button`
	position: absolute;
	align-self: center;
	padding: .5rem 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	outline: none;
	background-color: transparent;
	border: .2rem solid var(--primary-color);
	right: -6rem;

	&:hover {
		background-color: var(--primary-color);
	}

	@media (max-width: 1200px) {
		right: 0;
	}
`;

const Slider = ({ items, initialItemsPerSlide }) => {
	const [ slide, setSlide ] = useState(0);
	const [ showPrevious, setShowPrevious ] = useState(false);
	const [ showNext, setShowNext ] = useState(false);
	const [ itemsPerSlide, setItemsPerSlide ] = useState(initialItemsPerSlide);

	const { width } = useWindowDimensions();

	console.log('itemsPerSlide', itemsPerSlide);

	useEffect(
		() => {
			if (width < 750) setItemsPerSlide(initialItemsPerSlide - 3);
			else if (width < 1000) setItemsPerSlide(initialItemsPerSlide - 2);
			else if (width < 1200) setItemsPerSlide(initialItemsPerSlide - 1);
			else setItemsPerSlide(initialItemsPerSlide);
		},
		[ width ]
	);

	const handleClickNext = () => {
		setSlide((slide) => slide + 1);
	};

	const handleClickPrevious = () => {
		setSlide((slide) => slide - 1);
	};

	useEffect(
		() => {
			if (slide !== 0) setShowPrevious(true);
			else setShowPrevious(false);
		},
		[ slide ]
	);

	useEffect(
		() => {
			if (Math.ceil(items.length / itemsPerSlide) === slide + 1) setShowNext(false);
			else setShowNext(true);
		},
		[ slide ]
	);

	return (
		<StyledSlider>
			{showPrevious && (
				<StyledLeftArrow onClick={handleClickPrevious}>
					<LeftArrowIcon width="2rem" />
				</StyledLeftArrow>
			)}
			{items.slice(itemsPerSlide * slide, itemsPerSlide * (slide + 1))}
			{showNext && (
				<StyledRightArrow onClick={handleClickNext}>
					<RightArrowIcon width="2rem" />
				</StyledRightArrow>
			)}
		</StyledSlider>
	);
};

export default Slider;
