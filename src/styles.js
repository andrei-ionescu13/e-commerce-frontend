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

	input {
		margin-bottom: 1.5rem;
		width: 100%;
		height: 4rem;
		border: none;
		border-bottom: 2px solid lightgray;
		padding-left: 1rem;
		font-size: 1.7rem;
		outline: none;
		&:focus {
			border-bottom: 2px solid rgba(255, 99, 71, 1);

			&::placeholder {
				color: rgba(255, 99, 71, 1);
				opacity: 1; /* Firefox */
			}
		}
	}

	button {
		width: 30%;
		height: 4rem;
		color: rgba(255, 99, 71, 1);
		font-size: 2.2rem;
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

export const SliderContainer = styled.div`
	width: var(--primary-width);
	margin: 0 auto 2rem auto;
	min-height: 49rem;
	position: relative;
`;

export const SliderTitle = styled.div`
	margin: 0 auto 4rem auto;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	background-color: var(--primary-color);
	padding: .5rem 0;
	a {
		font-size: 1.5rem;
		color: #005eb8;
	}
`;

export const PaginationWrapper = styled.div`
	.pagination {
		margin: ${props => (props.admin ? '20rem auto 4rem auto' : 'auto 9rem auto 0')};
		display: flex;
		list-style-type: none;
		justify-content: center;
		align-content: center;

		@media (max-width: 1050px) {
			font-size: 1.3rem;
		}
	}

	.page,
	.previous-page,
	.next-page {
		user-select: none;
		color: ${props => (props.admin ? '#6d76db' : 'var(--primary-color)')};
		cursor: pointer;
		border: 1.5px solid ${props => (props.admin ? '#6d76db' : 'var(--primary-color)')};
		padding: .4rem 1.5rem;
		margin: 0 .2rem;
		outline: none;
	}
	.page:hover,
	.previous-page:hover,
	.next-page:hover,
	.page:focus {
		background-color: ${props => (props.admin ? '#6d76db' : 'var(--primary-color)')};
		color: black;
	}

	.active {
		background-color: ${props => (props.admin ? '#6d76db' : 'var(--primary-color)')};
		color: black;
	}

	.break-me {
		cursor: pointer;
		color: ${props => (props.admin ? '#6d76db' : 'var(--primary-color)')};
	}
`;
