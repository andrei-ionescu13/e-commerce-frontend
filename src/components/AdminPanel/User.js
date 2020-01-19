import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledUser = styled.div`
	padding: .5rem 1rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	border: 1px solid #888;
	border-bottom: none;
	font-size: 1.6rem;

	&:nth-last-child(1) {
		border-bottom: 1px solid #888;
	}

	> div {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: .5rem;
	}

	h3 {
		grid-column: 1 / 4;
		text-align: center;
	}
`;

const StyledButton = styled.button`
	font-weight: 600;
	background: transparent;
	color: #005eb8;
	font-size: 1.5rem;
	padding: 0;
	border: none;
	cursor: pointer;
	align-self: flex-end;
	margin: 0;
	grid-column: 3 / 4;
`;

const StyledLink = styled(Link)`
    color:#0074D9;
    text-decoration:none;
    display:inline-block;
   
`;

const StyledAddress = styled.div`
	grid-column: ${props => props.gridColumn || undefined};
	margin: auto;
	flex-flow: column;
`;

const StyledOrder = styled.div`
	grid-column: 1 / 4;
	display: flex;
	justify-content: space-between !important;
`;
const User = ({ id, firstName, lastName, phone, addresses, orders, email, active, createdAt }) => {
	const [ showInfo, setShowInfo ] = useState(false);
	console.log(addresses);
	const handleShowInfo = () => setShowInfo(showInfo => !showInfo);

	return (
		<StyledUser>
			<div>
				Id: <StyledLink to={`/admin/user/${id}`}>{id}</StyledLink>
			</div>
			<div>{`Email: ${email}`}</div>
			<div>{`Telefon: ${phone} `}</div>
			<div>{`Nume: ${lastName}`}</div>
			<div>{`Prenume: ${firstName}`}</div>
			<div>{`Created at: ${new Date(createdAt).toLocaleDateString('ro-RO')}`}</div>
			<div>{`Activat: ${active}`}</div>
			<StyledButton type="button" onClick={handleShowInfo}>
				More Info
			</StyledButton>{' '}
			{showInfo && (
				<React.Fragment>
					<h3>Delivery addresses</h3>
					{addresses.map(x => (
						<StyledAddress>
							<div>{`Nume: ${x.lastName}`}</div>
							<div>{`Prenume: ${x.firstName}`}</div>
							<div>{`Telefon: ${x.phone}`}</div>
							<div>{`Judet: ${x.county}`}</div>
							<div>{`Oras: ${x.city}`}</div>
							<div>{`Adresa: ${x.address}`}</div>
						</StyledAddress>
					))}
					<h3>Orders</h3>
					{orders.map(x => (
						<StyledOrder>
							<div>
								Id: <StyledLink to={`/admin/order/${x}`}>{x._id}</StyledLink>
							</div>
							<div>{`Created at:  ${new Date(x.createdAt).toLocaleDateString('ro-RO')}`}</div>
							<div>{`Status: ${x.status}`}</div>
						</StyledOrder>
					))}
				</React.Fragment>
			)}
		</StyledUser>
	);
};

export default User;
