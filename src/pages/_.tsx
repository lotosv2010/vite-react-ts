import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { HomeOutlined, DashboardOutlined, UserOutlined, TranslationOutlined } from '@ant-design/icons';
import { Translation } from 'react-i18next';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function BasicLayout() {
  return (
    <Translation>
      {(t, { i18n }) => (
        <Layout style={{ height: '100vh' }}>
          <Header style={{ color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
            <div className="left">
              <span style={{ fontSize: 24 }}>LOGO</span>
            </div>
            <div
              className="right"
              style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}
            >
              <Dropdown
                overlay={
                  <Menu onClick={({ key }) => i18n.changeLanguage(key)}>
                    <Menu.Item key="zh">{t('切换到中文')}</Menu.Item>
                    <Menu.Item key="en">{t('切换到英文')}</Menu.Item>
                    <Menu.Item key="ja">{t('切换到日文')}</Menu.Item>
                  </Menu>
                }
              >
                <TranslationOutlined style={{ width: 100, fontSize: 20 }} />
              </Dropdown>
              <Avatar style={{ backgroundColor: '#f56a00' }}>Tom</Avatar>
            </div>
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
      )}
    </Translation>
  );
}

export default BasicLayout;
