import { Input } from 'antd';
import React, { Component } from 'react';
import { ICategory } from './DataModel';
import ModalForm from './ModalForm';
import { ModalStatusCode } from './ModalStatusCode';

interface IUpdateFormProps {
	category: ICategory;
	onCancel: () => void;
	showStatus: ModalStatusCode;
}

interface IUpdateFormState {
  name:string|null;
}

export default class UpdateFrom extends Component<IUpdateFormProps, IUpdateFormState> {

  

	render() {

		return (
			<ModalForm {...this.props} element={<Input placeholder="请输入分类名称"></Input>} expectedStatus={ModalStatusCode.Update} title='更新分类'></ModalForm>
		);
	}
}
