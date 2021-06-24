import './App.css';
import { Layout } from 'antd';
import Navbar from './components/navbar/navbar';
import CardsContainer from './components/cards-container/cards-container';
import { PageLoader } from './components/page-loader/page-loader';

function App() {

  const { Footer } = Layout;

  return (
    <>
      <Layout>
        <PageLoader />
        <Navbar />
        <Layout className="layout-body">
          <CardsContainer />
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default App;
