import { authRequest } from './Request';

export const AuthLogin = (data: { account: string; password: string; }) =>
    authRequest.post('/login', data)
        .then(res => (res.data));

export const AuthPost = (account: any) =>
    authRequest.post('/register', account)
        .then(response => console.log(response.data))
        .catch(error => console.error('Error post account:', error.response.data));

export const AuthGetAll = () =>
    authRequest.get('/')
        .then(response => { return response })
        .catch(error => { return Promise.reject(error.response); });