import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar/Navbar';
import Brands from './components/Brands/Brands';
import ProductsSection from './components/ProductsSection/ProductsSection';
import ProductPage from './components/ProductPage/ProductPage';
import Routes from './Routes';
import { useDispatch, useSelector } from 'react-redux';
import isTokenExpired from './helpers/isTokenExpired';
import { setIsLogged } from './store/Actions/ProductsActions';
import Banner from './components/Banner/Banner';
import CategoriesList from './components/Navbar/SecondNavbar/CategoriesDropdown/CategoriesList';
import Slider from './components/Slider';
import styled from 'styled-components';
import PromotionsSlider from './components/PromotionsSlider';
import Alert from './components/Alert';
import { alertSelector } from './store/Selectors/ProductsSelector';
import { ThemeProvider } from 'styled-components';

const App = () => {
	const dispatch = useDispatch();
	const alert = useSelector(state => alertSelector(state));

	useEffect(() => {
		if (!isTokenExpired('Authorization')) dispatch(setIsLogged(true));
	}, []);
	return (
		<Router>
			<div className="App">
				<Routes />
				{/* <Container>
					<CategoriesList position="relative" display="flex" />
					<Banner />
				</Container>
				<PromotionsSlider /> */}
				{alert.show && <Alert type={alert.type}>{alert.message}</Alert>}
			</div>
		</Router>
	);
};

export default App;
