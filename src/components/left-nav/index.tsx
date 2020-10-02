import React, { Component } from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { menuList, MenuConfig } from '../../config/menuConfig';
import * as Icon from '@ant-design/icons';

const { SubMenu } = Menu;

interface IProps {}

type LeftNavProps = IProps & RouteComponentProps;

class LeftNav extends Component<LeftNavProps, {}> {
	menuNodes: JSX.Element[] = [];
	openKey: string = '';
	constructor(props: LeftNavProps) {
		super(props);
		this.menuNodes = this.getMenuNodes2(menuList);
		this.getOpenKey(menuList);
	}

	getOpenKey = (menuList: MenuConfig[]) => {
		const path: string = this.props.location.pathname;
		return menuList.map((item) => {
			if (item.children) {
				const cItem = item.children.find((cItem) => cItem.key === path);
				if (cItem) {
					this.openKey = item.key;
				}
			}
		});
	};

	getMenuNodes = (menuList: MenuConfig[]): JSX.Element[] => {
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

	getMenuNodes2 = (menuList: MenuConfig[]): JSX.Element[] => {
		return menuList.reduce((pre: JSX.Element[], item: MenuConfig): JSX.Element[] => {
			if (!item.children) {
				pre.push(
					<Menu.Item key={item.key} icon={React.createElement(Icon[item.icon])}>
						<Link to={item.key}>{item.title}</Link>
					</Menu.Item>
				);
			} else {
				pre.push(
					<SubMenu key={item.key} title={item.title} icon={React.createElement(Icon[item.icon])}>
						{this.getMenuNodes(item.children)}
					</SubMenu>
				);
			}
			return pre;
		}, []);
	};

	render() {
		const path = this.props.location.pathname;
		return (
			<div className="left-nav">
				<Link to="/" className="left-nav-header">
					<img src={logo} alt="" />
					<h1>硅谷后台</h1>
				</Link>
				<div>
					<Menu selectedKeys={[path]} defaultOpenKeys={[this.openKey]} mode="inline" theme="dark">
						{this.menuNodes}
					</Menu>
				</div>
			</div>
		);
	}
}

export default withRouter(LeftNav);
