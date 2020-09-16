import React, { useState } from 'react';
import { Input, message } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { InputProps } from 'antd/lib/input';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FormOutlined,
} from '@ant-design/icons';
import styles from './index.less';

interface Props extends InputProps {
  initialValue: string;
  onEdit: (value: string) => Promise<any>;
  inputClassName?: string;
}

const InputEdit: React.FC<Props> = ({
  initialValue,
  onEdit,
  inputClassName,
  ...rest
}) => {
  const [editStatus, setEditStatus] = useState(false);
  const [newValue, setNewValue] = useState(initialValue);

  const toggleNameEdit = () => {
    setEditStatus(!editStatus);
  };

  const setName = () => {
    onEdit(newValue)
      .then(() => {
        toggleNameEdit();
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  const onNameChange = (e: Record<string, any>) => {
    setNewValue(e.target.value);
  };

  return (
    <div className={styles.inputEdit}>
      {editStatus ? (
        <span className={inputClassName}>
          <Input
            {...rest}
            defaultValue={initialValue}
            onChange={onNameChange}
            className={styles.input}
          />
          <CheckCircleOutlined onClick={setName} style={{ margin: '0 10px' }} />
          <CloseCircleOutlined
            onClick={() => {
              toggleNameEdit();
            }}
          />
        </span>
      ) : (
        <span>
          {initialValue}
          <FormOutlined
            type="edit"
            onClick={() => {
              toggleNameEdit();
            }}
            style={{ marginLeft: 9, opacity: 0.45 }}
          />
        </span>
      )}
    </div>
  );
};

export default InputEdit;
