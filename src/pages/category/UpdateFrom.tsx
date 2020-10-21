import { Form, Input } from 'antd';
import React, { Component } from 'react';
import { ICategory } from './DataModel';
const Item = Form.Item;

interface IUpdateFormProps {
	category: ICategory;
}

interface IUpdateFormState {}

export default class UpdateFrom extends Component<IUpdateFormProps, IUpdateFormState> {

	constructor(props: IUpdateFormProps) {
    super(props);
	}

	render() {

    const {name}= this.props.category;

		return (
			<Form>
				<Item>
					<Input placeholder="请输入分类名称" defaultValue={name}></Input>
				</Item>
			</Form>
		);
	}
}
