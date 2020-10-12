import { Button, Card, Table } from 'antd';
import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';

export default class Category extends Component {

  

	render() {
    const dataSource = [
      {
        "parentId": "0",
        "_id": "5f33e54fb1719c574aa7de4b",
        "name": "女装",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f33e554b1719c574aa7de4c",
        "name": "内衣",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f33e55ab1719c574aa7de4d",
        "name": "家具",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f33e560b1719c574aa7de4e",
        "name": "女鞋",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f33e565b1719c574aa7de4f",
        "name": "男鞋",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f33e56ab1719c574aa7de50",
        "name": "箱包",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f33e573b1719c574aa7de51",
        "name": "母婴",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f33e579b1719c574aa7de52",
        "name": "童装",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f33e57db1719c574aa7de53",
        "name": "玩具",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f354925b1719c574aa7de5d",
        "name": "男装",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f354a83b1719c574aa7de62",
        "name": "男装1",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f35680eb1719c574aa7de63",
        "name": "男装2",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f356b85b1719c574aa7de64",
        "name": "男装3",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f357130b1719c574aa7de65",
        "name": "男装4",
        "__v": 0
      },
      {
        "parentId": "0",
        "_id": "5f357176b1719c574aa7de66",
        "name": "男装5",
        "__v": 0
      }
    ];
    
    const columns = [
      {
        title:'分类名称',
        dataIndex:'name'
      },
      {
        title:'操作',
        width:300,
        render:()=>(
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
      },
    ];
		const title: string = '一级分类列表';
		const extra: React.ReactNode = <Button type='primary' icon={<PlusOutlined />}>添加</Button>;
		return (
			<Card title={title} extra={extra}>
				<Table rowKey='_id' dataSource={dataSource} columns={columns} bordered/>;
			</Card>
		);
	}
}
