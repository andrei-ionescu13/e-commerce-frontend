import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function importAll(r) {
	return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/brands', false, /\.(png|jpe?g|svg)$/));

const StyledBrands = styled.div`
	width: 80vw;
	margin: auto;
`;

const StyledTitle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--primary-color);
	height: 4rem;
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 2rem;
	grid-row-gap: 4rem;
	height: 40vh;

	a {
		display: flex;
		justify-content: center;
		align-content: center;
	}

	img {
		max-width: 50%;
	}
`;

const Brands = () => {
	const brandNames = images.map(x => x.split(/[\/\.]/)[3].replace('-', ' '));
	console.log(brandNames);
	return (
		<StyledBrands>
			<StyledTitle>Cele mai bune branduri</StyledTitle>
			<Container>
				{images.map((x, index) => (
					<Link key={index} to={`/search?keyword=${brandNames[index]}`}>
						<img src={x} />
					</Link>
				))}
			</Container>
		</StyledBrands>
	);
};

export default Brands;
