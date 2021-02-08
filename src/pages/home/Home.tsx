/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-10-01 19:10:44
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-09 00:18:23
 */
import { Card, Statistic } from 'antd';
import { QuestionCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React from 'react';
import './home.less';
import Line from './line';
const Home = () => {
	return (
		<>
			<div className="home">
				<Card title="商品总量" style={{ width: 250 }} extra={<QuestionCircleOutlined />}>
					<Statistic value={112893} suffix={'个'}></Statistic>
					<Statistic
						value={15}
						precision={2}
						suffix={
							<div>
								<span>%</span>
								<ArrowUpOutlined style={{ color: '#3f8600' }} />
							</div>
						}
						prefix="周同比"
					></Statistic>
					<Statistic
						value={16}
						precision={2}
						suffix={
							<div>
								<span>%</span>
								<ArrowDownOutlined style={{ color: '#cf1322' }} />
							</div>
						}
						prefix="日同比"
					></Statistic>
				</Card>
        <Line/>
			</div>
			<div className="home1">
				<Card></Card>
			</div>
		</>
	);
};

export default Home;
