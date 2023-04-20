import axios from 'axios';
// const url = 'http://192.168.0.206:5000';
const url = 'http://localhost:5000';

export const urlString = url;
// // 從 localStorage 中獲取 JWT
// const getToken = () => {
//     return localStorage.getItem('token');
// };

// // 設置 Authorization 標頭
// const setAuthHeader = () => {
//     const token = getToken();
//     if (token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//         delete axios.defaults.headers.common['Authorization'];
//     }
// };

export const userRequest = axios.create({
    baseURL: url + '/user',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const authRequest = axios.create({
    baseURL: url + '/auth',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const leaveRequest = axios.create({
    baseURL: url + '/leave',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});


export const overtimeRequest = axios.create({
    baseURL: url + '/overtime',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const scheduleRequest = axios.create({
    baseURL: url + '/schedule',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const itemRequest = axios.create({
    baseURL: url + '/item',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const quotaRequest = axios.create({
    baseURL: url + '/quota',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const exportRequest = axios.create({
    baseURL: url + '/export',
    headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
    withCredentials: true
});
