import { Button, Card, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Component } from 'react';
import { reqRoles } from '../../api';
import { ResponseValue } from '../../api/Model';
import { PAGE_SIZE } from '../../utils/Constants';
import AddForm from './add-form';
import { RoleModel } from './Model';

interface State {
	roles: RoleModel[];
	role: RoleModel | null;
	isShowAdd: number;
}

interface Props {}

export default class Role extends Component<Props, State> {
	columns: ColumnsType<any>;

	constructor(props: Props) {
		super(props);
		this.columns = [];
		this.initColumns();
		this.state = {
			roles: [],
			role: null,
			isShowAdd: 0,
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
				dataIndex: 'createTime',
			},
			{
				title: '授权时间',
				dataIndex: 'authTime',
			},
			{
				title: '授权人',
				dataIndex: 'authName',
			},
		];
	};

	private addRole = () => {};

	private handleCancel = () => {};

	private onRowClick = (data: RoleModel, number?: number): React.HTMLAttributes<HTMLElement> => {
		return {
			onClick: (event) => {
				this.setState({
					role: data,
				});
			}, // 点击行
		};
	};

	async componentDidMount() {
		const result: ResponseValue<RoleModel[]> = await reqRoles();

		if (result.status === 0 && result.data) {
			this.setState({
				roles: result.data,
			});
		}
	}

	render() {
		const { roles, role, isShowAdd } = this.state;

		const title = (
			<span>
				<Button type="primary">创建角色</Button> &nbsp;&nbsp;
				<Button type="primary" disabled={role === null}>
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
						rowSelection={{ type: 'radio', selectedRowKeys: [role?.id ?? -1] }}
						pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
						onRow={this.onRowClick}
					></Table>

					<Modal title="添加角色" visible={isShowAdd} onOk={this.addRole} onCancel={this.handleCancel}>
            <AddForm setFrom={(form)=>this.form=form}>
              
            </AddForm>
          </Modal>
				</Card>
			</div>
		);
	}
}
