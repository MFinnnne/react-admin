import { Select, Form, Input } from 'antd';
import React, { Component } from 'react';

const Option = Select.Option;
const Item = Form.Item;

export default class AddForm extends Component {
	render() {
		return (
			<Form>
				<Item>
					<Select style={{ width: '100%' }} defaultValue='0'>
						<Option value="0">一级分类</Option>
						<Option value="1">电脑</Option>
						<Option value="2">图书</Option>
					</Select>
				</Item>
				<Item>
					<Input placeholder="请输入分类名称"></Input>
				</Item>
			</Form>
		);
	}
}
