import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar/Navbar';
import PromotionSlideshow from './components/PromotionsSlideshow/PromotionsSlideshow';
import Brands from './components/Brands/Brands';
import Newsletter from './components/Newsletter/Newsletter';
import ProductsSection from './components/ProductsSection/ProductsSection';
import ProductPage from './components/ProductPage/ProductPage';
import ComparePage from './components/ComparePage/ComparePage';
import Routes from './Routes';
import useVerification from './hooks/useVerification';
import { useDispatch } from 'react-redux';
import isTokenExpired from './helpers/isTokenExpired';
import { setIsLogged } from './store/Actions/ProductsActions';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(isTokenExpired('authorization'));
		if (!isTokenExpired('authorization')) dispatch(setIsLogged(true));
	}, []);
	return (
		<Router>
			<div className="App">
				<Navbar />
				{/* <PromotionSlideshow />
				<Brands />
				<Newsletter /> */}
			</div>
			<Routes />
		</Router>
	);
};

export default App;
