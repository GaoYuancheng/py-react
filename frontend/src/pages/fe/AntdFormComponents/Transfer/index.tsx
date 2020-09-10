import React, { useState, useEffect } from 'react';
import styles from './index.less';

import { mockSourceList } from './mockData';
import { Input, Checkbox } from 'antd';
import { QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';

interface TransferProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const Transfer: React.FC<TransferProps> = ({ value, onChange }) => {
  const [sourceList, setSourceList] = useState(mockSourceList || []);
  const [filteredSourceList, setFilteredSourceList] = useState(
    mockSourceList || [],
  );
  const [targetList, setTargetList] = useState<any>([]);
  // const [selectedKeys, setSelectedKeys] = useState([])

  const filterData = (value: string) => {
    console.log('filterData', value);
    if (!value) {
      return setFilteredSourceList(sourceList);
    }
    setFilteredSourceList(
      sourceList.filter(
        (item: any) =>
          item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      ),
    );
  };

  const cancelChecked = (id: string) => {
    setTargetList(targetList.filter((item: any) => item.id !== id));
  };
  const onChecked = (e: any) => {
    const { checked, id } = e.target;
    console.log(checked, id);

    if (checked) {
      // 选中
      const targetObj = filteredSourceList.find(item => item.id === id);
      targetObj && setTargetList(targetList.concat([targetObj]));
    } else {
      // 取消选中
      cancelChecked(id);
    }
  };

  // 是否选中
  const isInTargetList = (id: string) => {
    return !!targetList.find((item: any) => item.id === id);
  };

  useEffect(() => {
    onChange && onChange(targetList.map((item: any) => item.id));
  }, [JSON.stringify(targetList)]);

  const contentLeft = (
    <>
      <div className={styles.leftInput}>
        <Input.Search placeholder="请搜索代码变更" onSearch={filterData} />
      </div>
      <div>
        {filteredSourceList.map(item => (
          <label htmlFor={item.id}>
            <div className={styles.leftItem} key={item.id}>
              <div className={styles.checkbox}>
                <Checkbox
                  checked={isInTargetList(item.id)}
                  id={item.id}
                  onChange={onChecked}
                />
              </div>
              <div className={styles.leftName}>{item.name}</div>
              <div className={styles.creator}>{item.creator}</div>
            </div>
          </label>
        ))}
      </div>
    </>
  );

  const contentRight = (
    <>
      <div className={styles.rightTitle}>
        <div className={styles.title}>
          已选择本地的发布变更 <QuestionCircleOutlined />{' '}
        </div>
        <div className={styles.detail}>已有两处冲突</div>
      </div>
      <div>
        {targetList.map((item: any) => (
          <div className={styles.rightItem} key={item.id}>
            <div className={styles.rightName}>{item.name}</div>
            <div
              onClick={() => cancelChecked(item.id)}
              className={styles.closeIcon}
            >
              <CloseOutlined />
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className={styles.transfer}>
      <div className={styles.transferContent}>
        <div className={styles.contentLeft}>{contentLeft}</div>
        <div className={styles.contentRight}>{contentRight}</div>
      </div>
    </div>
  );
};

export default Transfer;
