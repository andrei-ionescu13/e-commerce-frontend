import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import PromotionSlideshow from './components/PromotionsSlideshow/PromotionsSlideshow';
import Brands from './components/Brands/Brands';
import Newsletter from './components/Newsletter/Newsletter';
const App = () => {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<PromotionSlideshow />
				<Brands />
				<Newsletter />
			</div>
		</Router>
	);
};

export default App;
