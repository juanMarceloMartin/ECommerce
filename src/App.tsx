import './App.css';
import { Layout } from 'antd';
import Navbar from './components/navbar/navbar';
import CardsContainer from './components/cards-container/cards-container';
import React, {useEffect} from 'react';
import faker from 'faker';

function App() {
  
  const { Footer, Sider } = Layout;

  useEffect(() => {
    console.log(faker.commerce.product())
  }, [])

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
