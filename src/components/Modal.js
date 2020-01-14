import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: 3;
	padding-top: 100px;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
`;
const Modal = ({ children, close }) => {
	const handleClick = e => {
		if (e.target.id === 'modal') close();
	};
	return (
		<StyledModal id="modal" onClick={e => handleClick(e)}>
			{children}
		</StyledModal>
	);
};

export default Modal;
