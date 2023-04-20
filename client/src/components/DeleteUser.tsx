import { Button, Form, Input, Card, Checkbox } from 'antd'


const DataChangeForm = () => {

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

  return (
    <div>
      <Card title="刪除使用者帳密" bordered={false} style={{ width: 300 }}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item label="員工編號" name="username"
            rules={[{ required: true }]}
          >
            <Input />
            <Checkbox>同時刪除員工資料</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              刪除
            </Button>
          </Form.Item>
        </Form>
      </Card>

    </div>
  )
}

export default DataChangeForm