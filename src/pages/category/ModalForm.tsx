import { Form, Input, Modal, Radio } from 'antd';
import React, { Component, ReactNode } from 'react';
import { JsxElement } from 'typescript';
import { ModalStatusCode } from './ModalStatusCode';

interface Values {
	title: string;
	description: string;
	modifier: string;
}

interface CollectionCreateFormProps {
	visible: number;
}

interface ModalState {
	showStatus: ModalStatusCode;
}

class ModalForm extends Component<CollectionCreateFormProps, ModalState> {
	constructor(props: CollectionCreateFormProps) {
		super(props);
		this.state = {
			showStatus: 0,
		};
	}

	private onCancel = () => {
		this.setState((state, props) => {
			return {
				showStatus: ModalStatusCode.Invisble,
			};
		});
	};

	private CreateModalFrom = (): any => {
		const [form] = Form.useForm();
		return (
			<Modal
				visible={this.state.showStatus === this.props.visible}
				title="更新分类"
				okText="Ok"
				cancelText="Cancel"
				onCancel={this.onCancel}
				onOk={() => {
					form
						.validateFields()
						.then(() => {
							form.resetFields();
							console.log('funck');
						})
						.catch((info) => {
							console.log('Validate Failed:', info);
						});
				}}
			>
				<Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
					<Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		);
	};

	render() {
		return <this.CreateModalFrom />;
	}
}

export default ModalForm;
