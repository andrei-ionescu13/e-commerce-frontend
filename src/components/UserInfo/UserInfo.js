import React, { useState, useEffect } from 'react';
import UserDataForm from './UserDataForm';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddressForm from './AddressForm';
import { PortalWithState } from 'react-portal';
import Modal from '../Modal';
import Address from './Address';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const Container = styled.div`
	padding: 0 20rem;
	align-items: center;
	background-color: #fdad5c;
	width: 100rem;
	margin: 3rem auto 0 auto;
	padding-top: 3rem;
	border-radius: 1rem;
`;

const AddAddressButton = styled.button`
	height: 3.5rem;
	width: 11rem;
	border: 2px solid var(--primary-color);
	background: white;
	cursor: pointer;
	font-size: 1.3rem;
	border-radius: .3rem;

	&:hover {
		background: var(--primary-color);
		color: white;
	}
`;

const AddressesContainer = styled.div`
	width: 100%;
	border: 1px solid lightgray;
	padding: 2rem;
	box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	-webkit-box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.75);
	background-color: white;
`;
const UserInfo = () => {
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ dateOfBirth, setDateOfBirth ] = useState(null);
	const [ addresses, setAddresses ] = useState([]);

	const [ isAuthenticated, token, redirectToLogin ] = useIsAuthenticated();

	useEffect(() => {
		const fetchData = async () => {
			if (!isAuthenticated) {
				redirectToLogin();
			}

			  
 
			try {
				const headers = { Authorization: token };
				const response = await axios.get('http://localhost:3333/user/data', { headers: headers });
				const user = response.data;
				setFirstName(user.firstName);
				setLastName(user.lastName);
				setPhone(user.phone);
				setDateOfBirth(user.dateOfBirth);
				setAddresses(user.deliveryAddresses);
			} catch (error) {}
		};
		fetchData();
	}, []);

	return (
		<Container>
			<UserDataForm firstName={firstName} lastName={lastName} phone={phone} dateOfBirth={dateOfBirth} />
			<h3>Adrese</h3>
			<AddressesContainer>
				{addresses.length === 0 ? (
					<h5>Nu aveti nici o adresa</h5>
				) : (
					addresses.map(x => (
						<Address
							setAddresses={setAddresses}
							key={x._id}
							id={x._id}
							firstName={x.firstName}
							lastName={x.lastName}
							phone={x.phone}
							county={x.county}
							city={x.city}
							address={x.address}
						/>
					))
				)}
				<PortalWithState closeOnOutsideClick closeOnEsc>
					{({ openPortal, closePortal, isOpen, portal }) => (
						<React.Fragment>
							<AddAddressButton onClick={openPortal}>Adauga adresa</AddAddressButton>
							{portal(
								<Modal close={closePortal}>
									<AddressForm setAddresses={setAddresses} closePortal={closePortal} />
								</Modal>
							)}
						</React.Fragment>
					)}
				</PortalWithState>
			</AddressesContainer>
		</Container>
	);
};

export default UserInfo;
