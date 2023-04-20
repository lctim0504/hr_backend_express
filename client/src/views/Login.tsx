import { Button, Modal } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthLogin } from '../app/AuthApi';
import { ItemUserIds } from '../app/ItemApi';
import { Props, InputRef } from '../interface/ConfigProps';

const Login = ({ setConfig }: Props) => {
    const loginText = "登入", modalTitle = "請先登錄", employeeText = "員工代號", passwordText = "密碼";
    const navigate = useNavigate();
    const [account, setUsername] = useState('');
    // const [idList, setIdList] = useState<{ value: string }[]>([]);
    const [password, setPassword] = useState('');
    const [fail, setFail] = useState(false);
    const [visible, setVisible] = useState(true);

    // useEffect(() => {
    //     ItemUserIds()
    //         .then((response) => {
    //             const result = response.map((item: { employee_id: any }) => ({ value: item.employee_id.toString() }));
    //             setIdList(result);
    //         })
    //         .catch((err: any) => setFail(true)
    //         );
    // }, []);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleClick = () => {
        AuthLogin({ account, password })
            .then((response: any) => {
                const config = {
                    employee_id: response.employee_id,
                    name: response.name,
                    work_type: response.work_type,
                    work_type_id: response.work_type_id,
                    department_id: response.department_id,
                    isAdmin: response.isAdmin,
                    isSupervisor: response.isSupervisor,
                };
                localStorage.setItem('config', JSON.stringify(config));
                setConfig(config);
                setVisible(false);
                navigate('/Absence');
            })
            .catch((err: any) => {
                console.log(err);
                setFail(true);
                if (err.response.status === "403")
                    alert("沒有權限!");
                else
                    alert("帳密錯誤!");
            });
    };


    // 當 Modal 被打開時，使得輸入框自動 focus
    const nameInputRef = useRef<InputRef>(null);
    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [visible]);

    const focusNextInput = (currentIndex: number) => {
        const form = document.querySelector('form') as HTMLFormElement;
        const inputs = Array.from(form.querySelectorAll('input'));
        const nextIndex = currentIndex + 1;
        const nextInput = inputs[nextIndex] as HTMLInputElement;
    
        if (nextInput) {
            nextInput.focus();
        } else {
            const buttons = Array.from(form.querySelectorAll('button[type="button"]'));
            const secondButton = buttons.length === 2 ? buttons[1] as HTMLElement : buttons[0] as HTMLElement;
            secondButton.focus();
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 取消 Enter 的預設換行行為
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);

            //button選取
            const buttons = document.querySelectorAll('button[type="button"]');
            const secondButton = buttons.length === 2 ? buttons[1] as HTMLElement : buttons[0] as HTMLElement;

            if (!form.elements[index + 1])
                secondButton.focus();
            else
                form.elements[index + 1].focus(); // 執行 Tab 的行為
        }
    };

    return (
        <>
            <Modal
                title={modalTitle}
                centered
                open={visible}
                onOk={handleClick}
                closable={false}
                width={500}
                footer={
                    <div className="center">
                        <Button onClick={handleClick} type="primary">{loginText}</Button>
                    </div>
                }
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    onFinishFailed={() => setFail(true)}
                >

                    <Form.Item
                        label={employeeText}
                        name="employee_id"
                        rules={[{ required: true, message: '此為必填欄位' }]}
                        htmlFor="employee-input"

                    >
                        <Input value={account}
                            //@ts-ignore
                            ref={nameInputRef}
                            onChange={handleUsernameChange}
                            onKeyDown={handleKeyDown} />
                    </Form.Item>
                    <Form.Item
                        label={passwordText}
                        name="password"
                        rules={[{ required: true, message: '此為必填欄位' }]}
                    >
                        <Input.Password value={password} onKeyDown={handleKeyDown} onChange={handlePasswordChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Login