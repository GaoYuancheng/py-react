import React, { useEffect, useState } from 'react';
import { Button } from 'antd';


import DataChangeChart from '@/components/DataChangeChart'

import service from '@/service' 

export default () => {

  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState<any>([])

  const getData = async () => {
    let params = {
      region: 0,
      category: 0,
      keywords: ['美国','中国','日本','俄罗斯','蒙古','朝鲜','韩国','日本','菲律宾','越南','老挝','柬埔寨','缅甸','泰国','马来西亚','文莱','新加坡','印度尼西亚','不丹','孟加拉国','印度','巴基斯坦','斯里兰卡','马尔代夫','吉尔吉斯斯坦','塔吉克斯坦','乌兹别克斯坦','土库曼斯坦'],
      // keywords: ['乌兹别克斯坦','蒙古','朝鲜','韩国','日本'],
      start: 20180401,
      end: 20200420,
      is_hourly: 0,
    };
    setLoading(true)
    const res = await service.toutiao.getData(params).catch(e=>e)
    if(res?.success){
      const chartData = res?.data.data;
      chartData.columns = ['name', 'type', 'value', 'date']
      setChartData(res?.data.data)
    }
    setLoading(false)
    console.log(res)
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <h2>头条指数</h2>
      <div style={{ textAlign: 'center', margin: '80px auto' }}>
        <Button type="primary" onClick={getData} loading = {loading}>
          refresh
        </Button>
      </div>
      
      <DataChangeChart chartData = {chartData} />
      
     
    </>
  );
};
