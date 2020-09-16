import React from 'react';
import InputEdit from './InputEdit';
const InputEditExample = () => {
  return (
    <div>
      <InputEdit
        onEdit={value =>
          new Promise((resolve, reject) => {
            // 可以加一些校验
            if (!value) {
              console.log('value不能为空');
              reject();
            } else {
              resolve();
            }
          })
        }
        style={{
          width: 200,
        }}
        initialValue="初始值"
      />
    </div>
  );
};

export default InputEditExample;
