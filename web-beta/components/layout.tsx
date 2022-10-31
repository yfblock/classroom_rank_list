import { Layout } from 'antd';
import React from 'react';
import Header from './header';

const { Content, Footer } = Layout;

export default function({ children }: { children: React.ReactNode; }){  
  return <Layout>
    <Header />
    <Content style={{ padding: '0 50px' }}>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>;
}