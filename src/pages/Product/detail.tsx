import { Card, List } from 'antd';
import React, { Component } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';

interface ProductDetailState {}

interface ProductDetailProps {}

class ProductDetail extends Component<ProductDetailProps, ProductDetailState> {
	render() {
		const title = (
			<span>
				<ArrowRightOutlined style={{ marginRight: '5px' }} />
				<span>商品详情</span>
			</span>
		);

		return (
			<div>
				<Card title={title} className="product-detail">
					<List className="list">
						<List.Item>
							<span className="left">商品名称:</span>
							<span className="right">小米8 6+64</span>
						</List.Item>
						<List.Item>
							<span className="left">商品描述:</span>
							<span>小米8 6+64</span>
						</List.Item>
					</List>
				</Card>
			</div>
		);
	}
}

export default ProductDetail;
