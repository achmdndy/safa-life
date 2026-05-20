import * as axios from "axios";

const apiConfig = axios.default.create({
	baseURL: "https://safalife-api.achmdndy.dev",
	timeout: 310000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default apiConfig;