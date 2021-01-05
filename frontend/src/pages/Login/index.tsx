import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import service from '@/service';
import { useModel, history } from 'umi';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const SERVICE_LIST = [
  {
    text: 'getNodeTest',
    service: (params: any) => service.test.getNodeTest(params),
  },
  {
    text: 'getSession',
    service: (params: any) => service.test.getSession(params),
  },
  {
    text: 'clearSession',
    service: (params: any) => service.test.clearSession(params),
  },
  {
    text: 'postNodeTest',
    service: (params: any) => service.test.postNodeTest(params),
  },
  {
    text: 'get401',
    service: (params: any) => service.test.get401(params),
  },
  {
    text: 'getCache',
    service: (params: any) => service.test.getCache(params),
  },
  {
    text: 'clearCache',
    service: (params: any) => service.test.clearCache(params),
  },
];

const Login = () => {
  const { setUserInfo } = useModel('userInfo');

  const onFinish = async (values: any) => {
    const params = {
      ...values,
    };
    const res = await service.login.login(params);
    if (res.success) {
      message.success('登录成功');
      setUserInfo(res.data);
      // history.push('/')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ width: 800, margin: '200px auto' }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
          username: 'admin',
          password: '123456',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        {SERVICE_LIST.map(item => (
          <Button onClick={() => item.service({})} key={item.text}>
            {item.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Login;
