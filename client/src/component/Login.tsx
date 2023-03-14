import { Col, Row, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [employee_id, setUsername] = useState('');
    const [idList, setIdList] = useState<{ value: string }[]>([]);
    const [password, setPassword] = useState('');
    const [fail, setFail] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then(response => {
                const result = response.data.map((item: { employee_id: any; }) => ({ value: item.employee_id.toString() }))
                console.log(result)
                setIdList(result)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleUsernameChange = (value: string) => {
        setUsername(value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onFinishFailed = () => {
        setFail(true);
    };

    const handleClick = () => {
        axios.post('http://localhost:5000/auth/login', { employee_id, password })
            .then(response => {
                if (response.status === 200) {
                    navigate('/home');
                }
            })
            .catch((error) => {
                onFinishFailed();
            });
    };

    return (
        <>
            <Row style={{ height: '30vh', width: '95vw' }}></Row>
            {/* content */}
            <Row style={{ height: '35vh', width: '95vw' }}>
                <Col span={8} style={{ height: '100%' }}></Col>
                <Col span={9} style={{ height: '100%' }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        style={{ maxWidth: 600, backgroundColor: 'lightgray', position: 'relative', paddingTop: '5%', borderRadius: '15px' }}
                        initialValues={{ remember: true }}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="員工代號"
                            name="employee_id"
                            rules={[{ required: true, message: '此為必填欄位' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Select your code"
                                optionFilterProp="children"
                                onChange={handleUsernameChange}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                options={idList}
                            />
                        </Form.Item>
                        <Form.Item
                            label="密碼"
                            name="password"
                            rules={[{ required: true, message: '此為必填欄位' }]}
                        >
                            <Input.Password value={password} onChange={handlePasswordChange} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                            <Row align="middle">
                                <Col span={8}>
                                    <Button type="primary" htmlType="submit" onClick={handleClick}>
                                        確認
                                    </Button>
                                </Col>
                                <Col span={16}>
                                    <p style={{ color: fail ? "red" : "transparent" }}>
                                        帳號或密碼錯誤
                                    </p>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={7} style={{ height: '100%' }}></Col>
            </Row>
            <Row style={{ height: '30vh', width: '95vw' }}></Row>
        </>
    )
}

export default Login