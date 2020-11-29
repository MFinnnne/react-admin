import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ProductAddUpdate from './add-update';
import ProductDetail from './detail';
import ProductHome from './home';

export default class Product extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/product" component={ProductHome} />
				<Route exact path="/product/add" component={ProductAddUpdate} />
				<Route exact path="/product/detail" component={ProductDetail} />
				<Redirect to="/product" />
			</Switch>
		);
	}
}
 