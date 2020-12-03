/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-09-28 21:45:10
 * @LastEditors: MFine
 * @LastEditTime: 2020-12-03 21:06:39
 */
import { message } from 'antd';
import jsonp from 'jsonp';
import ajax from './ajax';
import { ReponseValue } from './Model';
import { ReqMethodEnum } from './ReqMethodEnum';
import { PageSplitModel } from './Model';
import { ProductsModel } from './../pages/Product/Model';

export const reqLogin = (name: string, password: string): Promise<any> =>
	ajax<any>('/api/user/login', { name, password }, ReqMethodEnum.POST);

export const reqAddUser = (user: any) => ajax('/manage/user/add', user, ReqMethodEnum.POST);

export const reqWheater = (city: string): Promise<{ dayPictureUrl: any; weather: any }> => {
	return new Promise((resolve, reject) => {
		jsonp(
			`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
			(err, data: any) => {
				if (!err && data.status === 'success') {
					const { dayPictureUrl, weather } = data.results[0].weather_data[0];
					resolve({ dayPictureUrl, weather });
				} else {
					message.error('获取天气信息失败!');
				}
			}
		);
	});
};

export const reqCategorys = (parentId: string): Promise<ReponseValue<any>> =>
	ajax<ReponseValue<any>>(`/api/category/list/${parentId}`);

export const reqAddCategory = (parentId: string, categoryName: string, name: string): Promise<ReponseValue<any>> =>
	ajax<ReponseValue<any>>('/api/category/add', { parentId, categoryName, name }, ReqMethodEnum.POST);

export const reqUpdateCategory = (
	id: string,
	parentId: string,
	name: string,
	categoryName: string
): Promise<ReponseValue<any>> =>
	ajax<ReponseValue<any>>('/api/category/update', { id, parentId, name, categoryName }, ReqMethodEnum.PUT);

export const reqProducts = (pageNum: number, pageSize: number): Promise<PageSplitModel<ProductsModel>> =>
	ajax<PageSplitModel<ProductsModel>>('/api/products/list', { pageNum, pageSize }, ReqMethodEnum.POST);

/**
 * @name: 根据描述搜索商品
 * @test: test font
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const reqProductsByDesc = (
	desc: string,
	pageNum: number,
	pageSize: number
): Promise<PageSplitModel<ProductsModel>> =>
  ajax<PageSplitModel<ProductsModel>>(`/api/products/searchByDesc/${desc}/${pageNum}/${pageSize}`, ReqMethodEnum.GET);

/**
 * @name: 根据名称搜索商品
 * @test: test font
 * @msg: 
 * @param {*}
 * @return {*}
 */
export const reqProductsByName = (
	name: string,
	pageNum: number,
	pageSize: number
): Promise<PageSplitModel<ProductsModel>> =>
	ajax<PageSplitModel<ProductsModel>>(`/api/products/searchByName`, {
    name:name,
    pageNum:pageNum,
    pageSize:pageSize
  },ReqMethodEnum.GET);
