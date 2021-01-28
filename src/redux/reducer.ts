import { combineReducers } from 'redux';
import StorageUtils, { LoginUser } from '../utils/StorageUtils';
/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:37:19
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-27 23:55:31
 */

 //管理头部标题
const initHeadTitle = '首页';
function headTitle(state: string = initHeadTitle, action: any) {
  switch (action.type) {
  
  
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
      break;
  }
}


export default combineReducers({
  headTitle,user
})

