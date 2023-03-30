import { Button, Form, Input, Card } from 'antd'
import DepartmentModal from './DepartmentModal';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'antd/es/form/Form';
import { Left2, Mid, Right2 } from '../styled';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    // required: '${label} 為必填欄位',
    required: '',
};

//新增使用者表單
const EmployeeForm = () => {

    const [isSV, setIsSV] = useState(false);

    const onFinish = async (values: any) => {
        const account = {
            account: values.employee_id,
            password: values.password
        }
        const employee = {
            employee_id: values.employee_id,
            name: values.name,
            department_id: values.department_id,
            email: values.email,
            work_type_id: values.work_type_id,
            isAdmin: false,
            isSupervisor: isSV,
        };
        // console.log(account);
        // console.log(employee);
        await Promise.all([
            axios.post('http://localhost:5000/auth/register', account, { withCredentials: true })
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error post account:', error.response.data);
                }),
            axios.post('http://localhost:5000/user/', employee, { withCredentials: true })
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
        <Card title="新增使用者" bordered={false} style={{ width: '100%' }}>
            <Form
                {...layout}
                form={form}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: '100%' }}
                validateMessages={validateMessages}
            >
                <Mid>
                    <Left2>
                        <Form.Item label="員工編號" name="employee_id"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="帳號密碼" name="password"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Left2>
                    <Right2>
                        <Form.Item label="員工姓名" name="name"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="班別" name="work_type_id"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="部門編號" name="department_id"
                            rules={[{ required: true }]}
                        >
                            <DepartmentModal form={form} setIsSV={setIsSV} />
                        </Form.Item>
                    </Right2>
                </Mid>
                <Form.Item wrapperCol={{ offset: 22 }}>
                    <Button type="primary" htmlType="submit">
                        新增
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default EmployeeForm