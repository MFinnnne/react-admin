/*
 * @Descripttion: 
 * @version: 
 * @Author: MFine
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-24 13:46:11
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import { Redirect, Route, Switch } from 'react-router-dom';
import Category from '../category/Category';
import Product from '../product/Product';
import Role from '../role/Role';
import Bar from '../chars/Bar';
import Line from '../chars/Line';
import Pie from '../chars/Pie';
import Home from '../home/Home';
import StorageUtils from '../../utils/StorageUtils';
import User from '../user/User';
const { Footer, Sider, Content } = Layout;

export default class admin extends Component {
	render() {
		const user = StorageUtils.getUser();
		if (user === undefined || user.id === undefined) {
			return <Redirect to="/login"></Redirect>;
		}
		return (
			<Layout style={{ height: '100%' }}>
				<Sider>
					<LeftNav></LeftNav>
				</Sider>
				<Layout>
					<Header></Header>
					<Content style={{ backgroundColor: '#fff',margin:'20px' }}>
						<Switch>
							<Route path="/home" component={Home}></Route>
							<Route path="/category" component={Category}></Route>
							<Route path="/product" component={Product}></Route>
							<Route path="/role" component={Role}></Route>
							<Route path="/user" component={User}></Route>
							<Route path="/bar" component={Bar}></Route>
							<Route path="/line" component={Line}></Route>
							<Route path="/pie" component={Pie}></Route>
							<Redirect to="/home"></Redirect>
						</Switch>
					</Content>
					<Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得最佳页面操作体验</Footer>
				</Layout>
			</Layout>
		);
	}
}
