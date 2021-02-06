/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-10-01 19:14:47
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-06 23:40:49
 */
import React, { Component } from 'react';
import { Card, Button } from 'antd';
import ReactEcharts from 'echarts-for-react';

interface State {
	sales: number[];
	storage: number[];
}

class Bar extends Component<{}, State> {
  echarts_react: any;
	constructor(props: any) {
		super(props);
		this.state = {
			sales: [5, 20, 36, 10, 10, 20],
			storage: [6, 21, 37, 11, 11, 21],
		};
	}

	private update = () => {
		this.setState((state, props) => {
			return {
				sales: state.sales.map((item) => item + 1),
				storage: state.storage.map((item) => item - 1),
			};
		});
	};

	private getOption = (sales: number[], storage: number[]) => {
		return {
			title: {
				text: 'ECharts 入门示例',
			},
			legend: {
				data: ['销量', '库存'],
			},
      tooltip:{},
			xAxis: {
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
			},
			yAxis: {},
			series: [
				{
					name: '销量',
					type: 'bar',
					data: sales,
				},
				{
					name: '库存',
					type: 'bar',
					data: storage,
				},
			],
		};
	};

	render() {
		const { sales, storage } = this.state;
		return (
			<>
				<Card>
					<Button type="primary" onClick={this.update}>
						更新
					</Button>
				</Card>
				<Card title="柱状图一">
					<ReactEcharts option={this.getOption(sales, storage)}></ReactEcharts>
				</Card>
			</>
		);
	}
}

export default Bar;
