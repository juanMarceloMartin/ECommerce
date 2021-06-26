import './App.css';
import Navbar from './components/navbar/navbar';
import CardsContainer from './components/cards-container/cards-container';
import { PageLoader } from './components/page-loader/page-loader';
import Footer from './components/footer/footer';

function App() {

  return (
    <>
      <Navbar />

      <PageLoader />
      <div style={{ paddingTop: "80px", background: "white", minHeight: "100vh"}}>
        <CardsContainer />
      </div>
      <Footer />

    </>
  );
}

export default App;
