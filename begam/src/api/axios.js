import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

const authAxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axiosInstance, authAxiosInstance };
