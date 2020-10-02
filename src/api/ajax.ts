import { message } from 'antd';
import Axios from 'axios';

export default function ajax<T>(url: string, data: {}, method: string = 'GET'): Promise<T> {
	return new Promise((resolve, rejects) => {
		let promise: Promise<T>;
		if (method === 'get') {
			promise = Axios.get(url, { params: data });
		} else {
			promise = Axios.post(url, data);
		}
		promise
			.then((response:any) => {
				resolve(response.data);
			})
			.catch((error) => {
				message.error('请求出错：' + error.message);
			});
	});
}
