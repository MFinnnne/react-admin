import React, { Component } from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { menuList, MenuConfig } from '../../config/menuConfig';
import * as Icon from '@ant-design/icons';

const { SubMenu } = Menu;

export default class LeftNav extends Component {
	menuNodes: JSX.Element[] = [];

	constructor(props: Readonly<{}>) {
		super(props);
		this.menuNodes = this.getMenuNodes(menuList);
	}

	getMenuNodes = (menuList: MenuConfig[]) => {
		return menuList.map((item) => {
			if (item.children) {
				return (
					<SubMenu key={item.key} title={item.title} icon={React.createElement(Icon[item.icon])}>
						{this.getMenuNodes(item.children)}
					</SubMenu>
				);
			} else {
				return (
					<Menu.Item key={item.key} icon={React.createElement(Icon[item.icon])}>
						<Link to={item.key}>{item.title}</Link>
					</Menu.Item>
				);
			}
		});
	};

	render() {
		return (
			<div className="left-nav">
				<Link to="/" className="left-nav-header">
					<img src={logo} alt="" />
					<h1>硅谷后台</h1>
				</Link>
				<div>
					<Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark">
						{this.menuNodes}
					</Menu>
				</div>
			</div>
		);
	}
}
