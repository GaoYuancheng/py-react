import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { TableProps } from 'antd/lib/table';

import ListModal from './ListModal';

type EditTableProps<T> = TableProps<T> & {
  onChange?: (value: any) => void;
  value?: T[];
  /**
   * 代替table 的onChange
   */
  tableOnChange?: (...args: any) => void;
  rowKey: string;
  request: () => Promise<{
    success: boolean;
    data: { list: T[]; total: number };
  }>;
};

function EditTable<T extends {}>(props: EditTableProps<T>) {
  const [visible, setVisible] = useState(false);

  const { value, id, onChange, request, ...tableProps } = props;
  const { columns = [], rowKey = 'id' } = tableProps;

  const newColumns = columns?.concat([
    {
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record: any) => {
        return (
          <a
            onClick={e => {
              e.preventDefault();
              onChange &&
                onChange(
                  value?.filter((item: any) => item[rowKey] !== record[rowKey]),
                );
            }}
          >
            删除
          </a>
        );
      },
    },
  ]);

  return (
    <div>
      <Table<T>
        {...tableProps}
        columns={newColumns}
        dataSource={value}
        pagination={false}
        // onChange={tableOnChange}
      ></Table>
      <Button
        style={{ width: '100%', marginTop: 8 }}
        onClick={() => {
          setVisible(true);
        }}
      >
        添加
      </Button>
      <ListModal<T>
        visible={visible}
        onChange={onChange}
        value={value}
        closeModal={() => setVisible(false)}
        request={request}
        {...tableProps}
      ></ListModal>
    </div>
  );
}

export default EditTable;
