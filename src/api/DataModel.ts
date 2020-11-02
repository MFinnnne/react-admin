/*
 * @Descripttion: 
 * @version: 
 * @Author: MFine
 * @Date: 2020-11-02 15:10:03
 * @LastEditors: MFine
 * @LastEditTime: 2020-11-02 15:10:25
 */
export interface ReponseValue<T> {
	flag?: boolean;
	status?: number;
	message?: string;
	data?: T | T[];
}