import { Col, Modal, Row, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login2 = () => {

    const navigate = useNavigate();
    const [account, setUsername] = useState('');
    const [idList, setIdList] = useState<{ value: string }[]>([]);
    const [password, setPassword] = useState('');
    const [fail, setFail] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/item/userIds')
            .then(response => {
                const result = response.data.map((item: { employee_id: any; }) => ({ value: item.employee_id.toString() }))
                //console.log(result)
                setIdList(result)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // const handleUsernameChange = (value: string) => {
    //     setUsername(value);
    // }
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onFinishFailed = () => {
        setFail(true);
    };

    const handleClick = () => {
        axios.post('http://localhost:5000/auth/login', { account, password }, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    if (window.history.length > 1) {
                        navigate(-2);
                        console.log('yes');
                    } else {
                        navigate('/home');
                        console.log('no');
                    }
                    setOpen(false)
                }
            })
            .catch((error) => {
                onFinishFailed();
            });
    };

    const [open, setOpen] = useState(true);

    return (
        <>
            {/* <Button type="primary" onClick={() => setOpen(true)}>
                Open Modal of 1000px width
            </Button> */}
            <Modal
                title="請先登錄"
                centered
                open={open}
                onOk={handleClick}
                closable={false}
                width={500}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="員工代號"
                        name="employee_id"
                        rules={[{ required: true, message: '此為必填欄位' }]}
                    >
                        {/* <Select
                            showSearch
                            placeholder="Select your code"
                            optionFilterProp="children"
                            onChange={handleUsernameChange}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                                (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            options={idList}
                        /> */}
                        <Input value={account} onChange={handleUsernameChange} />
                    </Form.Item>
                    <Form.Item
                        label="密碼"
                        name="password"
                        rules={[{ required: true, message: '此為必填欄位' }]}
                    >
                        <Input.Password value={password} onChange={handlePasswordChange} />
                    </Form.Item>
                    {/* <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
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
                    </Form.Item> */}
                </Form>
            </Modal>
        </>
    )
}

export default Login2