import React, { useState } from 'react';
import { Button, Form, message, Slider, Switch } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import './index.less';

// 数字
const digitsList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// 大小写字母
const lettersList = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
// 特殊符号
const symbolsList = ['~', '!', '@', '#', '$', '%', '^', '&'];
const similarCharactersList = [];

const sliderMin = 4;
const sliderMax = 40;
const optionsList = [
  {
    label: 'Digits',
    value: 'digits',
  },
  {
    label: 'Letters',
    value: 'letters',
  },
  {
    label: 'Symbols',
    value: 'symbols',
  },
  // {
  //   label: 'Similar characters',
  //   value: 'similarCharacters',
  // },
];

interface RandomItem {
  color: string;
  list: (string | number)[];
}

const TextScrollExample = () => {
  const [form] = Form.useForm();

  const [password, setPassword] = useState('');
  const [passwordDom, setPasswordDom] = useState('');

  // 生成随机密码
  const genPassword = (options: {
    digits?: boolean;
    passwordLength?: number;
    symbols?: boolean;
    letters?: boolean;
  }): {
    newPassword: string;
    newPasswordDom: string;
  } => {
    let newPassword = '';
    let newPasswordDom = '<div>';
    const { digits, passwordLength = 0, symbols, letters } = options;
    const randomList: RandomItem[] = [];

    if (digits) randomList.push({ color: 'blue', list: digitsList });
    if (letters) randomList.push({ color: 'black', list: lettersList });
    if (symbols) randomList.push({ color: 'red', list: symbolsList });

    if (randomList.length === 0)
      return {
        newPassword: '',
        newPasswordDom: '<div></div>',
      };

    // 从数组中随机获取一项
    const getRandomItemFromList = <T extends unknown>(list: T[]): T => {
      const length = list.length;
      const index = Math.floor(Math.random() * length);
      return list[index];
    };

    for (let i = 0; i < passwordLength; i++) {
      const obj = getRandomItemFromList(randomList);
      const { list, color } = obj;
      const value = getRandomItemFromList(list);
      newPassword += value;
      newPasswordDom += `<span style="color:${color}">${value}</span>`;
    }
    newPasswordDom += '</div>';
    return {
      newPassword,
      newPasswordDom,
    };
  };

  // refresh
  const refresh = async () => {
    const values = await form.validateFields();
    const { newPassword, newPasswordDom } = genPassword(values);
    setPassword(newPassword);
    setPasswordDom(newPasswordDom);
  };

  // use password
  const usePassword = () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', password);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      message.success('复制成功');
    }
    document.body.removeChild(input);
  };

  return (
    <div className="password">
      <div className="password-area">
        <div className="password-text">
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: passwordDom }}
          />
          <RedoOutlined onClick={refresh} className="refresh-icon" />
        </div>
        <div className="password-use">
          <Button className="use-btn" type="primary" onClick={usePassword}>
            Use this password
          </Button>
        </div>
      </div>

      <Form
        form={form}
        className="form-area"
        initialValues={{
          passwordLength: 25,
          digits: true,
        }}
      >
        <Form.Item shouldUpdate noStyle>
          {form => {
            return (
              <div className="label-text">
                LENGTH: {form.getFieldValue('passwordLength')}
              </div>
            );
          }}
        </Form.Item>
        <div className="slider-area">
          <div className="slider-min">{sliderMin}</div>
          <Form.Item noStyle name="passwordLength">
            <Slider className="slider" min={sliderMin} max={sliderMax} />
          </Form.Item>
          <div className="slider-max">{sliderMax}</div>
        </div>

        <div className="label-text">OPTIONS</div>
        {optionsList.map(item => (
          <div className="option-item" key={item.value}>
            <div className="option-text">{item.label}</div>
            <Form.Item noStyle name={item.value} valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>
        ))}
      </Form>
    </div>
  );
};

export default TextScrollExample;
