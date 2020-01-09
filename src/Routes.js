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
import Wishlist from './components/Wishlist';
import PromotionsSlider from './components/PromotionsSlider';
import UserInfo from './components/UserInfo/UserInfo';
import ProductQuestion from './components/Forms/ProductQuestion';
import UserReviews from './components/UserReviews';
import UserQuestions from './components/UserQuestions';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

const Routes = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<React.Fragment>
			<Route path="/" component={Navbar} />

			<Switch>
				<Route path="/search" component={ProductsSection} />
				<Route path="/promotions" component={ProductsSection} />
				<Route path="/reviews" component={UserReviews} />
				<Route path="/cart" component={ShoppingCart} />
				<Route path="/questions" component={UserQuestions} />
				<Route path="/cat/:category" component={ProductsSection} />
				<Route path="/compare" component={ComparisonPage} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={LogIn} />
				<Route path="/recovery" component={PasswordRecovery} />
				<Route path="/reset/:token" component={PasswordReset} />
				<Route path="/review/:productName" component={ProductReview} />
				<Route path="/question/:productName" component={ProductQuestion} />
				<Route path="/wishlist" component={Wishlist} />
				<Route path="/info" component={UserInfo} />
				<Route path="/cart" />
				<Route path="/:productName" component={ProductPage} />
				<Route
					path="/"
					render={() => (
						<React.Fragment>
							<PromotionsSlider itemsPerSlide={6} numberOfItems={20} />
							<Brands />
						</React.Fragment>
					)}
				/>
			</Switch>
		</React.Fragment>
	);
};

export default Routes;
