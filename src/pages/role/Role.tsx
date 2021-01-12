import { Button, Card, Form, message, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Component } from 'react';
import { reqCreateRole, reqRoles } from '../../api';
import { ResponseValue } from '../../api/Model';
import { PAGE_SIZE } from '../../utils/Constants';
import { RoleModel } from './Model';
import ProForm, { ModalForm, ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
interface State {
	roles: RoleModel[];
	role: RoleModel | null;
	isShowAdd: boolean;
}

interface Props {}

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
export default class Role extends Component<Props, State> {
	columns: ColumnsType<any>;

	constructor(props: Props) {
		super(props);
		this.columns = [];
		this.initColumns();
		this.state = {
			roles: [],
			role: null,
			isShowAdd: false,
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
		this.initDataSource();
	}

	private async initDataSource(): Promise<void> {
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
				<ModalForm
					title="添加角色"
					trigger={<Button type="primary">创建角色 </Button>}
					modalProps={{
						onCancel: () => console.log('run1'),
					}}
					onFinish={async (values: Record<string, any>): Promise<boolean> => {
						const result = await reqCreateRole(values.name);
						if (result === 'success') {
              message.success('提交成功');
              this.initDataSource();
						} else {
							message.error('提交失败');
						}
						return true;
					}}
				>
					<ProForm.Group style={{ display: 'flex', justifyContent: 'space-around' }}>
						<ProFormText
							rules={[{ required: true }]}
							label="添加角色"
							required
							width="xl"
							name="name"
							tooltip="最长为 24 位"
							placeholder="请输入角色名称"
						/>
					</ProForm.Group>
				</ModalForm>
				&nbsp;&nbsp;
				<ModalForm
					title="设置角色权限"
					trigger={
						<Button type="primary" disabled={role === null}>
							设置角色权限
						</Button>
					}
					modalProps={{
						onCancel: () => console.log('run'),
					}}
				></ModalForm>
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
				</Card>
			</div>
		);
	}
}
