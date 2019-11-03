import styled from 'styled-components';

export const FormResponses = styled.div`
	margin-top: auto;
	margin-bottom: 4rem;
	user-select: none;
`;

export const FormError = styled.div`
	display: flex;
	justify-content: center;
	color: red;
	margin-top: auto;
	font-size: 1.5rem;
`;

export const FormMessage = styled.div`
	color: green;
	margin-top: auto;
	font-size: 1.5rem;
	align-self: center;
`;

export const StyledContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-flow: column;
	align-items: center;
	padding-top: 5rem;
`;

export const StyledUserForm = styled.form`
	width: 35rem;
	height: 60rem;
	display: flex;
	border: 2px solid rgba(255, 99, 71, 1);
	flex-flow: column;
	align-items: center;
	padding: 12rem 2rem 0 2rem;
	/* border-radius: .5rem; */

	input {
		border-radius: .5rem;
		margin-bottom: 1.5rem;
		width: 100%;
		height: 4rem;
		border: 2px solid lightgray;
		padding-left: 1rem;
		font-size: 1.7rem;

		&:focus {
			outline-color: rgba(255, 99, 71, 1);
			box-shadow: 0 0 3pt 1pt rgba(255, 99, 71, 1);
		}
	}

	button {
		width: 30%;
		height: 4rem;
		color: rgba(255, 99, 71, 1);
		font-size: 2.2rem;
		background-color: whitesmoke;
		border: 2px solid rgba(255, 99, 71, 1);
		cursor: pointer;
		margin-top: 4rem;
		background: transparent;

		&:hover {
			color: white;
			background: rgba(255, 99, 71, 1);
		}

		&:focus {
			outline-color: rgba(255, 99, 71, 1);
			color: white;
			background: rgba(255, 99, 71, 1);
			box-shadow: 0 0 3pt 1pt rgba(255, 99, 71, 1);
		}
	}
`;

export const StyledAlert = styled.div`
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: .4rem;
	position: fixed;
	top: 10vh;
	left: 0;
	right: 0;
	width: 20vw;
	margin: 0 auto;
	padding: 2rem;
	font-size: 1.4rem;
	z-index: 1;
	${({ type }) => {
		switch (type) {
			case 'succes':
				return `
				color: #155724;
    			background-color: #d4edda;
    			border-color: #c3e6cb;`;

			case 'error':
				return `
				color: #721c24;
				background-color: #f8d7da;
				border: 1px solid #f5c6cb;`;
			default:
				break;
		}
	}};
`;
