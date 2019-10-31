import React, { useState, useEffect } from 'react';
import Product from '../components/Product/Product';
import useWindowSize from './useWindowSize';

const useSlideshow = numberItems => {
	// const { width } = useWindowSize();
	// const [ slide, setSlide ] = useState(0);
	// const [ showPrevious, setShowPrevious ] = useState(false);
	// const [ showNext, setShowNext ] = useState(false);
	// const onClickNext = () => {
	// 	setSlide(slide => slide + 1);
	// };
	// const onClickPrevious = () => {
	// 	setSlide(slide => slide - 1);
	// };
	// useEffect(
	// 	() => {
	// 		if (width < 1240) setNumberItemsShown(4);
	// 		else if (width < 1420) setNumberItemsShown(5);
	// 		else setNumberItemsShown(6);
	// 	},
	// 	[ width ]
	// );
	// useEffect(
	// 	() => {
	// 		if (slide !== 0) setShowPrevious(true);
	// 		else setShowPrevious(false);
	// 	},
	// 	[ slide, width ]
	// );
	// useEffect(
	// 	() => {
	// 		if (Math.ceil(items.length / numberItemsShown) === slide + 1) setShowNext(false);
	// 		else setShowNext(true);
	// 	},
	// 	[ slide, width ]
	// );
	// ///
	// useEffect(() => {
	// 	const items = [];
	// 	for (let index = 0; index < 10; index++) {
	// 		items.push(<Product name={index} />);
	// 	}
	// 	setItems(items);
	// 	if (Math.ceil(items.length / numberItemsShown) === slide + 1) setShowNext(false);
	// 	else setShowNext(true);
	// }, []);
	// ///
	// useEffect(
	// 	() => {
	// 		if (items.slice(numberItemsShown * slide).length === 0 && slide) {
	// 			console.log(items.slice(numberItemsShown * slide).length === 0);
	// 			setSlide(slide => slide - 1);
	// 		}
	// 	},
	// 	[ width ]
	// );
	// return [ items, slide, numberItemsShown, showPrevious, showNext, onClickPrevious, onClickNext ];
};

export default useSlideshow;
