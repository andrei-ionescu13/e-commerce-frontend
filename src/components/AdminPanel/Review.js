import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledReview = styled.div`
	display: flex;
	flex-flow: column;
	border: 1px solid #888;
	border-bottom: none;
	font-size: 1.6rem;

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

const DeleteButton = styled.button`
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

const StyledLink = styled(Link)`
    color:#0074D9;
    text-decoration:none;
`;

const Review = ({ id, productId, userId, rating, review, deleteReview, createdAt }) => {
	return (
		<StyledReview>
			<Info>
				<div>
					Id: <StyledLink to={`/admin/review/${id}`}>{id}</StyledLink>{' '}
				</div>
				<div>
					Product: <StyledLink to={`/admin/product/${productId}`}>{productId}</StyledLink>{' '}
				</div>
				<div>
					User: <StyledLink to={`/admin/user/${userId}`}> {userId}</StyledLink>
				</div>
				<div>{`Data: ${new Date(createdAt).toLocaleDateString('ro-RO')}`}</div>
				<div>{`Rating: ${rating}`}</div>
			</Info>
			<Content>
				Review:<br />
				{review}
			</Content>
			<DeleteButton onClick={deleteReview}>Sterge</DeleteButton>
		</StyledReview>
	);
};

export default Review;
