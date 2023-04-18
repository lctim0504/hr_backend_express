import React, { useState, useEffect } from 'react';
import { message } from 'antd';

const MyMessage = (props: { type: any; }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isMessageShown, setIsMessageShown] = useState(false);

    const showMessage = (type: any) => {
        switch (type) {
            case 'info':
                messageApi.info('信息提示');
                break;
            case 'warning':
                messageApi.warning('警告提示');
                break;
            case 'error':
                messageApi.error('错误提示');
                break;
            default:
                messageApi.success('成功提示');
                break;
        }
    };

    useEffect(() => {
        if (isMessageShown) {
            showMessage(props.type);
            setIsMessageShown(false);
        }
    }, [isMessageShown]);

    return (
        <>
            {contextHolder}
        </>
    );
};

export default MyMessage;