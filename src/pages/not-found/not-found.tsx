/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-02-11 01:17:41
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-11 01:42:57
 */

import { Button, Col, Row } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setHeadTitle } from '../../redux/actions';
import './not-found.scss';

const NotFound = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const goHome = () => {
		dispatch(setHeadTitle('404'));
		history.push('/home');
	};
	return (
		<Row className="not-found">
			<Col span={12} className="left"></Col>
			<Col span={12} className="right">
				<h1>404</h1>
				<h2>抱歉，您访问的页面不存在</h2>
				<div>
					<Button type="primary" onClick={goHome}>
						回到首页
					</Button>
				</div>
			</Col>
		</Row>
	);
};

export default NotFound;
