import message from 'antd/es/message';
import { userRequest } from './Request';

export const UserList = () =>
    userRequest.get('/')
        .then(res => { return (res.data); });

export const UserPost = (employee: any) =>
    userRequest.post('/', employee)
        .then(() => message.success('成功新增使用者'))
        .catch((err) => message.error('新增失敗!' + err));

export const UserPut = (id: string, data: any) =>
    userRequest.put('/' + id, data)
        .then(res => { return (res); })
        .catch(error => console.log(error));

