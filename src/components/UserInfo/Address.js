import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal';
import { PortalWithState } from 'react-portal';
import AddressForm from './AddressForm';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

const StyledButton = styled.button`
	border: 2px solid var(--primary-color);
	padding: .5rem;
	background: white;
	cursor: pointer;
	margin-left: .5rem;
	border-radius: .3rem;

	&:hover {
		background: var(--primary-color);
		color: white;
	}
`;

const FlexContainer = styled.div`
	font-size: 1.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #888;
	margin-bottom: 2rem;
	padding-bottom: 2rem;
`;

const StyledAddressInfo = styled.div`
	word-wrap: break-word;
	line-height: 1.7;
	margin: 0;
	padding: 0;
	max-width: 70%;
`;

const Bold = styled.span`font-weight: bold;`;

const Address = ({ setAddresses, id, firstName, lastName, phone, county, city, address }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const deleteAddressHandler = async () => {
		if (!isAuthenticated) {
			redirectToLogin();
		}

		try {
			const headers = { Authorization: token };
			const response = await axios.delete(`http://localhost:3333/user/address/${id}`, { headers: headers });
			const addressId = response.data.id;
			console.log(addressId);
			setAddresses(addresses => addresses.filter(x => x._id != addressId));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FlexContainer>
			<StyledAddressInfo>
				<Bold> {`${lastName} ${firstName} - ${phone}`}</Bold>
				<br />
				{address}
				<br />
				{`${county}, ${city}`}
			</StyledAddressInfo>
			<div>
				<StyledButton type="button" onClick={deleteAddressHandler}>
					Sterge
				</StyledButton>
				<PortalWithState closeOnOutsideClick closeOnEsc>
					{({ openPortal, closePortal, isOpen, portal }) => (
						<React.Fragment>
							<StyledButton type="button" onClick={openPortal}>
								Modifica
							</StyledButton>
							{portal(
								<Modal close={closePortal}>
									<AddressForm
										setAddresses={setAddresses}
										closePortal={closePortal}
										history={history}
										dispatch={dispatch}
										firstName={firstName}
										lastName={lastName}
										phone={phone}
										county={county}
										city={city}
										address={address}
										id={id}
									/>
								</Modal>
							)}
						</React.Fragment>
					)}
				</PortalWithState>
			</div>
		</FlexContainer>
	);
};

export default Address;
