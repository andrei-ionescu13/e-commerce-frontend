import React from 'react';
import image1 from '../../assets/images/CPU.jpg';
import styled from 'styled-components';

const StyledBanner = styled.div`
	flex: 1;
	img {
		width: 100%;
		height: 45rem;
	}
`;

const Banner = () => {
	return (
		<StyledBanner>
			<img src={image1} alt="nvidia" />
		</StyledBanner>
	);
};

export default Banner;
