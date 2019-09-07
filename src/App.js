import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar/Navbar';
import PromotionSlideshow from './components/PromotionsSlideshow/PromotionsSlideshow';
import Brands from './components/Brands/Brands';
import Newsletter from './components/Newsletter/Newsletter';
import ProductsSection from './components/ProductsSection/ProductsSection';
const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					{/* <PromotionSlideshow />
				<Brands />
				<Newsletter /> */}
				</div>

				<Route path="/:categoryOrSearch" component={ProductsSection} />
			</Router>
		</Provider>
	);
};

export default App;
