import React from 'react';
import Rating from '../Rating/Rating';
import styled from 'styled-components';

const RatingsInfo = styled.div`
	font-size: 1.5rem;
	padding-left: .5rem;
`;

const getAverageRating = reviews => {
	if (reviews.length === 0) return [ 0, 0 ];
	let total = 0;
	let i = 0;
	reviews.map(review => review.rating).forEach(x => {
		total += x;
		i++;
	});
	return [ total / i, i ];
};

const ProductRating = ({ reviews, width }) => {
	const [ averageRating, ratingsNumber ] = getAverageRating(reviews);
	return (
		<React.Fragment>
			<Rating value={averageRating} count={5} width={width} />
			{averageRating > 0 && <RatingsInfo>{`${averageRating} (${ratingsNumber})`}</RatingsInfo>}
		</React.Fragment>
	);
};

export default ProductRating;
