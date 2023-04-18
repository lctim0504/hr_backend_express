import { Checkbox, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import Header from './partials/header';
import Footer from './partials/footer';
import { ItemLeaveType } from '../app/ItemApi';
import { LeaveGetPerson, LeaveUpdate } from '../app/LeaveApi';
import { AbsenceOption, AbsenceDataType, PersonName } from '../interface/Absence';
import ConfigProps from '../interface/ConfigProps';

const HRApproval: React.FC<ConfigProps> = () => {

    const [config] = useState(() => {
        const storedConfig = localStorage.getItem('config');
        return storedConfig ? JSON.parse(storedConfig) : {};
    });
    const [absenceOption, setAbsenceOption] = useState<AbsenceOption>({ id: 1, name: '' });
    const [personName, setPersonName] = useState<PersonName[]>([]);

    const { department_id } = config;

    useEffect(() => {
        ItemLeaveType()
            .then((response: any) => {
                setAbsenceOption(response);
            });
    }, [])

    //資料庫對應欄位
    const columns: ColumnsType<AbsenceDataType> = [
        {
            title: '申請日期',
            dataIndex: 'create_time',
            key: 'create_time',
            width: 80,
            fixed: 'left',
            align: 'center',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: '員工編號',
            width: 75,
            dataIndex: 'employee_id',
            key: 'employee_id',
            align: 'center',
        },
        {
            title: '姓名',
            width: 75,
            dataIndex: 'employee_data',
            key: 'employee',
            align: 'center',
            filters: personName,
            onFilter: (value, record) => record.employee_data.name.indexOf(value as string) === 0,
            // sorter: (a, b) => a.employee_data.name.length - b.employee_data.name.length,
            // sortDirections: ['descend'],
            render: (employee_data) => {
                return employee_data.name;
            },
        }
        ,
        {
            title: '請假日期',
            dataIndex: 'start_time',
            key: 'start_time',
            width: 80,
            align: 'center',
            sorter: (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
            sortDirections: ['descend'],
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: '開始時間',
            dataIndex: 'start_time',
            key: 'start_time',
            width: 75,
            align: 'center',
            render: (date) => moment(date).isValid() ? moment(date).subtract(8, 'hours').format('HH:mm') : '-',
        },
        {
            title: '結束時間',
            dataIndex: 'end_time',
            key: 'end_time',
            width: 75,
            align: 'center',
            render: (date) => moment(date).isValid() ? moment(date).subtract(8, 'hours').format('HH:mm') : '-',
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
            render: (leaveTypeId) => {
                const leaveType = absenceOption.find((option: { id: number; }) => option.id === leaveTypeId);
                return leaveType ? leaveType.name : '-';
            }
        },
        // {
        //     title: '代理人',
        //     dataIndex: 'substitute',
        //     key: 'substitute',
        //     width: 75,
        //     align: 'center',
        // },
        {
            title: '請假事由',
            dataIndex: 'reason',
            key: 'reason',
            width: 75,
            align: 'center',
        },

        {
            title: '主管名稱',
            dataIndex: 'permit_id',
            key: 'permit_id',
            fixed: 'right',
            width: 80,
            align: 'center',
        },
        {
            title: '送簽',
            dataIndex: 'hr_permit',
            key: 'hr_permit',
            fixed: 'right',
            width: 50,
            align: 'center',
            sorter: (a, b) => (a.hr_permit ? 1 : 0) - (b.hr_permit ? 1 : 0),
            sortDirections: ['ascend'],
            render: (hr_permit, record) => (
                <Checkbox checked={hr_permit} onClick={() => handlePermitClick(record)} />
            ),
        },
    ];

    const [messageApi, contextHolder] = message.useMessage();

    const info = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };

    const [data, setData] = useState<AbsenceDataType[]>([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        LeaveGetPerson(department_id)
            .then((data: any) => {
                const nameSet = new Set(data.map((data2: any) => (data2.employee_data.name)));
                const nameList = Array.from(nameSet, (name) => ({ text: name, value: name }));
                setPersonName(nameList.map(({ text, value }) => ({ text: text as string, value: value as string })));
                setData(data || []);
            })
            .catch((err: any) => console.error('Error fetching data:', err));
    }

    const handlePermitClick = async (record: AbsenceDataType) => {
        const updatedRecord = record.hr_permit == true ?
            { seq: record.seq, hr_permit: false, permit_time: moment().format('yyyy-MM-DD HH:mm') } :
            { seq: record.seq, hr_permit: true, permit_time: moment().format('yyyy-MM-DD HH:mm') };

        // LeaveUpdate(updatedRecord)
        //     .then(async (data) => {
        //         if (data.status === 200)
        //             await fetchData();
        //         info();
        //     })
        //     .catch((err) => console.error('error updating permission:', err));
    };

    return (
        <>
            <Header />
            {contextHolder}
            <div>
                <Table columns={columns} dataSource={data.map((item) => ({ ...item, key: item.seq }))} scroll={{ x: 1500, y: 300 }} />
            </div>
            <Footer />
        </>
    )
}

export default HRApproval