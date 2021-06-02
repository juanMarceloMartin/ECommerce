import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';

function App() {
  
  const { Header, Footer, Sider, Content } = Layout;

  return (
<>
    <Layout>
      <Header>Header</Header>
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
