import { Button, Card, Input, Select, Table } from 'antd';
import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
/**
 * product的默认子路由组件
 */

interface ProductHomeState {
	products: any[];
}

interface ProductHomeProps {}

export default class ProductHome extends Component<ProductHomeProps, ProductHomeState> {
	private columns: any[] = [];

	constructor(props: ProductHomeProps) {
		super(props);
		this.state = {
			products: [],
		};
	}

	private initColumns = (): void => {
		this.columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
			},
			{
				title: '价格',
				dataIndex: 'price',
				render: (price: any) => {
					return '￥' + price;
				},
			},
			{
				title: '状态',
				dataIndex: 'status',
				render: (status: any) => {
					return (
            <span>
              <Button type='primary'>
                下架
              </Button>
              <span>
                在售
              </span>
            </span>
          )
				},
      },
      {
				title: '操作',
				render: (product: any) => {
					return (
            <span>
             <LinkButton>详情</LinkButton>
             <LinkButton>修改</LinkButton>
            </span>
          )
				},
			}
		];
	};

	componentWillUnmount() {
		this.initColumns();
	}

	render() {
		const { products } = this.state;
		const title = (
			<span>
				<Select inputValue="1" defaultValue="1" style={{ width: 150 }}>
					<Select.Option value="1">按名称搜索</Select.Option>
					<Select.Option value="2">按描述搜索</Select.Option>
				</Select>
				<Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }}></Input>
				<Button type="primary">搜索</Button>
			</span>
		);
		const extra = (
			<Button type="primary" icon={<PlusOutlined />}>
				添加商品
			</Button>
		);
		return (
			<Card title={title} extra={extra}>
				<Table rowKey='_id' bordered dataSource={products} columns={this.columns} />
			</Card>
		);
	}
}
