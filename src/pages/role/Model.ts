/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-04 22:54:12
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-14 00:41:44
 */
export interface RoleModel {
	id: number|null;
	name: string;
	createTime: String;
	menus: string;
  v: number;
	authTime: String|null;
	authName: string;
}
  