/*
 * 所有接口请求函数模块
 */

import ajax from './ajax';

export const reqLogin=(username: string, password: string):Promise<any>=>  ajax<any>('/login', { username, password });


export const reqAddUser=(user:any)=>ajax('/manage/user/add',user,'POST')