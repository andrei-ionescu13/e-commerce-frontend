import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import ProductsSection from './components/ProductsSection/ProductsSection';
import ProductPage from './components/ProductPage/ProductPage';
import ComparisonPage from './components/ComparisonPage/ComparisonPage';
import LogIn from './components/Forms/LogIn';
import SignIn from './components/Forms/SignIn';
import PasswordRecovery from './components/Forms/PasswordRecovery';
import PasswordReset from './components/Forms/PasswordReset';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Review from './components/Forms/Review/Review';
import Navbar from './components/Navbar/Navbar';
import PromotionSlideshow from './components/PromotionsSlideshow/PromotionsSlideshow';
import Brands from './components/Brands/Brands';
import Newsletter from './components/Newsletter/Newsletter';

const Routes = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<Route path="/" component={Navbar} />
			{/* <Navbar /> */}
			<Switch>
				<Route path="/search" component={ProductsSection} />
				<Route path="/cat/:category" component={ProductsSection} />{' '}
				<Route path="/compare" component={ComparisonPage} />
				<Route path="/signin" component={SignIn} />
				<Route path="/login" render={() => <LogIn history={history} />} />
				<Route path="/recovery" component={PasswordRecovery} />
				<Route path="/reset/:token" component={PasswordReset} />
				<Route path="/review" render={() => <Review history={history} />} />
				<Route path="/:productName" component={ProductPage} />
				<Route path="/" component={Brands} />
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
