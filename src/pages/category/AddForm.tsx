import { Select, Form, Input, Modal } from 'antd';
import React, { Component } from 'react';
import { ICategory } from './DataModel';
import { ModalStatusCode } from './ModalStatusCode';

const Option = Select.Option;
const Item = Form.Item;

interface Values{
  title?:string;
  value?:string;
}

interface IAddFormProps {
	category: ICategory;
	onCancel: () => void;
	showStatus: ModalStatusCode;
}
export default class AddForm extends Component<IAddFormProps, {}> {
	private onCancel = (): void => {
		this.props.onCancel();
	};

	private CreateModalFrom = (): any => {
		const [form] = Form.useForm();
		return (
			<Modal
				destroyOnClose={true}
				visible={ModalStatusCode.Add === this.props.showStatus}
				title={'添加分类'}
				okText="Ok"
				cancelText="Cancel"
				onCancel={this.onCancel}
				onOk={() => {
					form
						.validateFields()
						.then((values:Values) => {
							console.log(values);
						})
						.catch((info) => {
							console.log('Validate Failed:', info);
						});
				}}
			>
				<Form form={form} preserve={false}>
						{this.addFromElement()}
				</Form>
			</Modal>
		);
	};

	private addFromElement(): React.ReactNode {
		return (
			<div>
				<Item name="value" initialValue='0'>
					<Select style={{ width: '100%' }}>
						<Option value="0">一级分类</Option>
						<Option value="1">电脑</Option>
						<Option value="2">图书</Option>
					</Select>
				</Item>
				<Item name="title">
					<Input placeholder="请输入分类名称" ></Input>
				</Item>
			</div>
		);
	}

	render() {
		return (
			<div>
				<this.CreateModalFrom />
			</div>
		);
	}
}
