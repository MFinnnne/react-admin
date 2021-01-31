import { reqRoleById } from './../api/index';
import { message } from 'antd';
import { reqLogin } from '../api';
import { UserModel } from '../pages/user/model';
import { RECEIVE_USER, SET_HEAD_TITLE } from './action-types';
import StorageUtils from '../utils/StorageUtils';
/*
 * @Descripttion: 包含多个actiob creator的函数模块
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:38:20
 * @LastEditors: MFine
 * @LastEditTime: 2021-02-01 00:45:39
 */
export const setHeadTitle = (headTitle: string) => ({ type: SET_HEAD_TITLE, data: headTitle });

export const receiveUser = (user: UserModel) => ({ type: RECEIVE_USER, user });

export const login = (username: string, password: string) => {
	return async (dispatch: any) => {
    const result = await reqLogin(username, password);
		if (result.status === 0) {
			const user = result.data;
			if (user) {
        const role = await reqRoleById(user.roleId??"");
        StorageUtils.saveUser({id:user.id??-1,name:user.name??"",menus:role.menus?.split(',')??[],roleId:role.id?.toString()??''})
        dispatch(receiveUser(user));
        message.success("登录成功")
			}
		} else {
      message.error("登录失败")    
		}
	};
};