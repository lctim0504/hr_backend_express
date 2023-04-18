import message from 'antd/es/message';
import { itemRequest } from './Request';


export const ItemLeaveType = () => itemRequest.get('/leavetypes')
    .then(res => { return (res.data); });

export const ItemSupervisor = (department_id: string) =>
    itemRequest.get('/supervisor/' + department_id)
        .then(res => { return (res.data); });

export const ItemLeaveHour = (id: string) =>
    itemRequest.get('/leavetype/' + id)
        .then(res => { return (res.data); });

export const ItemUserIds = () =>
    itemRequest.get('/userIds')
        .then(res => { return (res.data); });

export const ItemDepartments = () =>
    itemRequest.get('/departments')
        .then(res => { return (res.data); })
        .catch(error => console.error('Error fetching departments data:', error));

export const ItemDepartmentsSv = (department_id: string, data: any) =>
    itemRequest.put('/department/' + department_id, data)
        .then(res => { return (res); })
        .catch(err => message.error('新增失敗!' + err));
