import { Button, Card, Form, message, Modal, Table, Tree } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { Component, ReactText } from 'react';
import { reqCreateRole, reqCreateRoleByName, reqRoles } from '../../api';
import { ResponseValue } from '../../api/Model';
import { PAGE_SIZE } from '../../utils/Constants';
import { RoleModel } from './Model';
import ProForm, { ModalForm, ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { DataNode } from 'antd/lib/tree';
import { MenuConfig, menuList } from '../../config/menuConfig';
import { formatDateByString } from '../../utils/DateUtils';

interface State {
	roles: RoleModel[];
	role: RoleModel | null;
	treeData: DataNode[];
	selectedKeys: string[];
}

interface Props {}

export default class Role extends Component<Props, State> {
	columns: ColumnsType<any>;
	menus: String[];
	state: State;
	constructor(props: Props) {
		super(props);
		this.columns = [];
		this.menus = [];
		this.initColumns();
		this.state = {
			roles: [],
			role: null,
			treeData: [],
			selectedKeys: [],
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

	private onRowClick = (data: RoleModel, number?: number): React.HTMLAttributes<HTMLElement> => {
		return {
			onClick: (event) => {
				this.setState({
					role: data,
					selectedKeys: data.menus?.split(',') ?? [],
				});
			},
		};
	};

	async componentDidMount() {
		this.initDataSource();
		this.initDataNode();
	}

	private initDataNode = () => {
		const treeData: DataNode[] = [
			{
				title: '平台权限',
				key: '0-0',
				children: this.getDateNode(menuList),
			},
		];
		this.setState({
			treeData: treeData,
		});
	};

	private async initDataSource(): Promise<void> {
		const result: ResponseValue<RoleModel[]> = await reqRoles();
		if (result.status === 0 && result.data) {
			this.setState({
				roles: result.data,
			});
		}
	}

	private getDateNode = (menuList: MenuConfig[]): DataNode[] => {
		return menuList.reduce((acc: DataNode[], curValue: MenuConfig): DataNode[] => {
			if (curValue.children) {
				acc.push({ key: curValue.key, title: curValue.title, children: this.getDateNode(curValue.children) });
			} else {
				acc.push({ key: curValue.key, title: curValue.title });
			}
			return acc;
		}, []);
	};
	private onSelect = (selectedKeys: React.Key[], info: any) => {
		console.log('selected', selectedKeys, info);
	};

	private onCheck = (checkedKeys: React.Key[], info: any) => {
		console.log('onCheck', checkedKeys, info);
	};
	render() {
		const { roles, role, treeData, selectedKeys } = this.state;

		const title = (
			<span>
				<ModalForm
					layout="horizontal"
					title="添加角色"
					trigger={<Button type="primary">创建角色 </Button>}
					modalProps={{
						onCancel: () => console.log('run1'),
					}}
					onFinish={async (values: Record<string, any>): Promise<boolean> => {
						const role: RoleModel = {
							menus: [''].join(','),
							name: values.name,
							createTime: formatDateByString(new Date(), 'yyyy-MM-dd hh:mm:ss'),
						};
						const result = await reqCreateRole(role);
						if (result === 'success') {
							message.success('提交成功');
							this.setState((state) => {
								return {
									roles: [...state.roles, role],
								};
							});
						} else {
							message.error('提交失败');
						}
						return true;
					}}
				>
					<ProForm.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
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
					layout="horizontal"
					title="设置角色权限"
					trigger={
						<Button type="primary" disabled={role === null}>
							设置角色权限
						</Button>
					}
					modalProps={{
						onCancel: () => console.log('run'),
					}}
					onFinish={async (): Promise<boolean> => {
						return true;
					}}
				>
					<ProForm.Group>
						<ProFormText name="auth" disabled label="角色名称" width="lg" initialValue={role?.name}></ProFormText>
					</ProForm.Group>
					<ProForm.Group>
						<Tree
							defaultExpandAll
							checkable
							defaultCheckedKeys={selectedKeys}
							onSelect={this.onSelect}
							onCheck={this.onCheck as any}
							treeData={treeData}
						/>
					</ProForm.Group>
				</ModalForm>
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
