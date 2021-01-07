/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-04 22:54:12
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-07 22:46:08
 */
export interface RoleModel {
	menus: string[];
	id: number;
	name: string;
	createTime: Date;
	__v: number;
	authTime: Date;
	authName: string;
}
