import React, { useState, useEffect } from 'react';
import { Link } from 'umi';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import { routes, menuConfig } from '@/menuConfig';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

console.log(routes, menuConfig);

export default props => {

  const pathname = props.location.pathname;
  const [ _, defaultTopMenuSelected ] = pathname.split('/')


  const [topMenuSelected, setTopMenuSelected] = useState(defaultTopMenuSelected);

  const sideMenuRender = () => {
    const sideMenuObj = menuConfig.find(menu => menu.name === topMenuSelected);
    if (!sideMenuObj?.routes) return;
    return sideMenuObj.routes.map(item => (
      <Menu.Item key={item.path}>
        <Link to={item.path}>{item.name}</Link>
      </Menu.Item>
    ));
  };


  useEffect(() => {
    console.log('s', props.location.pathname);
  }, []);

  return (
    <Layout>
      <Header className="header">
        <div
          style={{
            width: '120px',
            height: '31px',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '16px 28px 16px 0',
            float: 'left',
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[topMenuSelected]}
          // defaultSelectedKeys = {menuConfig.find(menu => menu.name === '')}
          onSelect={({ key }) => {
            setTopMenuSelected(key);
          }}
        >
          {menuConfig.map(item => (
            <Menu.Item key={item.name}>{item.name}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            // defaultOpenKeys={['sub1']}
            theme="dark"
            style={{ height: '100%', borderRight: 0 }}
          >
            {sideMenuRender()}
            {/* <Menu.Item key="13">option13</Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<TeamOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout
          style={{ padding: '0 24px 24px', height: 'calc(100vh - 64px)' }}
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
