import { Button, Form, Input, Card } from 'antd'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    // required: '${label} 為必填欄位',
    required: '',
};
const onFinish = (values: any) => {
    console.log(values);
};

const UpdateManager = () => {
    return (
        <Card title="更新部門主管" bordered={false} style={{ width: 300 }}>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <Form.Item label="部門編號" name="department_id"
                    rules={[{ required: true }]}
                >
                    <div
                        style={{ display: 'flex' }}
                    >
                        <Input style={{ display: 'flex' }} disabled={true} />
                        <Button style={{ display: 'flex' }}>選擇</Button>
                    </div>
                </Form.Item>
                <Form.Item label="主管編號" name="username"
                    rules={[{ required: true }]}
                >
                    <Input />
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