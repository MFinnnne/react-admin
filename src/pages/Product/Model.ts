/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-11-03 22:59:39
 * @LastEditors: MFine
 * @LastEditTime: 2020-11-29 15:47:13
 */
	export interface ProductsModel {
		id: number;
		images: string;
		status: number;
		idStr: string;
		name: string;
		desc: string;
		detail: string;
		categoryId: string;
		pcatrgoryId: string;
		price: string;
		v: number;
	}

	export interface StringValidator {
		isAcceptable(s: string): boolean;
	}
