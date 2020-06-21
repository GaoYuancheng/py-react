import React, { useState, useEffect } from 'react';

import mockData from './mockData';
import { defineConfig } from './config';
import { draw } from './visual';

import './stylesheet.less';

const config = defineConfig();

interface ChartData {
  [key: number]: { name: string; value: number; date: string; type: string };
  columns: string[];
}

interface DataChangeChartProps {
  chartData: ChartData;
}

const DataChangeChart: React.FC<DataChangeChartProps> = props => {
  const { chartData = [] } = props;

  useEffect(() => {
    if((chartData as any ).length > 0){
      draw(chartData, config);
    }
    
  }, [chartData]);

  return (
    <div className = 'chart' style={{ textAlign: 'center' }}>

      <svg id='chartSvg' width="1900" height="1020"></svg>
    </div>
  );
};

export default DataChangeChart;
