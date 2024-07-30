import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://daliy-matchs-backend.onrender.com/api/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

const authAxiosInstance = axios.create({
    baseURL: 'https://daliy-matchs-backend.onrender.com/api/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

const authAdminInstance = axios.create({
    baseURL: 'https://daliy-matchs-backend.onrender.com/api/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});


export { axiosInstance, authAxiosInstance,authAdminInstance };
