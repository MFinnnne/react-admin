import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Component } from 'react';
import { PAGE_SIZE } from '../../utils/Constants';
import { RoleModel } from './Model';

interface State {
	roles: RoleModel[];
}

interface Props {}

export default class Role extends Component<Props, State> {
	columns: ColumnsType<any>;

	constructor(props: Props) {
		super(props);
		this.columns = [];
		this.initColumns();
		this.state = {
			roles: [
				{
					menus: ['/home', '/products', '/category'],
					id: 1,
					name: '角色1',
					create_time: new Date(1554639552758).toLocaleString('zh',{hour12:false}),
					auth_time: new Date(1554639552758).toLocaleString('zh',{hour12:false}),
					auth_name: 'admin',
					__v: 0,
				},
				{
					menus: ['/home', '/products', '/category'],
					id: 2,
					name: '测试',
					create_time: new Date(1554639552758).toLocaleString('zh',{hour12:false}),
					auth_time: new Date(1554639552758).toLocaleString('zh',{hour12:false}),
					auth_name: 'admin1',
					__v: 0,
				},
				{
					menus: ['/home', '/products', '/category'],
					id: 3,
					name: '开发',
					create_time: new Date(1554639552758).toLocaleString('zh',{hour12:false}),
					auth_time: new Date(1554639552758).toLocaleString('zh',{hour12:false}),
					auth_name: 'admin2',
					__v: 0,
				},
			],
		};
	}

	private initColumns = () => {
		this.columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
			},
		];
	};

	private onRowClick = (data: any, number?: any): React.HTMLAttributes<HTMLElement> => {
		return {
			onClick: (event) => {
				console.log(data, number);
			}, // 点击行
		};
	};

	componentWillMount() {}

	render() {
		const { roles } = this.state;

		const title = (
			<span>
				<Button type="primary">创建角色</Button> &nbsp;&nbsp;
				<Button type="primary" disabled>
					设置角色权限
				</Button>
			</span>
		);

		return (
			<div>
				<Card title={title}>
					<Table
						rowKey="id"
						dataSource={roles}
						columns={this.columns}
						bordered
						loading={false}
						rowSelection={{ type: 'radio' }}
						pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
						onRow={this.onRowClick}
					></Table>
				</Card>
			</div>
		);
	}
}
