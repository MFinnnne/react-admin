import { Modal } from 'antd';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { reqWheater } from '../../api';
import { MenuConfig, menuList } from '../../config/menuConfig';
import { formatDate } from '../../utils/DateUtils';
import MemeoryUtils from '../../utils/MemeoryUtils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less';
import StorageUtils from '../../utils/StorageUtils';

interface HeaderState {
	currentTime: string;
	dayPictureUrl: string;
	weather: string;
}

interface IProps {}

type HeaderProps = IProps & RouteComponentProps;
class Header extends Component<HeaderProps, HeaderState> {
	timerId: NodeJS.Timeout | null = null;

	constructor(props: HeaderProps) {
		super(props);
		this.state = {
			currentTime: formatDate(Date.now()),
			dayPictureUrl: '',
			weather: '',
		};
	}

	componentDidMount() {
		this.getNowTime();
		this.getWeather();
	}

	private async getWeather() {
		const { dayPictureUrl, weather } = await reqWheater('常州');
		this.setState({
			dayPictureUrl,
			weather,
		});
	}

	private getNowTime() {
		this.timerId = setInterval(() => {
			this.setState({
				currentTime: formatDate(Date.now()),
			});
		}, 1000);
	}

	private getTitle(menuList: MenuConfig[]): string {
		const path = this.props.location.pathname;
		let title: string = '';
		menuList.forEach((item) => {
			if (item.key === path) {
				title = item.title;
				return;
			} else {
				const cItem = item.children?.find((cItem) => cItem.key === path);
				title = cItem?.title ?? title;
			}
		});
		return title;
	}

	componentWillUnmount() {
		if (this.timerId !== null) {
			clearInterval(this.timerId);
		}
	}
	private logout(): any {
		Modal.confirm({
			content: '是否退出',
			icon: <ExclamationCircleOutlined />,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				StorageUtils.removeUser();
				MemeoryUtils.user.id = undefined;
				MemeoryUtils.user.name = undefined;
				this.props.history.replace('/login');
			},
			onCancel: () => {
				console.log('cancel');
			},
		});
	}

	render() {
		return (
			<div className="header">
				<div className="header-top">
					<span>欢迎，{MemeoryUtils.user.name}</span>
					<a href="javascript:" onClick={this.logout.bind(this)}>
						退出
					</a>
				</div>
				<div className="header-bottom">
					<div className="header-bottom-left">{this.getTitle(menuList)}</div>
					<div className="header-bottom-right">
						<span>{this.state.currentTime}</span>
						<img src={this.state.dayPictureUrl} alt="weather"></img>
						<span>{this.state.weather}</span>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(Header);
