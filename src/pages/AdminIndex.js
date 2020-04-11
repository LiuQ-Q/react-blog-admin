import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../static/style/adminIndex.css';

import AddArticle from './AddArticle';
import ArticleList from './ArticleList';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleClickArticle = e => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add');
    } else if (e.key === 'articleList') {
      props.history.push('/index/list');
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2">
            <DesktopOutlined />
            <span>添加文章</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <UserOutlined />
                <span>文章管理</span>
              </span>
            }
            onClick={handleClickArticle}
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <FileOutlined />
            <span>管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>博客管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route exact path="/index/" component={AddArticle} />
              <Route exact path="/index/add/" component={AddArticle} />
              <Route exact path="/index/add/:id" component={AddArticle} />
              <Route exact path="/index/list/" component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>LQQQQQ</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex;