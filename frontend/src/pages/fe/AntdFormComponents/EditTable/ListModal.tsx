import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { useRequest } from 'umi';

type ListModalProps<T> = {
  visible: boolean;
  onChange?: (value: any) => void;
  value?: T[];
  closeModal: () => void;
  request: () => Promise<{
    success: boolean;
    data: { list: T[]; total: number };
  }>;
} & TableProps<T>;

function ListModal<T extends {}>({
  visible,
  onChange,
  value,
  closeModal,
  request,
  ...tableProps
}: ListModalProps<T>) {
  const [curPageRow, setCurPageRow] = useState<T[]>([]);

  const { data, tableProps: requestTableProps } = useRequest(request, {
    refreshDeps: [],
    paginated: true,
    onSuccess: data => {
      setCurPageRow(data?.list || []);
    },
  });

  let rowKey = (tableProps.rowKey || 'id') as string;
  let pageKeys: any[] = curPageRow?.map((item: any) => item[rowKey]) || [];

  return (
    <Modal title="添加项列表" visible={visible} onCancel={closeModal}>
      <Table<T>
        {...tableProps}
        {...requestTableProps}
        rowSelection={{
          selectedRowKeys: value?.map((item: any) => item[rowKey]),
          onSelect: (record: any, selected, selectedRows, nativeEvent) => {
            let newValue = selected
              ? value?.concat([record])
              : value?.filter((item: any) => item[rowKey] !== record[rowKey]);
            onChange && onChange(newValue);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            let newValue = selected
              ? Array.from(new Set(value?.concat(curPageRow)))
              : value?.filter(
                  (item: any) => pageKeys?.indexOf(item[rowKey]) < 0,
                );
            onChange && onChange(newValue);
          },
        }}
      />
    </Modal>
  );
}

export default ListModal;
