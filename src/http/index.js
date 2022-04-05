import axios from "axios";

export const API_URL = 'http://localhost:5000';

export const AVATAR_URL = `${API_URL}/avatars/`;
export const MESSAGE_URL = `${API_URL}/messages/`;
export const VOICE_URL = `${API_URL}/voices/`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL + '/api',
});

$api.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default $api;
