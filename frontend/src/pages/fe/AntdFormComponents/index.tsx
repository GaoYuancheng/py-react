import React, { useEffect } from 'react';

import { Form, Input, Button, Spin } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { useRequest } from 'ahooks';

import EditTable from './EditTable';
import MyTransfer from './Transfer';
import service from '@/service';

interface TableRecord {
  label: string;
  value: string;
  id: string | number;
}

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
  };

  const formItemStyle = {
    width: 700,
  };

  const { data, loading } = useRequest(service.mock.getInitialValues, {
    refreshDeps: [],
  });

  const columns: ColumnProps<TableRecord>[] = [
    {
      dataIndex: 'id',
      title: 'id',
      key: 'id',
    },
    {
      dataIndex: 'label',
      title: 'label',
      key: 'label',
    },
    {
      dataIndex: 'value',
      title: 'value',
      key: 'value',
    },
  ];

  if (loading) {
    return <Spin spinning={loading} />;
  }

  return (
    <Form
      initialValues={data?.data}
      form={form}
      layout="vertical"
      autoComplete="false"
    >
      <Form.Item style={formItemStyle} name="input" label="input">
        <Input />
      </Form.Item>
      <Form.Item style={formItemStyle} name="editTable" label="EditTable">
        <EditTable<TableRecord>
          columns={columns}
          rowKey="id"
          request={service.mock.getAllTableData}
        />
      </Form.Item>
      <Form.Item style={formItemStyle} name="transfer" label="Transfer">
        <MyTransfer />
      </Form.Item>
      <Form.Item style={formItemStyle}>
        <Button onClick={onFinish} type="primary">
          确认
        </Button>
      </Form.Item>
      <div
        dangerouslySetInnerHTML={{
          __html: `this is a hyperlink <a href="http://www.baidu.com">baidu</a> have a look!
`,
        }}
      ></div>
    </Form>
  );
};
