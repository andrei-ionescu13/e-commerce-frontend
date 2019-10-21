import { Route, Switch, Redirect } from 'react-router-dom';

import React from 'react';
import ProductsSection from './components/ProductsSection/ProductsSection';
import ProductPage from './components/ProductPage/ProductPage';
import ComparePage from './components/ComparePage/ComparePage';
import LogIn from './components/Forms/LogIn';
import SignIn from './components/Forms/SignIn';
import PasswordRecovery from './components/Forms/PasswordRecovery';
import PasswordReset from './components/Forms/PasswordReset';

const Routes = () => {
	return (
		<Switch>
			<Route path="/search" component={ProductsSection} />
			<Route path="/cat/:category" component={ProductsSection} />{' '}
			<Route path="/compare" component={ComparePage} />
			<Route path="/signin" component={SignIn} />
			<Route path="/login" component={LogIn} />
			<Route path="/recovery" component={PasswordRecovery} />
			<Route path="/reset/:token" component={PasswordReset} />
			<Route path="/:productName" component={ProductPage} />
			>
			{/* <Route path="*">
				<Redirect to="/" />
			</Route>
			<Route component={NotFoundRedirect} /> */}
		</Switch>
	);
};

export default Routes;
