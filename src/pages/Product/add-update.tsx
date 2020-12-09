import React, { Component } from 'react';
import LinkButton from '../../components/link-button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';

interface ProductAddUpdateState {}

interface ProductAddUpdateProps {}

type ProductAddUpdateRouteProps = ProductAddUpdateProps & RouteComponentProps;

class ProductAddUpdate extends Component<ProductAddUpdateRouteProps, ProductAddUpdateState> {
	constructor(props: ProductAddUpdateRouteProps) {
		super(props);
	}

	private onFinish = (values: any): void => {
		console.log(values);
	};

	private onFinishFailed = (errorInfo: any): void => {
		console.log(errorInfo);
	};

	render() {
		const formItemLayout = {
			labelCol: { span: 1 },
			wrapperCol: { span: 8 },
		};

		const title = (
			<span>
				<LinkButton
					style={{ fontSize: 20 }}
					onClick={() => {
						this.props.history.goBack();
					}}
				>
					<ArrowLeftOutlined style={{ margin: 5 }} />
				</LinkButton>
				<span>添加商品</span>
			</span>
		);
		return (
			<div>
				<Card title={title}>
					<Form
						{...formItemLayout}
						initialValues={{ remember: true }}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
					>
						<Form.Item name="name" label="商品名称" rules={[{ required: true, message: '商品名称必须填' }]}>
							<Input placeholder="请输入商品名称"></Input>
						</Form.Item>
						<Form.Item name="desc" label="商品描述">
							<Input.TextArea placeholder="请输入商品描述" autoSize />
						</Form.Item>
						<Form.Item name="category" label="商品分类">
							<div>商品分类</div>
						</Form.Item>
						<Form.Item name="picture" label="商品图片">
							<div>商品图片</div>
						</Form.Item>
						<Form.Item name="detail" label="商品详情">
							<div>商品详情</div>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								提交
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		);
	}
}

export default withRouter(ProductAddUpdate);
