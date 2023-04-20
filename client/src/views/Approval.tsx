import { Checkbox, Table, message, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import Button from '@mui/material/Button';
import moment from 'moment';
import Header from './partials/header';
import Footer from './partials/footer';
import { LeaveGetPerson, LeaveUpdate } from '../app/LeaveApi';
import { ItemLeaveType } from '../app/ItemApi';
import { OvertimeGetPerson, OvertimeUpdate } from '../app/OvertimeApi';
import { AbsenceDataType, AbsenceOption, PersonName } from '../interface/Absence';
import { OverTimeDataType } from '../interface/OverTime';
import ConfigProps from '../interface/ConfigProps';

const Approval: React.FC<ConfigProps> = () => {

    const [config] = useState(() => {
        const storedConfig = localStorage.getItem('config');
        return storedConfig ? JSON.parse(storedConfig) : {};
    });
    const { department_id, name, employee_id } = config;

    const [absenceOption, setAbsenceOption] = useState<AbsenceOption>({ id: 1, name: '' });
    const [personName, setPersonName] = useState<PersonName[]>([]);
    const [isLook, setIsLook] = useState(true);

    //文字
    const systemTitle = "審核", record = "切換請假/加班", absenceText = "請假", overTimeText = "加班";

    useEffect(() => {
        ItemLeaveType()
            .then((response: any) => {
                setAbsenceOption(response);
            });
    }, [])

    const lookHandle = async () => {
        setIsLook(!isLook);
    }

    //資料庫對應欄位
    const columns: ColumnsType<AbsenceDataType | OverTimeDataType> = [
        {
            title: '申請日期',
            dataIndex: 'create_time',
            key: 'create_time',
            fixed: 'left',
            width: 80,
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
        },
        {
            title: isLook ? '請假日期' : '加班日期',
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
            title: isLook ? '結束時間' : '預計結束時間',
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
            title: isLook ? '假別' : '加班別',
            dataIndex: 'leave_type_id',
            key: 'leave_type_id',
            width: 75,
            align: 'center',
            render: isLook ?
                (leaveTypeId) => {
                    const leaveType = absenceOption.find((option: { id: number; }) => option.id === leaveTypeId);
                    return leaveType ? leaveType.name : '-';
                } :
                (overtimeTypeId) => {
                    return overtimeTypeId;
                }
        },
        {
            title: isLook ? '代理人' : '實際結束時間',
            dataIndex: 'sub_name',
            key: 'sub_name',
            width: 75,
            align: 'center',
        },
        {
            title: isLook ? '請假事由' : '加班事由',
            dataIndex: 'reason',
            key: 'reason',
            width: 75,
            align: 'center',
        },
        {
            title: '主管審核',
            dataIndex: 'sv_permit',
            key: 'sv_permit',
            fixed: 'right',
            width: 50,
            align: 'center',
            sorter: (a, b) => (a.sv_permit ? 1 : 0) - (b.sv_permit ? 1 : 0),
            sortDirections: ['ascend'],
            render: (sv_permit, record) => (<Checkbox checked={sv_permit} onClick={() => handlePermitClick(record)} />
            ),
        },
        {
            title: '最後更新時間',
            dataIndex: 'permit_time',
            key: 'permit_time',
            fixed: 'right',
            width: 100,
            align: 'center',
            render: (date) => moment(date).isValid() ? moment(date).format('YYYY-MM-DD HH:mm') : '-', //.subtract(8, 'hours')
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
    const [overTimeData, setOverTimeData] = useState<OverTimeDataType[]>([]);

    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        LeaveGetPerson(department_id)
            .then((data: any) => {
                const nameSet = new Set(data.map((data2: any) => (data2.employee_data.name)));
                const nameList = Array.from(nameSet, (name) => ({ text: name, value: name }));
                setPersonName(nameList.map(({ text, value }) => ({ text: text as string, value: value as string })));
                setData(data || []); // 如果 response.data 是 undefined 就設為空陣列
            })
        OvertimeGetPerson(department_id)
            .then((data: any) => {
                setOverTimeData(data || []); // 如果 response.data 是 undefined 就設為空陣列
            })
    }

    const handlePermitClick = async (record: AbsenceDataType | OverTimeDataType) => {
        const updatedRecord = record.sv_permit === true ?
            { sv_permit: false, permit_id: employee_id } :
            { sv_permit: true, permit_id: employee_id };
        console.log(record);
        //更新主管確認
        if (record.hasOwnProperty('leave_type_id')) {
            LeaveUpdate(record.seq, updatedRecord)
                .then(async (data: any) => {
                    if (data.status === 200)
                        await fetchData();
                })
        } else if (record.hasOwnProperty('overtime_type_id')) {
            OvertimeUpdate(record.seq, updatedRecord)
                .then(async (data: any) => {
                    if (data.status === 200)
                        await fetchData();
                })
        }
    };

    return (
        <>
            <Header />
            {contextHolder}

            <div className="container">
                <div className='one center'>
                    <h2>{isLook ? absenceText + systemTitle : overTimeText + systemTitle}</h2>
                </div>
                <div className='two'>
                    <div className='right'>
                        <h3 ><Button onClick={lookHandle} variant="outlined" className="record-btn">{record}</Button></h3>
                    </div>
                </div>
                <div className='five left'>
                </div>
            </div>

            <div>
                {
                    isLook ?
                        <Table columns={columns} pagination={{ pageSize: 10 }} dataSource={data.map((item) => ({ ...item, key: item.seq }))} scroll={{ x: 1500, y: 400 }} />
                        :
                        <Table columns={columns} pagination={{ pageSize: 10 }} dataSource={overTimeData.map((item) => ({ ...item, key: item.seq }))} scroll={{ x: 1500, y: 400 }} />
                }
            </div>
            <Footer />
        </>
    )
}

export default Approval
