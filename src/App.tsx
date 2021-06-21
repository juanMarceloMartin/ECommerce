import './App.css';
import { Layout } from 'antd';
import Navbar from './components/navbar/navbar';
import CardsContainer from './components/cards-container/cards-container';
import React from 'react';

function App() {
  
  const { Footer, Sider } = Layout;

  return (
  <>
    <Layout>
      <Navbar />
      <Layout className="layout-body">
        <Sider>Sider</Sider>
        <CardsContainer />
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </>
  );
}

export default App;
