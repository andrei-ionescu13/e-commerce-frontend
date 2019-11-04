import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UserIcon } from '../../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const StyledUserDropdown = styled.div`
	position: relative;
	display: flex;
	flex-flow: center;
	justify-content: center;
	&:hover {
		> div {
			display: flex;
			flex-flow: column;
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

const StyledUserIconButton = styled.button`
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
	fill:var(--primary-color);
	width:3.5rem;
	height:100%;
    
`;

const UserDropdown = () => {
	return (
		<StyledUserDropdown>
			<StyledUserIconButton>
				<StyledUserIcon />
			</StyledUserIconButton>
			<StyledContent>
				<Link to="/info">Date Personale</Link>
				<Link to="/reviews">Review-urile mele</Link>
				<Link to="/questions">Intrebarile mele</Link>
				<Link to="/wishlist">Wishlist</Link>
				<LogoutButton />
			</StyledContent>
		</StyledUserDropdown>
	);
};

export default UserDropdown;
