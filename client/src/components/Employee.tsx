import { Button, Form, Input, Card, message } from 'antd'
import DepartmentModal from './DepartmentModal';
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { UserPost } from '../app/UserApi';
import { AuthPost } from '../app/AuthApi';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    // required: '${label} 為必填欄位',
    required: '',
};

// const handleClick = () => {
//     console.log("a");
// }

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
        // await Promise.all([,]);
        UserPost(employee);
        AuthPost(account);
    };

    const [form] = useForm();

    return (
        <Card title="新增使用者" bordered={false} >
            <Form
                {...layout}
                form={form}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: '100%' }}
                validateMessages={validateMessages}
            >
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
                    <DepartmentModal form={form} setIsSV={setIsSV} svChk={true} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 22 }}>
                    <Button type="primary" htmlType="submit" >
                        新增
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default EmployeeForm