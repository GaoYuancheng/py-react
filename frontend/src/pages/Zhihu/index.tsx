import React, { useState, useEffect } from 'react';
import { Button, List } from 'antd';
import service from '@/service';

export default () => {
  const [zhiHuData, setZhiHuData] = useState<
    { id: number; title: string; href: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    let params = {};
    setLoading(true);
    const res = await service.zhihu.getData(params).catch(err => err);
    setLoading(false);
    setZhiHuData(res?.data || []);
  };

  // useEffect(() => {
  //   getData()
  // },[]) 

  return (
    <>
      <div style={{ textAlign: 'center', margin: '100px auto' }}>
        <Button onClick={getData} type="primary" loading={loading}>
          refresh
        </Button>
      </div>
      <h2>知乎热榜</h2>
      {zhiHuData.length > 0 && (
        <List
          itemLayout="horizontal"
          dataSource={zhiHuData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                style={{ padding: '4px 20px' }}
                title={
                  <>
                    <span style={{ fontSize: 18, marginRight: 10 }}>
                      {item?.id}
                    </span>
                    <a href={item?.href}> {item?.title}</a>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
};
