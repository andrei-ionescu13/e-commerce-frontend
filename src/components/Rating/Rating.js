import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Star from './Star';

const StyledRating = styled.div`
	display: flex;
	align-items: center;
	min-height: ${props => props.height};
`;

const StarButton = styled.button`
	cursor: ${props => props.cursor || undefined};
	border: none;
	background: transparent;
	padding: 0;
	outline: none;
`;

const Message = styled.div`
	font-size: 2rem;
	margin-left: 1rem;
`;

const messages = [ 'Nu recomand', 'Slab', 'Acceptabil', 'Bun', 'Excelent' ];

const Rating = ({
	value,
	setValue,
	count,
	showEmpty = false,
	selectable = false,
	showMessage = false,
	color = '#FFD700',
	inactiveColor = 'gray',
	width
}) => {
	const [ hovered, setHovered ] = useState(0);
	inactiveColor = showEmpty ? inactiveColor : 'transparent';

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
			if (hovered > index) return color;
		} else if (Math.ceil(value) > index) return color;
		return inactiveColor;
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
				cursor={selectable ? 'pointer' : undefined}
			>
				<Star
					width={width}
					color={getColor(index)}
					val={hovered > 0 ? hovered : (value - index).toFixed(2)}
					inactiveColor={inactiveColor}
				/>
			</StarButton>
		);
	}

	return (
		<React.Fragment>
			<StyledRating height={width} onMouseLeave={() => handleMouseLeave()}>
				{starsRendered}
			</StyledRating>
			{showMessage && <Message>{getMessage()}</Message>}
		</React.Fragment>
	);
};

export default Rating;
