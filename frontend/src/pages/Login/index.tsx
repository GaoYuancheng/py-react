import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import service from '@/service';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const onFinish = async values => {
    console.log('Success:', values);
    const params = {
      ...values
    }
    const res = await service.login.login(params)
    console.log(res)
    if( res.success ){
      message.success('登录成功')
    }

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);


  };
  const getNodeTest = async () => {
    const res = await service.test.getNodeTest({});
  }

  const getSession = async () => {
    const res = await service.test.getSession({});
  }
  const clearSession = async () => {
    const res = await service.test.clearSession({});
  }

  const postNodeTest = async () => {
    const res = await service.test.postNodeTest({name: ''})
  }

  return (
    <div style = {{ width: 800,margin: '200px auto' }} > 
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true, username: 'admin', password: '123456' }}
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
    <Button onClick = {getNodeTest} >getNodeTest</Button>
    <Button onClick = {postNodeTest} >postNodeTest</Button>
    <Button onClick = {getSession} >getSession</Button>
    <Button onClick = {clearSession} >clearSession</Button>
  </div>
    </div>
  );
};

export default Login