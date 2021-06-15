import './App.css';
import { Layout } from 'antd';
import Navbar from './components/navbar/navbar';
import React, {useEffect} from 'react';
import faker from 'faker';

function App() {
  
  const { Footer, Sider, Content } = Layout;

  useEffect(() => {
    console.log(faker.commerce.product())
  }, [])

  return (
<>
    <Layout>
      <Navbar />
      <Layout className="layout-body">
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </>
  );
}

export default App;
