const axios = require('axios').default;

const getRequest = (Url, Auth) => {
	return axios.get(Url, {
		headers: {
			Authorization: Auth
		}
	});
};
const getRequestwithParams = (Url, Auth, param) => {
	return axios.get(Url, {
		params: param,
		headers: {
			Authorization: Auth
		}
	});
};
const postRequest = (Url, body, Auth) => {
	return axios.post(Url, body, {
		headers: Auth
	});
};
module.exports = { getRequest, getRequestwithParams, postRequest };
