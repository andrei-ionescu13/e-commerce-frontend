import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Panel from './Panel';

const Container = styled.div`
	display: flex;
	height: 100%;
`;

const Sidebar = styled.div`
	height: 100vh;
	width: 15vw;
	background-color: #6d76db;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	position: sticky;
	z-index: 1;
	top: 0;
	left: 0;
	overflow-x: hidden;

	button {
		display: block;
		margin-bottom: 10rem;
		border: none;
		background: transparent;
		color: #f7f7fa;
		font-size: 2.4rem;
		font-weight: bold;
		cursor: pointer;
	}
`;

const LinksContainer = styled.div`
	display: flex;
	flex-flow: column;
	margin: auto 0;
	justify-content: space-evenly;
	height: 30rem;
	width: 15vw;

	a {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		color: #f7f7fa;

		&:hover {
			background: #f7f7fa;
			color: #6d76db;
		}
	}
`;
export const AdminPanel = () => {
	const location = useLocation();

	return (
		<Container>
			<Sidebar>
				<LinksContainer>
					<Link to={`/admin/orders`}>Orders</Link>
					<Link to={`/admin/products`}>Products</Link>
					<Link to={`/admin/users`}>Users</Link>
					<Link to={`/admin/reviews`}>Reviews</Link>
					<Link to={`/admin/questions`}>Questions</Link>
				</LinksContainer>
				<button>Logout</button>
			</Sidebar>
			<Panel />
		</Container>
	);
};

export default AdminPanel;
