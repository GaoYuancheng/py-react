import React, { useState, useEffect } from 'react';
import { Link, history, useModel } from 'umi';
import { Layout, Menu, Breadcrumb, Row } from 'antd';
// import {
//   DesktopOutlined,
//   PieChartOutlined,
//   FileOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
import 'antd/dist/antd.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './index.less';
import { routes, menuConfig } from '@/menuConfig';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

console.log(routes, menuConfig);

const theme: 'light' | 'dark' = 'dark';

export default (props: any) => {
  const pathname = props.location.pathname;
  const [_, defaultTopMenuSelected] = pathname.split('/');
  const { userInfo } = useModel('userInfo');

  const [topMenuSelected, setTopMenuSelected] = useState(
    defaultTopMenuSelected || menuConfig[0]?.name,
  );

  // 侧边栏
  const sideMenuRender = () => {
    const sideMenuObj = menuConfig.find(menu => menu.name === topMenuSelected);
    if (!sideMenuObj?.routes) return;
    return (
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        // defaultOpenKeys={['sub1']}
        theme={theme}
        style={{ height: '100%', borderRight: 0 }}
      >
        {sideMenuObj.routes.map(item => (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  // 顶部菜单
  const topMenuRender = () => {
    return (
      <Menu
        theme={theme}
        mode="horizontal"
        selectedKeys={[topMenuSelected]}
        // defaultSelectedKeys = {menuConfig.find(menu => menu.name === '')}
        onSelect={({ key }) => {
          setTopMenuSelected(key);
        }}
      >
        {menuConfig.map(item => {
          return <Menu.Item key={item.name}>{item.name}</Menu.Item>;
        })}
      </Menu>
    );
  };

  useEffect(() => {
    console.log(`
    _______                    ______                         _     _               
(_______)                  / _____)                    _  | |   (_)              
    _ _   _ ____  _____   ( (____   ___  ____  _____ _| |_| |__  _ ____   ____   
   | | | | |  _ \| ___ |   \____ \ / _ \|    \| ___ (_   _)  _ \| |  _ \ / _  |  
   | | |_| | |_| | ____|   _____) ) |_| | | | | ____| | |_| | | | | | | ( (_| |  
   |_|\__  |  __/|_____)  (______/ \___/|_|_|_|_____)  \__)_| |_|_|_| |_|\___ |  
     (____/|_|                                                          (_____|    `);
    if (props.location.pathname === '/') {
      history.push('/py/home');
    }
  }, [props.location.pathname]);

  return (
    <Layout>
      <Header className="header">
        <Row justify="space-between">
          <div>
            <div
              style={{
                width: '122px',
                height: '31px',
                background: 'rgba(255, 255, 255, 0.2)',
                margin: '16px 28px 16px 0',
                float: 'left',
              }}
            />
            {topMenuRender()}
          </div>
          <div style={{ color: '#fff' }}>{userInfo.username}</div>
        </Row>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {sideMenuRender()}
        </Sider>
        <Layout
          style={{ padding: '0 24px 24px', minHeight: 'calc(100vh - 64px)' }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
