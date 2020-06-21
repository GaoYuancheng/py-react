import React, { useState } from 'react';
import { Row, Col, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import service from '@/service';

const UploadFile = () => {
  const [fileList, setFileList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async () => {
    const formData = new FormData();
    // formData.append('file', fileList[0]);
    fileList.forEach((file:any) => {
      formData.append('file', file);
    });
    formData.append('instanceId', '1111');
    // formData.append('fil', fileList[0]);
    console.log(fileList, formData);

    setLoading(true);

    const res = await service.upload.upload(formData).catch((e: any) => e);
    console.log(res);

    setLoading(false);
  };

  const onRemove = (file: any) => {
    console.log(file);
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    setFileList([]);
  };

  const beforeUpload = (file: any) => {
    const newFileList = [...fileList, file];
    // const newFileList = [file];
    setFileList(newFileList);
    return false;
  };

  return (
    <div style={{ margin: '80px auto', width: '600px' }}>
      <div>
        <Upload
          fileList={fileList}
          onRemove={onRemove}
          beforeUpload={beforeUpload}
        >
          <Button type="default">
            <UploadOutlined /> 上传文件
          </Button>
        </Upload>
      </div>
      <Button
        type="primary"
        style={{ margin: 8 }}
        onClick={submit}
        loading={loading}
        disabled={fileList.length === 0}
      >
        确认
      </Button>
    </div>
  );
};

export default UploadFile;
