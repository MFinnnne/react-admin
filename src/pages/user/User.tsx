import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Card, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { reqUsers } from '../../api';

export const User = () => {
	const [users, setUsers] = useState<any>([]);

	const columns = [
		{
			title: '用户名',
			dataIndex: 'name',
		},
		{
			title: '邮箱',
			dataIndex: 'email',
		},
		{
			title: '电话',
			dataIndex: 'phone',
		},
		{
			title: '注册时间',
			dataIndex: 'createTime',
		},
		{
			title: '所属角色',
			dataIndex: 'role',
		},
		{
			title: '操作',
			dataIndex: 'action',
			render: (text: any, record: any) => (
				<Space size="middle">
					<a>修改</a>
					<a>删除</a>
				</Space>
			),
		},
	];

	useEffect(() => {
		let ignore: boolean = false;
		const fetchData = async () => {
			const result = await reqUsers();
			if (result.length === 0) {
				ignore = true;
			}
			if (!ignore) {
				setUsers(result);
			}
		};
		fetchData();
		return () => {
			ignore = true;
		};
	}, []);

	const title = (
		<span>
			<ModalForm
				layout="horizontal"
				title="添加用户"
				trigger={<Button type="primary">创建角色</Button>}
				modalProps={{
					onCancel: () => console.log('run1'),
				}}
				onFinish={async () => {}}
			>
				<ProForm.Group>
					<ProFormText name="name" label="用户名" width="lg"></ProFormText>
				</ProForm.Group>
			</ModalForm>

			<ModalForm></ModalForm>
		</span>
	);

	return (
		<div className="user">
			<Card title={title}>
				<Table rowKey="id" columns={columns} dataSource={users}></Table>
			</Card>
		</div>
	);
};
