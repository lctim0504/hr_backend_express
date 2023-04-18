import React from 'react';
import { message } from 'antd'

const [messageApi, contextHolder] = message.useMessage();

const info = () => {
  messageApi.open({
    type: 'success',
    content: '成功申請',
  });
};

const Context = () => {
  return { contextHolder }
}

export default Context;


