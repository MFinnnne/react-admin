/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-22 00:23:38
 */
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, Card, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { reqUsers } from '../../api';
import { UserModel } from './model';

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
			render: (text: any, record: UserModel) => (
				<Space size="middle">
					<ModalForm
						layout="horizontal"
						title="修改用户"
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 14 }}
						trigger={<span style={{ color: '#4FC08D', cursor: 'pointer' }}>修改</span>}
						modalProps={{
							onCancel: () => console.log(text, record),
						}}
						onFinish={async () => {}}
					>
						{proForm(record)}
					</ModalForm>

					<span style={{ color: 'red', cursor: 'pointer' }} onClick={deleteUser}>
						删除
					</span>
				</Space>
			),
		},
	];

	const deleteUser = (): void => {
		console.log('delete');
	};

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

	const proForm = (user?: UserModel): React.ReactElement => {
		return (
			<ProForm.Group>
				<ProFormText
					name="name"
					label="用户名"
					width="lg"
					placeholder="用户名"
					initialValue={user?.name ?? ''}
				></ProFormText>
				<ProFormText
					name="phone"
					label="手机号"
					width="lg"
					placeholder="手机号"
					initialValue={user?.phone ?? ''}
				></ProFormText>
				<ProFormText
					name="email"
					label="邮箱"
					width="lg"
					placeholder="邮箱"
					initialValue={user?.email ?? ''}
				></ProFormText>
				<ProFormText
					name="role"
					label="角色"
					width="lg"
					placeholder="角色"
					initialValue={user?.role_id ?? ''}
				></ProFormText>
			</ProForm.Group>
		);
	};

	const title = (
		<span className="user">
			<ModalForm
				layout="horizontal"
				title="添加用户"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				trigger={<Button type="primary">创建角色</Button>}
				modalProps={{
					onCancel: () => console.log('run1'),
				}}
				onFinish={async () => {}}
			>
				{proForm()}
			</ModalForm>
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
