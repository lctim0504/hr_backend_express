import message from 'antd/es/message';
import { LeaveData, UpdatedRecord } from '../interface/Api';
import { leaveRequest } from './Request';


export const LeaveGet = () =>
    leaveRequest.get('/')
        .then(res => { console.log(res.data); });

export const LeaveGetOne = (id: string) =>
    leaveRequest.get('/' + id)
        .then(res => { return (res.data); });

export const LeaveGetWorkDate = (id: string, month: string) =>
    leaveRequest.get('/' + id + month)
        .then(res => { return (res.data); });

export const LeaveGetPerson = (department_id: string) =>
    leaveRequest.get('/filter?department_id=' + department_id)
        .then(res => { return (res.data); });

export const LeaveUpdate = (id: string, updatedRecord: UpdatedRecord) =>
    leaveRequest.put('/' + id, updatedRecord)
        .then(res => { return (res); });

export const LeavePost = (data: LeaveData) =>
    leaveRequest.post('/', data)
        .then(res => { console.log(res); })
        .catch(err => { console.log(err); });

export const LeaveDelete = (data: string) =>
    leaveRequest.delete('/' + data)
        .then(res => { console.log(res); })
        .catch(err => { message.error(err); });
