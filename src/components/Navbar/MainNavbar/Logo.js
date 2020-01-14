import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled(Link)`
	font-size: 4.5rem;
	color: var(--primary-color);
	text-decoration: none;
	user-select: none;

	@media (max-width: 700px) {
		font-size: 2.3rem;
	}
`;

const Logo = () => <StyledLogo to="/">PCEXPRESS</StyledLogo>;

export default Logo;
