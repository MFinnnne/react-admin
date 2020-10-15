import { Button, Card, message, Table } from 'antd';
import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategorys } from '../../api';

interface ICategory {
	parentId: string;
	_id: string;
	name: string;
	__v: number;
	categoryName: string;
}

interface CategoryModel {
	parentId: string;
	id: number;
	name: string;
	categoryName: string;
}

interface ICategoryProps {}

interface ICategoryState {
	categorys: ICategory[];
	loading: boolean;
	parentId: string;
	subCategorys: ICategory[];
	parentName: string;
}

export default class Category extends Component<ICategoryProps, ICategoryState> {
	columns: any[] = [];
	constructor(props: ICategoryProps) {
		super(props);
		this.initColumns();
		this.state = {
			loading: false,
			categorys: [],
			subCategorys: [],
			parentId: '0',
			parentName: '',
		};
	}

	componentDidMount() {
		const { parentId } = this.state;
		this.getCategory(parentId);
	}

	private async getCategory(parentId: string) {
		this.setLoading(true);
		const result: any = await reqCategorys(parentId);
		this.setLoading(false);
		if (result.status !== 0) {
			message.error('获取分类列表失败');
			return;
		} else {
			this.setCategorys(result);
		}
	}

	private setLoading(isLoading: boolean) {
		this.setState(() => {
			return {
				loading: isLoading,
			};
		});
	}

	private setCategorys(result: any) {
		let categorys: ICategory[] = result.data.map((item: CategoryModel) => {
			let tmp: ICategory = { parentId: item.parentId, _id: String(item.id), __v: 0, name: item.name, categoryName: item.categoryName };
			return tmp;
		});
		this.setState(() => {
			return {
				categorys: categorys,
			};
		});
	}

	private showSubCategorys(category: ICategory) {
		this.setState(
			() => {
				return {
					parentId: category._id,
					parentName: category.categoryName,
				};
			},
			() => {
				this.getCategory(this.state.parentId);
			}
		);
	}

	private initColumns() {
		this.columns = [
			{
				title: '分类名称',
				dataIndex: 'name',
			},
			{
				title: '操作',
				width: 300,
				render: (category: ICategory) => (
					<span>
						<LinkButton>修改分类</LinkButton>
						<LinkButton
							onClick={() => {
								this.showSubCategorys(category);
							}}
						>
							查看子分类
						</LinkButton>
					</span>
				),
			},
		];
	}

	render() {
		const { categorys, loading } = this.state;
		const title: string = '一级分类列表';
		const extra: React.ReactNode = (
			<Button type="primary" icon={<PlusOutlined />}>
				添加
			</Button>
		);
		return (
			<Card title={title} extra={extra}>
				<Table rowKey="_id" dataSource={categorys} columns={this.columns} bordered loading={loading} pagination={{ defaultPageSize: 10, showQuickJumper: true }} />
			</Card>
		);
	}
}
