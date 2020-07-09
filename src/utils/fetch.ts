import axios from 'axios';

const METHOD = {
	POST: 'post',
	GET: 'get',
	PUT: 'put',
	DELETE: 'delete',
};

const axiosInstance = axios.create({
	timeout: 10000,
});

// 过滤掉请求参数为 null | undefined | '' 的属性
const filterParams = params => {
	const newPrams = {};
	for (const key in params) {
		const paramsItem = params[key];
		if (paramsItem !== null && typeof paramsItem !== 'undefined' && paramsItem !== '') {
			newPrams[key] = params[key];
		}
	}
	return newPrams;
};

const request = (method, url, params, restConfig = {}) => {
	params = typeof params === 'undefined' ? null : filterParams(params);
	return new Promise((_resolve, reject) => {
		const config = {
			method,
			url,
			data: method === METHOD.POST || method === METHOD.PUT ? params : null,
			params: method === METHOD.GET || method === METHOD.DELETE ? params : null,
			...restConfig,
		};
		axiosInstance(config).then(
			() => {
				// TODO: 自定义
				// (data && data.code === '100') || data.success ? resolve(data) : reject(data.msg);
			},
			err => {
				reject(err.message);
			},
		);
	});
};

export default request;
