import { Button, Card, Input, Select, Table } from 'antd';
import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqProducts } from '../../api';
import { ProductsModel } from './Model';
import { PageSplitModel } from '../../api/Model';
import { PAGE_SIZE } from '../../utils/Constants';
/**
 * product的默认子路由组件
 */

interface ProductHomeState {
	products: ProductsModel[] | undefined;
	total: number;
	loading: boolean;
}

interface ProductHomeProps {}

export default class ProductHome extends Component<ProductHomeProps, ProductHomeState> {
	private columns: any[] = [];

	constructor(props: ProductHomeProps) {
		super(props);
		this.state = {
			products: [],
			total: 0,
			loading: false,
		};
	}

	/**
	 * @name: 初始化表头
	 * @test: test font
	 * @msg:
	 * @param {*}
	 * @return {*}
	 */
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
							<Button type="primary">下架</Button>
							<span>在售</span>
						</span>
					);
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
					);
				},
			},
		];
	};

	componentWillMount() {
		this.initColumns();
	}

	componentDidMount() {
		this.getDataSources(1);
	}

	private getDataSources = async (pageNum: number): Promise<any>=> {
		this.setState({ loading: true });
		const result: PageSplitModel<ProductsModel> = await reqProducts(pageNum, PAGE_SIZE);
		this.setState(() => {
			return {
				products: result.list,
        total: result.total,
        loading:false
			};
		});
		return result;
	}

	render() {
		const { products, total, loading } = this.state;
		const title = (
			<span>
				<Select searchValue="1" defaultValue="1" style={{ width: 150 }}>
					<Select.Option value="1">按名称搜索</Select.Option>
					<Select.Option value="2">按描述搜索</Select.Option>
				</Select>
				<Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }}></Input>
				<Button type="primary">搜索</Button>
			</span
		);
		const extra = (
			<Button type="primary" icon={<PlusOutlined />}>
				添加商品
			</Button>
		);
		return (
			<Card title={title} extra={extra}>
				<Table
					loading={loading}
					rowKey="idStr"
					bordered
					dataSource={products}
					columns={this.columns}
					pagination={{ defaultPageSize: PAGE_SIZE, total, showQuickJumper: true, onChange: this.getDataSources }}
				/>
			</Card>
		);
	}
}
