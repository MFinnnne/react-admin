import { Button, Card, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Component } from 'react';
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
			roles: [{}, {}, {}],
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
						rowKey="_id"
						dataSource={roles}
						columns={this.columns}
						bordered
						loading={false}
						pagination={{ defaultPageSize: 10, showQuickJumper: true }}
					></Table>
				</Card>
			</div>
		);
	}
}
