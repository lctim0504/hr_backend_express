import { Button, Form, Input, Card } from 'antd'
import React, { useState } from 'react';
import DepartmentModal from './DepartmentModal';
import { useForm } from 'antd/es/form/Form';
import {  UserPut } from '../app/UserApi';
import { ItemDepartmentsSv } from '../app/ItemApi';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    // required: '${label} 為必填欄位',
    required: '',
};

const UpdateManager = () => {

    const [employeeNo, setEmployeeNo] = useState('');
    const [form] = useForm();
    const [isSV, setIsSV] = useState(false);

    const onFinish = async (values: any) => {
        //更新Sv
        console.log(values);
        const data = {
            id: values.username,
            isSupervisor: true,
        }
        const data2 = {
            supervisor_id: values.userName
        }
        UserPut(values.username, data);
        ItemDepartmentsSv(values.department_id, data2)
    };

    return (
        <Card title="更新部門主管" bordered={false} >
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                form={form}
            >
                <Form.Item label="部門編號" name="department_id"
                    rules={[{ required: true }]}
                >
                    <DepartmentModal form={form} setIsSV={setIsSV} svChk={false} />
                </Form.Item>
                <Form.Item label="主管編號" name="username"
                    rules={[{ required: true }]}
                >
                    <Input value={employeeNo} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        更新
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default UpdateManager