import { combineReducers } from 'redux';
import StorageUtils, { LoginUser } from '../utils/StorageUtils';
import { SET_HEAD_TITLE, RECEIVE_USER } from './action-types';
/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:37:19
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-30 21:55:58
 */

//管理头部标题
const initHeadTitle = '首页';

function headTitle(state: string = initHeadTitle, action: any) {
	switch (action.type) {
		case SET_HEAD_TITLE:
			return action.data;
		default:
			return state;
	}
}

//管理登录用户
const initUser = StorageUtils.getUser();

function user(state: LoginUser = initUser, action: any) {
	switch (action.type) {
		case RECEIVE_USER:
			return action.data;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	headTitle,
	user,
});

export default rootReducer;