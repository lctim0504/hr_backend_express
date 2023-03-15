import { Checkbox, Table } from 'antd'
import React, { useEffect } from 'react'
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import moment from 'moment';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}
const columns: ColumnsType<DataType> = [
    {
        title: '員工編號',
        width: 100,
        dataIndex: 'employee_id',
        key: 'employee_id',
        fixed: 'left',
    },
    {
        title: '姓名',
        width: 100,
        dataIndex: 'employee',
        key: 'employee',
        fixed: 'left',
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
        render: (date) => moment(date).format('HH:mm'),
    },
    {
        title: 'to',
        dataIndex: 'end_time',
        key: 'end_time',
        width: 75,
        align: 'center',
        render: (date) => moment(date).format('HH:mm'),
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
        width: 100,
        align: 'center',
        render: (permit) => (
            <Checkbox checked={permit} />
        ),
    },
];

const Approval = () => {

    const [data, setData] = React.useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/leaves/filter?dpm=ITS001')
            .then(response => {
                const result = response.data; // 如果 response.data 是 undefined 就設為空陣列
                console.log(result);
                setData(result);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <div>
            <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
        </div>
    )
}

export default Approval