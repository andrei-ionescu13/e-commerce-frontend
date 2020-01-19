import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledAnswer = styled.div`
	width: 80%;
	display: flex;
	flex-flow: column;
	border: 1px solid #888;
	border-bottom: none;
	font-size: 1.6rem;
	margin: auto;
	&:nth-last-child(1) {
		border-bottom: 1px solid #888;
	}
`;

const Info = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding: 0 1rem;
	border-bottom: 1px solid #888;
`;

const Content = styled.div`padding: 0 3rem;`;

const StyledLink = styled(Link)`
    color:#0074D9;
    text-decoration:none;
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
	margin: 1rem;
`;
const Answer = ({ userId, content, createdAt, deleteAnswer }) => {
	return (
		<StyledAnswer>
			<Info>
				<div>
					User: <StyledLink to={`/admin/user/${userId}`}> {userId}</StyledLink>
				</div>
				<div>{`Data: ${new Date(createdAt).toLocaleDateString('ro-RO')}`}</div>
			</Info>
			<Content>
				Raspuns:<br />
				{content}
			</Content>
			<StyledButton onClick={deleteAnswer}>Delete</StyledButton>
		</StyledAnswer>
	);
};

export default Answer;
