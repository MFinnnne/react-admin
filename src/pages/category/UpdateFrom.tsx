import { Form, Input, Modal } from 'antd';
import React, { Component } from 'react';
import { ICategory } from './DataModel';
import { ModalStatusCode } from './ModalStatusCode';

interface IUpdateFormProps {
	category: ICategory;
	showStatus: ModalStatusCode;
	onCancel: () => void;
}

interface IUpdateFormState {
	name: string | null;
	status: ModalStatusCode;
}

export default class UpdateFrom extends Component<IUpdateFormProps, IUpdateFormState> {

	private onCancel = (): void => {
		this.props.onCancel();
	};

	private CreateModalFrom = (): any => {
		const [form] = Form.useForm();
		return (
			<Modal
				destroyOnClose={true}
				visible={ModalStatusCode.Update === this.props.showStatus}
				title={'更新分类'}
				okText="Ok"
				cancelText="Cancel"
				onCancel={this.onCancel}
				onOk={() => {
					form
						.validateFields()
						.then((values) => {
              console.log(values);
              this.onCancel();
						})
						.catch((info) => {
							console.log('Validate Failed:', info);
						});
				}}
			>
				<Form form={form} preserve={false}>
					<Form.Item name="title" rules={[{ required: true, message: '请输入品类名称' }]} initialValue={this.props.category.name}>
						{<Input placeholder="请输入分类名称" title="更新分类"></Input>}
					</Form.Item>
				</Form>
			</Modal>
		);
	};

	render() {
		return (
			<div>
				<this.CreateModalFrom />
			</div>
		);
	}
}
