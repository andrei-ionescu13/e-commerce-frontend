import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setIsLogged } from '../../store/Actions/ProductsActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import isTokenExpired from '../../helpers/isTokenExpired';
import Modal from '../Modal';
import { PortalWithState } from 'react-portal';
import AdressForm from './AdressForm';

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
`;

const StyledLine = styled.div`
	height: 1px;
	background: gray;
	width: 100%;
	margin: 2rem 0;
`;

const StyledAdressInfo = styled.div`
	line-height: 1.7;
	margin: 0;
	padding: 0;
`;

const Bold = styled.span`font-weight: bold;`;

const Adress = ({ setAdresses, id, firstName, lastName, phone, county, city, adress }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const deleteAdressHandler = async () => {
		if (isTokenExpired('Authorization')) {
			Cookies.remove('Authorization');
			dispatch(setIsLogged(false));
			history.push('/login');
		}
		const token = Cookies.get('Authorization');
		try {
			const headers = { Authorization: token };
			const response = await axios.delete(`http://localhost:3333/user/adress/${id}`, { headers: headers });
			const adressId = response.data.id;
			console.log(adressId);
			setAdresses(adresses => adresses.filter(x => x._id != adressId));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<FlexContainer>
				<StyledAdressInfo>
					<Bold> {`${lastName} ${firstName} - ${phone}`}</Bold>
					<br />
					{adress}
					<br />
					{`${county} ${city}`}
				</StyledAdressInfo>
				<div>
					<StyledButton onClick={deleteAdressHandler}>Sterge</StyledButton>
					<PortalWithState closeOnOutsideClick closeOnEsc>
						{({ openPortal, closePortal, isOpen, portal }) => (
							<React.Fragment>
								<StyledButton onClick={openPortal}>Modifica</StyledButton>
								{portal(
									<Modal close={closePortal}>
										<AdressForm
											setAdresses={setAdresses}
											closePortal={closePortal}
											history={history}
											dispatch={dispatch}
											firstName={firstName}
											lastName={lastName}
											phone={phone}
											county={county}
											city={city}
											adress={adress}
											id={id}
										/>
									</Modal>
								)}
							</React.Fragment>
						)}
					</PortalWithState>
				</div>
			</FlexContainer>
			<StyledLine />
		</React.Fragment>
	);
};

export default Adress;
