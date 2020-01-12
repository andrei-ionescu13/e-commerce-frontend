import React from 'react';
import styled from 'styled-components';

const StyledDeleteButton = styled.button`
	font-weight: 600;
	background: transparent;
	color: #005eb8;
	padding: 0;
	margin: 0;
	border: none;
	cursor: pointer;
`;

export const DeleteButton = ({ onClick, disabled }) => (
	<StyledDeleteButton disabled={disabled} onClick={onClick}>
		Sterge
	</StyledDeleteButton>
);
