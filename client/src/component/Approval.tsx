import { Checkbox, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import moment from 'moment';

interface DataType {
    key: React.Key;
    id: string;
    employee_id: string;
    employee: {
        name: string;
    };
    leave_date: string;
    start_time: string;
    end_time: string;
    hours: number;
    leave_type_id: string;
    substitute: string;
    reason: string;
    permit: boolean;
}

const Approval = () => {

    const columns: ColumnsType<DataType> = [
        {
            title: '員工編號',
            width: 75,
            dataIndex: 'employee_id',
            key: 'employee_id',
            fixed: 'left',
            align: 'center',
        },
        {
            title: '姓名',
            width: 75,
            dataIndex: 'employee',
            key: 'employee',
            fixed: 'left',
            align: 'center',
            render: (employee) => {
                return employee.name;
            },
        }
        ,
        {
            title: '請假日期',
            dataIndex: 'leave_date',
            key: 'leave_date',
            width: 150,
            align: 'center',
            render: (date) => moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'from',
            dataIndex: 'start_time',
            key: 'start_time',
            width: 75,
            align: 'center',
            render: (date) => moment(date).isValid() ? moment(date).format('HH:mm') : '-',
        },
        {
            title: 'to',
            dataIndex: 'end_time',
            key: 'end_time',
            width: 75,
            align: 'center',
            render: (date) => moment(date).isValid() ? moment(date).format('HH:mm') : '-',
        },
        {
            title: '時數',
            dataIndex: 'hours',
            key: 'hours',
            width: 75,
            align: 'center',
        },
        {
            title: '假別',
            dataIndex: 'leave_type_id',
            key: 'leave_type_id',
            width: 75,
            align: 'center',
        },
        {
            title: '代理人',
            dataIndex: 'substitute',
            key: 'substitute',
            width: 75,
            align: 'center',
        },
        {
            title: '請假事由',
            dataIndex: 'reason',
            key: 'reason',
            width: 75,
            align: 'center',
        },
        {
            title: '主管審核',
            dataIndex: 'permit',
            key: 'permit',
            fixed: 'right',
            width: 40,
            align: 'center',
            render: (permit, record) => (
                <Checkbox checked={permit} onClick={() => handlePermitClick(record)} />
            ),
        },
        {
            title: '最後更新時間',
            dataIndex: 'last_update_time',
            key: 'last_update_time',
            fixed: 'right',
            width: 100,
            align: 'center',
            render: (date) => moment(date).isValid() ? moment(date).format('YYYY-MM-DD HH:mm') : '-',
        },
    ];

    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };

    const [data, setData] = useState<DataType[]>([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/leaves/filter?dpm=' + 'PTS002');
            const result = response.data || []; // 如果 response.data 是 undefined 就設為空陣列
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handlePermitClick = async (record: DataType) => {
        const updatedRecord = record.permit == true ?
            { id: record.id, permit: false, last_update_time: moment().format('yyyy-MM-DD HH:mm') } :
            { id: record.id, permit: true, last_update_time: moment().format('yyyy-MM-DD HH:mm') };


        try {
            const response = await axios.put('http://localhost:5000/leaves/', updatedRecord);
            if (response.status === 200) {
                info();
                await fetchData();
            }
        } catch (error) {
            console.log("error updating permission:");
        }
    };

    return (
        <>
            {contextHolder}
            <div>
                <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
            </div>
        </>
    )
}

export default Approval