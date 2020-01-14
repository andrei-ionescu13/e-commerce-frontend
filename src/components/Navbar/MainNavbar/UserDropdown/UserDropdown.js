import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UserIcon } from '../../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { PortalWithState } from 'react-portal';
import Modal from '../../../Modal';
import AddressForm from '../../../UserInfo/AddressForm';
import useWindowSize from '../../../../hooks/useWindowSize';

const StyledUserDropdown = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	&:hover {
		> div {
			display: flex;
			flex-flow: column;
			@media (max-width: 700px) {
				display: none;
			}
		}
	}
`;

const StyledContent = styled.div`
	position: absolute;
	display: none;
	z-index: 1;
	background: white;
	top: 6rem;
	width: 10em;
	font-size: 1.7rem;
	border: 1px solid lightgray;
	color: #444;
	> a {
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		color: #444;
		outline: none;
		&:hover,
		&:focus {
			color: var(--primary-color);
		}
	}
`;

const StyledContent2 = styled.div`
	display: flex;
	flex-flow: column;
	z-index: 1;
	background: white;
	width: 30rem;
	height: 30rem;
	font-size: 1.7rem;
	border: 1px solid lightgray;
	padding: 1rem 1rem 5rem 1rem;
	color: #444;
	> a {
		flex: 1;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		color: #444;
		outline: none;
		&:hover,
		&:focus {
			color: var(--primary-color);
		}
	}
`;

const CloseButton = styled.div`
	align-self: flex-end;
	cursor: pointer;
	font-weight: 600;
	background: transparent;
	color: #005eb8;
	font-size: 1.5rem;
`;

const StyledUserIconLink = styled(Link)`
	margin-right: 2rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	height: 6rem;
	width: 6rem;
	border: none;
	background: transparent;



`;

const StyledUserIcon = styled(UserIcon)`
	fill:  var(--primary-color);
	width:3.5rem;
	height:100%;
    @media (max-width: 700px) {
				width:3rem;
			}
`;

const UserDropdown = () => {
	const { width } = useWindowSize();

	return (
		<PortalWithState closeOnOutsideClick closeOnEsc>
			{({ openPortal, closePortal, isOpen, portal }) => (
				<React.Fragment>
					<StyledUserDropdown>
						<StyledUserIconLink to={width < 768 ? '' : '/info'} onClick={width < 768 && openPortal}>
							<StyledUserIcon />
						</StyledUserIconLink>
						<StyledContent>
							<Link to="/info">Date Personale</Link>
							<Link to="/orders">Istoric comenzi</Link>
							<Link to="/reviews">Review-urile mele</Link>
							<Link to="/questions">Intrebarile mele</Link>
							<Link to="/wishlist">Wishlist</Link>
							<LogoutButton />
						</StyledContent>
					</StyledUserDropdown>
					{portal(
						<Modal close={closePortal}>
							<StyledContent2>
								<CloseButton onClick={closePortal}>Inchide</CloseButton>
								<Link to="/info">Date Personale</Link>
								<Link to="/orders">Istoric comenzi</Link>
								<Link to="/reviews">Review-urile mele</Link>
								<Link to="/questions">Intrebarile mele</Link>
								<Link to="/wishlist">Wishlist</Link>
								<LogoutButton />
							</StyledContent2>
						</Modal>
					)}
				</React.Fragment>
			)}
		</PortalWithState>
	);
};

export default UserDropdown;
