import { Route, Switch } from 'react-router-dom';

import React from 'react';
import ProductsSection from './components/ProductsSection/ProductsSection';
import ProductPage from './components/ProductPage/ProductPage';
import ComparePage from './components/ComparePage/ComparePage';

const Routes = () => {
	return (
		<Switch>
			<Route path="/search" component={ProductsSection} />
			<Route path="/cat/:category" component={ProductsSection} />{' '}
			<Route path="/compare" component={ComparePage} />
			<Route path="/:productName" component={ProductPage} />
		</Switch>
	);
};

export default Routes;
