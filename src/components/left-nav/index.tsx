/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-24 00:04:22
 */
import React, { Component } from 'react';
import './index.less';
import logo from '../../assets/images/logo.png';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { menuList, MenuConfig } from '../../config/menuConfig';
import * as Icon from '@ant-design/icons';
import StorageUtils, { LoginUser } from '../../utils/StorageUtils';

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
		return menuList.forEach((item) => {
			if (item.children) {
				const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0);
				if (cItem) {
					this.openKey = item.key;
				}
			}
		});
	};

	private hasAuth = (node: MenuConfig): boolean => {
		const user: LoginUser = StorageUtils.getUser();

		if (user.name === 'admin' || node.isPublic || user.menus.indexOf(node.key) !== -1) {
			return true;
		} else if (node.children) {
			return !!node.children.find((child) => {
				return user.menus.indexOf(child.key) !== -1;
			});
		}
		return false;
	};

	getMenuNodes = (menuList: MenuConfig[]): JSX.Element[] | null => {
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
			if (this.hasAuth(item)) {
				if (!item.children) {
					pre.push(
						<Menu.Item key={item.key} icon={React.createElement(Icon[item.icon])}>
							<Link to={item.key}>{item.title}</Link>
						</Menu.Item>
					);
				} else {
					pre.push(
						<SubMenu key={item.key} title={item.title} icon={React.createElement(Icon[item.icon])}>
							{this.getMenuNodes2(item.children)}
						</SubMenu>
					);
				}
			}
			return pre;
		}, []);
	};

	render() {
		let path = this.props.location.pathname;
		if (path.indexOf('/product') === 0) {
			path = '/product';
		}
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
