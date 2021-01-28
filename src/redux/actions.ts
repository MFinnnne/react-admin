import { ActionType } from './action-types';
/*
 * @Descripttion: 包含多个actiob creator的函数模块
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:38:20
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-29 00:15:23
 */
export const setHeadTitle = (headTitle: string) => ({ type: ActionType.SET_HEAD_TITLE, data: headTitle });
