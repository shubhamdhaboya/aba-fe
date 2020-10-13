import axios from 'axios';

var user = localStorage.getItem("user");
var token;

try {
    user = JSON.parse(localStorage.getItem("user"));
} catch(err) {
    user = {};
}
if (user && user.token !== undefined) {
	token = "Bearer " + user.token;
}

const API_URL = "http://localhost:5000";

const instance = axios.create({
    baseURL: API_URL
});

if (token) {
	instance.defaults.headers.common['Authorization'] = token;
}

instance.interceptors.response.use(
(response) => {
	user.token = response.headers["refresh-token"];
	localStorage.setItem("user", JSON.stringify(user));
	return Promise.resolve(response.data);
},
(error) => {
	if (error.response.status === 401) {
		localStorage.removeItem("user");
		window.location.href = "/auth";
	}

	return Promise.reject(error);;
})

export default instance;
