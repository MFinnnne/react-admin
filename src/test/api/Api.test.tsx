/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-11-30 22:46:31
 * @LastEditors: MFine
 * @LastEditTime: 2020-12-03 21:53:57
 */
import ajax from '../../api/ajax';
import { PageSplitModel } from '../../api/Model';
import { ReqMethodEnum } from '../../api/ReqMethodEnum';
import { ProductsModel } from '../../pages/Product/Model';

describe('test api', () => {
	test('test reqByProductsbyName', async () => {
		const result = await ajax<PageSplitModel<ProductsModel>>(
			'http://localhost:5000/api/products/searchByName',
			{
				name: '8',
				pageNum: 1,
				pageSize: 3,
			},
		);
		if (result.total === 0) {
			expect(result.list?.length).toEqual(0);
		} else {
			expect(result.list?.length).toBeGreaterThan(0);
		}
	});
});
