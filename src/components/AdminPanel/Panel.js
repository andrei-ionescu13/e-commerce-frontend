import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Reviews from './Reviews';
import Questions from './Questions';
import Orders from './Orders';
import Users from './Users';

const StyledPanel = styled.div`
	height: 100%;
	overflow-y: scroll;
	flex: 1;
	background-color: #f7f7fa;
`;

const Panel = () => {
	return (
		<StyledPanel>
			<Switch>
				<Route path="/admin/reviews" component={Reviews} />
				<Route path="/admin/questions" component={Questions} />
				<Route path="/admin/orders" component={Orders} />
				<Route path="/admin/users" component={Users} />
			</Switch>
		</StyledPanel>
	);
};

export default Panel;
