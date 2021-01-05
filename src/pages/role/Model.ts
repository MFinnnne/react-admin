/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-01-04 22:54:12
 * @LastEditors: MFine
 * @LastEditTime: 2021-01-04 23:45:15
 */
export interface RoleModel {
	menus: string[];
	id: number;
	name: string;
	create_time: Date;
	__v: number;
	auth_time: number;
	auth_name: string;
}
