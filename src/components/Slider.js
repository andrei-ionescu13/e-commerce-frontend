import React, { useState, useEffect } from 'react';
import { ReactComponent as LeftArrowIcon } from '../assets/icons/left-arrow.svg';
import { ReactComponent as RightArrowIcon } from '../assets/icons/right-arrow.svg';
import styled from 'styled-components';

const StyledSlider = styled.div`
	width: 80vw;
	margin: auto;
	position: relative;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
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
	left: -6rem;

	&:hover {
		background-color: var(--primary-color);
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
`;

const Slider = ({ items, itemsPerSlide }) => {
	const [ slide, setSlide ] = useState(0);
	const [ showPrevious, setShowPrevious ] = useState(false);
	const [ showNext, setShowNext ] = useState(false);

	const handleClickNext = () => {
		setSlide(slide => slide + 1);
	};

	const handleClickPrevious = () => {
		setSlide(slide => slide - 1);
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
