import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import service from '@/service';

export default () => {

  const getNodeTest = async () => {
    const res = await service.test.getNodeTest({});
  }

  const postNodeTest = async () => {
    const res = await service.test.postNodeTest({name: ''})
  }

  return <div>
    <Button onClick = {getNodeTest} >getNodeTest</Button>
    <Button onClick = {postNodeTest} >postNodeTest</Button>
  </div>
}