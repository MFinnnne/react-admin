/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2020-11-30 22:46:31
 * @LastEditors: MFine
 * @LastEditTime: 2020-12-14 21:37:33
 */
import ajax from '../../api/ajax';
import { PageSplitModel } from '../../api/Model';
import { CategoryModel } from '../../pages/category/Model';
import { ProductsModel } from '../../pages/product/Model';

describe('test api', () => {
	test('test reqByProductsByName', async () => {
		const result = await ajax<PageSplitModel<ProductsModel>>('http://localhost:5000/api/products/searchByName', {
			name: '8',
			pageNum: 1,
			pageSize: 3,
		});
		if (result.total === 0) {
			expect(result.list?.length).toEqual(0);
		} else {
			expect(result.list?.length).toBeGreaterThan(0);
		}
	});

	test('test reqCategoryById ', async () => {
		const result = await ajax<CategoryModel>('http://localhost:5000/api/category/findCategoryById/5');
		expect(result.name).toEqual('手机');
	});
});
