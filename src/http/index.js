import axios from "axios";

export const API_URL = `http://localhost:5000`;
export const MESSAGE_URL = `${API_URL}/img/messages/`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL + '/api',
});

$api.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default $api;
