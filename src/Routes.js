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
import Wishlist from './components/Wishlist';
import UserInfo from './components/UserInfo/UserInfo';
import ProductQuestion from './components/Forms/ProductQuestion';
import UserReviews from './components/UserReviews';
import UserQuestions from './components/UserQuestions';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Orders from './components/UserInfo/Orders';
import Order from './components/UserInfo/Order';
import FrontPage from './components/FrontPage/FrontPage';
import useIsAuthenticated from './hooks/useIsAuthenticated';
import AdminPanel from './components/AdminPanel/AdminPanel';

const Routes = () => {
	const [ isAuthenticated, token, redirectToLogin, isAdmin ] = useIsAuthenticated();

	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			{isAuthenticated && isAdmin ? (
				<Route path="/admin" component={AdminPanel} />
			) : (
				<React.Fragment>
					<Route path="/" component={Navbar} />
					<Switch>
						<Route path="/admin" component={AdminPanel} />
						<Route path="/signup" component={isAuthenticated ? undefined : SignUp} />
						<Route path="/login" component={isAuthenticated ? undefined : LogIn} />
						<Route path="/recovery" component={isAuthenticated ? undefined : PasswordRecovery} />
						<Route path="/reset/:token" component={isAuthenticated ? undefined : PasswordReset} />
						<Route path="/search" component={ProductsSection} />
						<Route path="/promotions" component={ProductsSection} />
						<Route path="/orders/:id" component={Order} />
						<Route path="/orders" component={Orders} />
						<Route path="/reviews" component={UserReviews} />
						<Route path="/cart" component={ShoppingCart} />
						<Route path="/questions" component={UserQuestions} />
						<Route path="/cat/:category" component={ProductsSection} />
						<Route path="/compare" component={ComparisonPage} />
						<Route path="/review/:productName" component={ProductReview} />
						<Route path="/question/:productName" component={ProductQuestion} />
						<Route path="/wishlist" component={Wishlist} />
						<Route path="/info" component={UserInfo} />
						<Route path="/cart" />
						<Route path="/:productName" component={ProductPage} />
						<Route path="/" component={FrontPage} />{' '}
					</Switch>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default Routes;
