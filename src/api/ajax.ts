import { message } from 'antd';
import { rejects } from 'assert';
import Axios from 'axios';
import { promises, resolve } from 'dns';

export default function ajax<T>(url: string, data: {}, method: string = 'GET'): Promise<T> {
	return new Promise((resolve, rejects) => {
		let promise: Promise<T>;
		if (method === 'get') {
			promise = Axios.get(url, { params: data });
		} else {
			promise = Axios.post(url, data);
		}
		promise
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				message.error('请求出错：' + error.message);
			});
	});
}
