import React, { Component } from 'react';
import { Button, message } from 'antd';
import 'antd/dist/antd.less';
import Login from './pages/login/Login';
import admin from './pages/admin/admin';
import { BrowserRouter, Route } from 'react-router-dom';
class App extends Component {


	render() {
		return (
			<BrowserRouter>
				<Route path="/login" component={Login}></Route>
				<Route path="/" component={admin}></Route>
			</BrowserRouter>
		);
	}
}

export default App;
