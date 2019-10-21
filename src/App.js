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

const App = () => {
	const { getToken, isExpired } = useVerification('authorization');
	isExpired();
	useEffect(() => {
		console.log('In App');
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					{/* <PromotionSlideshow />
				<Brands />
				<Newsletter /> */}
				</div>
				<Routes />
			</Router>
		</Provider>
	);
};

export default App;
