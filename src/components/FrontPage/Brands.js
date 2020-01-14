import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function importAll(r) {
	return r.keys().map(r);
}

const images = importAll(require.context('../../assets/images/brands', false, /\.(png|jpe?g|svg)$/));

const StyledBrands = styled.div`
	width: var(--primary-width);
	margin: auto;
	margin-bottom: 5rem;
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

	height: 40rem;

	a {
		display: flex;
		justify-content: center;
		align-content: center;
	}

	img {
		width: 50%;
	}

	@media (max-width: 850px) {
		img {
			width: 70%;
		}
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
					<Link key={index} to={`/search?query=${brandNames[index]}`}>
						<img src={x} />
					</Link>
				))}
			</Container>
		</StyledBrands>
	);
};

export default Brands;
