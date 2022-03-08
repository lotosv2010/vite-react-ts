import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function BasicLayout() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <div className="logo">logo</div>
      </Header>
      <Layout>
        <Sider width={200} className="layout-sider">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['/']}
            style={{ height: '100%', borderRight: 0 }}
            defaultOpenKeys={['/']}
          >
            <Menu.Item key="/" icon={<DashboardOutlined />} title="Dashboard">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="home" icon={<HomeOutlined />} title="首页">
              <Menu.Item key="/home">
                <Link to="/home">home</Link>
              </Menu.Item>
              <Menu.Item key="/home/child">
                <Link to="/home/child">child</Link>
              </Menu.Item>
              <Menu.Item key="/home/child/hello-world">
                <Link to="/home/child/hello-world">hello</Link>
              </Menu.Item>
              <Menu.Item key="/home/child/1234">
                <Link to="/home/child/1234">name</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="about" icon={<UserOutlined />} title="关于">
              <Menu.Item key="/about">
                <Link to="/about">about</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="layout-content">
          <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
