/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-10-14 21:16:42
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-25 23:40:11
 */

import store from 'store';

const USER_KEY = 'user_key';

export interface LoginUser {
	id: number;
	name: string;
  menus: string[];
  roleId:string;
}

export default {
	saveUser(user: LoginUser) {
		// localStorage.setItem(USER_KEY, JSON.stringify(user));
		store.set(USER_KEY, user);
	},

	getUser():LoginUser {
		// return JSON.parse(localStorage.getItem(USER_KEY) ?? '{}');
		return store.get(USER_KEY) || {};
	},

	removeUser() {
		// localStorage.removeItem(USER_KEY);
		store.remove(USER_KEY);
	},
};
