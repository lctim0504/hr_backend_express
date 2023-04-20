import message from 'antd/es/message';
import { OverTimeData, UpdatedRecord, UpdateTimeRecord } from '../interface/Api';
import { overtimeRequest } from './Request';



export const OvertimeGet = () => overtimeRequest.get('/')
    .then(res => { console.log(res.data); });

export const OvertimeGetOne = (id: string) =>
    overtimeRequest.get('/' + id)
        .then(res => { return (res.data); });

export const OvertimeGetWorkDate = (id: string, month: string) =>
    overtimeRequest.get('/' + id + month)
        .then(res => { return (res.data); });

export const OvertimeGetPerson = (department_id: string) =>
    overtimeRequest.get('/filter?department_id=' + department_id)
        .then(res => { return (res.data); });

export const OvertimeUpdate = (id: string, updatedRecord: UpdatedRecord) =>
    overtimeRequest.put('/' + id, updatedRecord)
        .then(res => { return (res); });

export const OvertimeUpdateActTime = (id: string, UpdateTimeRecord: UpdateTimeRecord) =>
    overtimeRequest.put('/' + id, UpdateTimeRecord)
        .then(res => { return (res); });

export const OvertimePost = (data: OverTimeData) => overtimeRequest.post('/', data)
    .then(() => message.success('成功新增'))
    .catch(err => { console.log(err) });

export const OvertimeDelete = (data: string) => overtimeRequest.delete('/' + data)
    .then(res => { console.log(res); })
    .catch(err => { message.error(err); });
