import message from 'antd/es/message';
import { scheduleRequest } from './Request';

export const ScheduleGetOne = (id: string) =>
    scheduleRequest.get('/' + id)
        .then(res => { return (res.data); });
        
export const SchedulePost = (excelData: any) =>
    scheduleRequest.post('/', excelData)
        .then(res => { if (res.status === 200) console.log(res); })
        .catch(err => { message.error(err); });
