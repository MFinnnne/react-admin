import { HeadTitle } from './model';
import { combineReducers } from 'redux';
import StorageUtils, { LoginUser } from '../utils/StorageUtils';
import { ActionType } from './action-types';
/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:37:19
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-29 00:24:58
 */

 //管理头部标题
const initHeadTitle = '首页';

function headTitle(state: string = initHeadTitle, action: any) {
  switch (action.type) {
    case ActionType.SET_HEAD_TITLE:
      return action.data
    default:
      return state;
      break;
  }
}

//管理登录用户
const initUser = StorageUtils.getUser();
function user(state: LoginUser = initUser, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}


export default combineReducers({
  headTitle,user
})

