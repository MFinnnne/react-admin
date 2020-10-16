/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: MFine
 * @LastEditTime: 2020-10-15 23:31:53
 */
/*
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 */

import { Button, Card, message, Table } from 'antd';
import React, { Component } from 'react';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategorys } from '../../api';

interface ICategory {
	parentId: string;
	_id: string;
	name: string;
	__v: number;
	categoryName: string;
	parentName: string;
}

interface CategoryModel {
	parentId: string;
	id: number;
	name: string;
	categoryName: string;
	parentName: string;
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
		console.log(result);
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
			let tmp: ICategory = { parentId: item.parentId, _id: String(item.id), __v: 0, name: item.name, categoryName: item.categoryName, parentName: item.parentName };
			return tmp;
		});
		this.setState(() => {
			return {
				categorys: categorys,
			};
		});
	}

	/**
	 * @name: 显示二级列表
	 * @test:
	 * @msg:
	 * @param {category: ICategory)}
	 * @return {void}
	 */
	private showSubCategorys(category: ICategory): void {
		this.setState(
			() => {
				return {
					parentId: category._id,
					parentName: category.name,
				};
			},
			() => {
				this.getCategory(this.state.parentId);
			}
		);
	}

	/**
	 * @name: 显示一级列表
	 * @test: test font
	 * @msg:
	 * @return {type}
	 */
	private showCategorys(): void {
    debugger;
		this.setState(
			() => {
				return { parentId: '0', parentName: '' };
			},
			() => {
				this.getCategory(this.state.parentId);
			}
		);
	}

	/**
  * @name: 初始化表头 
  * @test: test font
  * @msg: 
  * @return void
  */ 
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
						{this.state.parentId === '0' ? (
							<LinkButton
								onClick={() => {
									this.showSubCategorys(category);
								}}
							>
								查看子分类
							</LinkButton>
						) : null}
					</span>
				),
			},
		];
	}

	render() {
		const { categorys, loading, parentName } = this.state;
		const title: any =
			this.state.parentId === '0' ? (
				'一级分类列表'
			) : (
				<span>
					<LinkButton onClick={this.showCategorys.bind(this)}>一级分类列表</LinkButton>
					<ArrowRightOutlined style={{ marginRight: '5px' }} />
					<span>{parentName}</span>
				</span>
			);
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
