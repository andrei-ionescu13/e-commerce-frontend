import React from 'react';
import Specification from './Specification';
import styled from 'styled-components';

const StyledSpecifications = styled.div`
	margin-top: 6rem;
	display: flex;
	flex-flow: column wrap;
	max-height: 80vh;
	margin-bottom: 10rem;

	> div {
		width: 50%;
		display: flex;
		justify-content: center;
	}

	@media (max-width: 850px) {
		max-height: none;
		> div {
			width: 100%;
		}
	}
`;

const Specifications = ({ specs }) => {
	const specifications = [];

	for (const [ key, value ] of Object.entries(specs)) {
		specifications.push(<Specification key={key} name={key} pairs={value} />);
	}

	return <StyledSpecifications>{specifications}</StyledSpecifications>;
};

export default Specifications;
