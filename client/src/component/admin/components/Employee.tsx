import { Button, Form, Input, Card } from 'antd'
import DepartmentModal from './DepartmentModal';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';

//新增使用者表單
const EmployeeForm = () => {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        // required: '${label} 為必填欄位',
        required: '',
    };
    const onFinish = async (values: any) => {
        const account = {
            account: values.employee_id,
            password: values.password
        }
        const employee = {
            employee_id: values.employee_id,
            name: values.name,
            department_id: values.department_id,
            work_type_id: '1-1',
            isAdmin: false
        };
        // console.log(account);
        // console.log(employee);

        await Promise.all([
            axios.post('http://localhost:5000/auth/register', account)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error post account:', error.response.data);
                }),
            axios.post('http://localhost:5000/user/', employee)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error post employee:', error.response.data);
                })
        ]);

    };

    const [form] = useForm();

    return (
        <div>
            <Card title="新增使用者" bordered={false} style={{ width: 300 }}>
                <Form
                    {...layout}
                    form={form}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                    validateMessages={validateMessages}
                >
                    <Form.Item label="員工編號" name="employee_id"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="員工姓名" name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="生日(民國)" name="password"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="部門編號" name="department_id"
                        rules={[{ required: true }]}
                    >
                        <DepartmentModal form={form} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            新增
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default EmployeeForm