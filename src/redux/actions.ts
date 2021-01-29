import { reqLogin } from '../api';
import { UserModel } from '../pages/user/model';
import { LoginUser } from '../utils/StorageUtils';
import { RECEIVE_USER, SET_HEAD_TITLE } from './action-types';
/*
 * @Descripttion: 包含多个actiob creator的函数模块
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:38:20
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-30 00:45:11
 */
export const setHeadTitle = (headTitle: string) => ({ type: SET_HEAD_TITLE, data: headTitle });

export const receiveUser = (user: UserModel) => ({ type: RECEIVE_USER, user });

export const login = (username: string, password: string) => {
	return async (dispatch: any) => {
		const result = await reqLogin(username, password);
		if (result.status === 0) {
			const user = result.data;
			if (user) {
				dispatch(receiveUser(user));
			}
		} else {
      
		}
	};
};
