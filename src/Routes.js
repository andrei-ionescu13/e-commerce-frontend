import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import ProductsSection from './components/ProductsSection/ProductsSection';
import ProductPage from './components/ProductPage/ProductPage';
import ComparisonPage from './components/ComparisonPage/ComparisonPage';
import LogIn from './components/Forms/LogIn';
import SignUp from './components/Forms/SignUp';
import PasswordRecovery from './components/Forms/PasswordRecovery';
import PasswordReset from './components/Forms/PasswordReset';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProductReview from './components/Forms/ProductReview';
import Navbar from './components/Navbar/Navbar';
import Brands from './components/Brands/Brands';
import Newsletter from './components/Newsletter/Newsletter';
import Promotions from './components/Promotions';
import Wishlist from './components/Wishlist';

const Routes = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<Route path="/" component={Navbar} />
			{/* <Navbar /> */}
			<Switch>
				<Route path="/search" component={ProductsSection} />{' '}
				<Route path="/promotions" component={ProductsSection} />
				<Route path="/cat/:category" component={ProductsSection} />
				<Route path="/compare" component={ComparisonPage} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" render={() => <LogIn dispatch={dispatch} />} />
				<Route path="/recovery" component={PasswordRecovery} />
				<Route path="/reset/:token" component={PasswordReset} />
				<Route path="/review" component={ProductReview} />
				<Route path="/wishlist" component={Wishlist} />
				<Route path="/:productName" component={ProductPage} />
				{/* <Route path="/" component={Brands} /> */}
				>
				{/* <Route path="*">
				<Redirect to="/" />
			</Route>
			<Route component={NotFoundRedirect} /> */}
			</Switch>
		</React.Fragment>
	);
};

export default Routes;
