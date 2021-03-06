import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
	color: ${props => props.color || 'var(--primary-color)'};
	font-size: ${props => props.font || '2rem'};

	margin: 0 auto;
	margin-top: ${props => props.top};

	width: ${props => props.width || '1rem'};
	height: ${props => props.width || '1rem'};
	border-radius: 50%;
	position: relative;
	text-indent: -9999em;
	-webkit-animation: load4 1.3s infinite linear;
	animation: load4 1.3s infinite linear;
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);
	z-index: 2;
	@keyframes load4 {
		0%,
		100% {
			box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em,
				-3em 0 0 -1em, -2em -2em 0 0;
		}
		12.5% {
			box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em,
				-3em 0 0 -1em, -2em -2em 0 -1em;
		}
		25% {
			box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em,
				-3em 0 0 -1em, -2em -2em 0 -1em;
		}
		37.5% {
			box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em,
				-3em 0em 0 -1em, -2em -2em 0 -1em;
		}
		50% {
			box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0,
				-3em 0em 0 -1em, -2em -2em 0 -1em;
		}
		62.5% {
			box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em,
				-3em 0 0 0, -2em -2em 0 -1em;
		}
		75% {
			box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0,
				-3em 0em 0 0.2em, -2em -2em 0 0;
		}
		87.5% {
			box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0,
				-3em 0em 0 0, -2em -2em 0 0.2em;
		}
	}
`;

const Spinner = ({ width, height, font, color, top, className }) => {
	return (
		<StyledSpinner className={className} width={width} height={height} font={font} color={color} top={top}>
			Loading...
		</StyledSpinner>
	);
};

export default Spinner;
