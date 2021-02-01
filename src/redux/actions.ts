import { RootAction } from 'typesafe-actions';
import { reqRoleById } from './../api/index';
import { message } from 'antd';
import { reqLogin } from '../api';
import { UserModel } from '../pages/user/model';
import { RECEIVE_USER, SET_HEAD_TITLE } from './action-types';
import StorageUtils from '../utils/StorageUtils';
import { Dispatch } from 'react';
/*
 * @Descripttion: 包含多个actiob creator的函数模块
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:38:20
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-01 16:55:30
 */
export const setHeadTitle = (headTitle: string) => ({ type: SET_HEAD_TITLE, data: headTitle });

export const receiveUser = (user: UserModel) => ({ type: RECEIVE_USER, user });

export const login = (username: string, password: string) => async (dispatch: Dispatch<RootAction>) => {
	const result = await reqLogin(username, password);
	if (result.status === 0) {
		const user = result.data;
		if (user) {
			const role = await reqRoleById(user.roleId ?? '');
			StorageUtils.saveUser({
				id: user.id ?? -1,
				name: user.name ?? '',
				menus: role.menus?.split(',') ?? [],
				roleId: role.id?.toString() ?? '',
			});
			dispatch(receiveUser(user));
			message.success('登录成功');
		}
	} else {
		message.error('登录失败');
	}
};
