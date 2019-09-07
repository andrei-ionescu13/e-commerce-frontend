import React from 'react';
import { ReactComponent as LeftArrowIcon } from '../../assets/icons/left-arrow.svg';
import { ReactComponent as RightArrowIcon } from '../../assets/icons/right-arrow.svg';
import './PromotionsSlideshow.css';
import useSlideshow from '../../hooks/useSlideshow';

const PromotionSlideshow = () => {
	const [ items, slide, numberItemsShown, showPrevious, showNext, onClickPrevious, onClickNext ] = useSlideshow(4);
	return (
		<div className="promotions">
			<div className="promotions-title">Promotii valabile pana ceva</div>
			<div className="promotions-slideshow">
				{showPrevious && (
					<button className="left-arrow" onClick={onClickPrevious}>
						<LeftArrowIcon width="2rem" />
					</button>
				)}
				{items.slice(numberItemsShown * slide, numberItemsShown * (slide + 1))}
				{showNext && (
					<button className="right-arrow" onClick={onClickNext}>
						<RightArrowIcon width="2rem" />
					</button>
				)}
			</div>
		</div>
	);
};

export default PromotionSlideshow;
