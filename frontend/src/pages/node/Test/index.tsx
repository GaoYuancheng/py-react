import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import service from '@/service';

const h4_style: any = {
  margin: '2em 0 0',
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px',
  top: 0,
  zIndex: 1,
  position: 'sticky',
};

export default () => {
  const getNodeTest = async () => {
    const res = await service.test.getNodeTest({});
  };

  const postNodeTest = async () => {
    const res = await service.test.postNodeTest({ name: '' });
  };

  return (
    <div style={{ height: 2000 }}>
      <h1>时间固定demo</h1>
      <div>
        <section>
          <h4 style={h4_style}>5月20日</h4>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </section>
        <section>
          <h4 style={h4_style}>5月19日</h4>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </section>
        <section>
          <h4 style={h4_style}>5月18日</h4>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
