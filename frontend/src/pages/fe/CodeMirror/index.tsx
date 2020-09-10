import React, { useState, useEffect } from 'react';
import { Upload, Row, Col, message } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2';
import _ from 'lodash';
// require('codemirror/mode/xml/xml');
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';

import { mockData } from './mockData';

let timer = null;

function isJSON(str) {
  console.log(str);
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
      return false;
    }
  }
  console.log('It is not a string!');
}

export default () => {
  const [fileContent, setFileContent] = useState();
  // console.log(mockData);
  console.log(typeof fileContent, isJSON(fileContent));

  const debounceSetTimer = _.debounce(() => {
    console.log('ss');
  }, 500);

  const setTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // console.log('ss');
      message.success('保存成功');
    }, 500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Row>
        <Col span={12}>
          <Upload
            showUploadList={false}
            beforeUpload={file => {
              // console.log(file);
              if (file.type !== 'application/json') {
                message.error('仅支持json');
                return false;
              }
              let reader = new FileReader();
              reader.readAsText(file);
              reader.addEventListener('load', evt => {
                try {
                  setFileContent(JSON.parse(evt.target?.result));
                  // console.log(JSON.stringify(JSON.parse(evt.target?.result)));
                } catch (err) {
                  console.log(err);
                }
              });

              return false;
            }}
          >
            <a>Click to Upload</a>
          </Upload>
          <CodeMirror
            value={
              typeof fileContent === 'object'
                ? JSON.stringify(fileContent, null, 2)
                : fileContent
            }
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              // console.log(value);
              setFileContent(value);
              JSON.parse(value);
              // debounceSetTimer();
              setTimer();
            }}
          />
        </Col>
        <Col span={12}>
          <div>
            {isJSON(fileContent) ? (
              <pre>{JSON.stringify(fileContent, null, 2)}</pre>
            ) : (
              '必须为json格式'
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
