import axios from 'axios';

const API_URL = "http://localhost:5000";

const instance = axios.create({
    baseURL: API_URL
});

export default instance;
