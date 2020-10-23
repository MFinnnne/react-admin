import { Select, Form, Input } from 'antd';
import React, { Component } from 'react';
import { ICategory } from './DataModel';
import ModalForm from './ModalForm';
import { ModalStatusCode } from './ModalStatusCode';

const Option = Select.Option;
const Item = Form.Item;

interface IAddFormProps {
	category: ICategory;
	onCancel: () => void;
	showStatus: ModalStatusCode;
}
export default class AddForm extends Component<IAddFormProps, {}> {
	private addFromElement(): React.ReactNode {
		return (
			<div>
				<Item>
					<Select style={{ width: '100%' }} defaultValue="0">
						<Option value="0">一级分类</Option>
						<Option value="1">电脑</Option>
						<Option value="2">图书</Option>
					</Select>
				</Item>
				<Item>
					<Input placeholder="请输入分类名称"></Input>
				</Item>
			</div>
		);
	}

	render() {
		return <ModalForm {...this.props} element={this.addFromElement()} expectedStatus={ModalStatusCode.Add} title='添加分类'></ModalForm>;
	}
}
