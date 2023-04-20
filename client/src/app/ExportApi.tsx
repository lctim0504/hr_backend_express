import message from 'antd/es/message';
import { exportRequest } from './Request';

export const ExportGetLeave = () => exportRequest.get('/leaveExcel', { responseType: 'blob' })
    .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data],
            { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'leavesRecords.xlsx');
        document.body.appendChild(link);
        link.click();
        if (link.parentNode !== null)
            link.parentNode.removeChild(link);
    }).catch(err => { message.error(err); });

export const ExportGetOvertime = () => exportRequest.get('/overtimeExcel', { responseType: 'blob' })
    .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data],
            { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'overtimeRecords.xlsx');
        document.body.appendChild(link);
        link.click();
        if (link.parentNode !== null)
            link.parentNode.removeChild(link);
    }).catch(err => { message.error(err); });