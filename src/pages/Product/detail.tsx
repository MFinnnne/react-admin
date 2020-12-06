import { Card, List } from 'antd';
import React, { Component } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { RouteComponentProps, withRouter } from 'react-router';
import LinkButton from '../../components/link-button';
import { ProductsModel } from './Model';

interface ProductDetailState {}

interface ProductDetailProps {}

type ProductDetailRoutePros = ProductDetailProps & RouteComponentProps;

class ProductDetail extends Component<ProductDetailRoutePros, ProductDetailState> {

  constructor(props:ProductDetailRoutePros) {
    super(props);
    
  }
  
  componentDidMount(){
    
  }
  
	render() {
		const { desc, detail, images, price, name } = (this.props.location.state as any).product as ProductsModel;
		const imageList: string[] = images?.split(',') ?? [];
		const title = (
			<span>
				<LinkButton
					onClick={() => {
						this.props.history.goBack();
					}}
				>
					<ArrowLeftOutlined style={{ marginRight: '5px' }} />
				</LinkButton>
				<span>商品详情</span>
			</span>
		);

		return (
			<div>
				<Card title={title} className="product-detail">
					<List className="list">
						<List.Item className="item">
							<span className="left">商品名称:</span>
							<span className="right">{name}</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">商品描述:</span>
							<span>{desc}</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">商品价格:</span>
							<span>{price}</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">所属分类:</span>
							<span>电脑--{'>'}笔记本</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">商品图片:</span>
							<span>
								{imageList.map((img) => {
									return (
										<img key={img} className="product-img" src={`http://localhost:5000/files/${img}`} alt="img"></img>
									);
								})}
							</span>
						</List.Item>
						<List.Item className="item">
							<span className="left">商品详情:</span>
							<span dangerouslySetInnerHTML={{ __html: detail }}></span>
						</List.Item>
					</List>
				</Card>
			</div>
		);
	}
}

export default withRouter(ProductDetail);
