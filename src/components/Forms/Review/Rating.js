import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as StarIcon } from '../../../assets/icons/star.svg';

const StyledRating = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
`;

const StarButton = styled.button`
	cursor: pointer;
	border: none;
	background: transparent;
	padding: 0;
	outline: none;
`;

const Message = styled.div`
	font-size: 2rem;
	margin-left: 1rem;
`;

const StyledStarIcon = styled(StarIcon)`
    width:3rem;
    fill:${props => props.color}
`;

const messages = [ 'Nu recomand', 'Slab', 'Acceptabil', 'Bun', 'Excelent' ];

const Rating = ({ value, setValue, count, showEmpty, selectable, showMessage }) => {
	const [ hovered, setHovered ] = useState(0);

	useEffect(
		() => {
			console.log(hovered);
		},
		[ hovered ]
	);
	const handleClick = e => {
		e.preventDefault();
		if (!selectable) return;
		setValue(e.currentTarget.value);
		console.log('he', e.currentTarget.value);
	};

	const handleMouseOver = e => {
		e.preventDefault();
		if (!selectable) return;
		setHovered(e.currentTarget.value);
	};

	const handleMouseLeave = () => {
		if (!selectable) return;
		setHovered(0);
	};

	const getColor = index => {
		if (hovered > 0) {
			if (hovered > index) return '#FFD700';
		} else if (value > index) return '#FFD700';
		return 'gray';
	};

	const getMessage = () => {
		if (hovered > 0) {
			return messages[hovered - 1];
		}
		return messages[value - 1];
	};

	const starsRendered = [];

	for (let index = 0; index < count; index++) {
		if (!showEmpty && index >= value) continue;
		starsRendered.push(
			<StarButton
				key={index}
				value={index + 1}
				onMouseOver={e => handleMouseOver(e)}
				onClick={e => handleClick(e)}
			>
				<StyledStarIcon color={getColor(index)} />
			</StarButton>
		);
	}

	return (
		<StyledRating onMouseLeave={() => handleMouseLeave()}>
			{starsRendered}
			{showMessage && <Message>{getMessage()}</Message>}
		</StyledRating>
	);
};

export default Rating;
