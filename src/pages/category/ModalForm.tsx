import { Form, Modal } from 'antd';
import React, { Component } from 'react';
import { ICategory } from './DataModel';
import { ModalStatusCode } from './ModalStatusCode';

interface Values {
	title: string;
	description: string;
	modifier: string;
}

interface ModalFromProps {
	showStatus: ModalStatusCode;
	onCancel: () => void;
	category: ICategory;
	element: React.ReactNode;
	expectedStatus: ModalStatusCode;
	title: string;
}

interface ModalState {
	name: string;
}

class ModalForm extends Component<ModalFromProps, ModalState> {


	constructor(props: ModalFromProps) {
		super(props);
		this.state = {
			name: '',
		};
	}

	private onCancel = () => {
		this.props.onCancel();
	};


	private CreateModalFrom = (): any => {
    const [form] = Form.useForm();
		const { title } = this.props;
		return (
			<Modal
        destroyOnClose={true}
				visible={this.props.showStatus === this.props.expectedStatus}
				title={title}
				okText="Ok"
				cancelText="Cancel"
				onCancel={this.onCancel}
				onOk={() => {
					form
						.validateFields()
						.then((values) => {
							form.resetFields();
							console.log(values);
						})
						.catch((info) => {
							console.log('Validate Failed:', info);
						});
				}}
			>
				<Form form={form} preserve={false}>
					<Form.Item name="title" rules={[{ required: true, message: '请输入品类名称' }]} initialValue={this.props.category.name} >
						{this.props.element}
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
