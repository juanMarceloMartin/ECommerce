import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Landing from './components/landing/landing';
import ProductsScreen from './components/products-screen/products-screen';
import PageLoader from './components/page-loader/page-loader';
import Footer from './components/footer/footer';

function App() {

  return (
    <>
      <Navbar />
      <PageLoader />
      <div style={{ paddingTop: "64px", background: "white", minHeight: "100vh" }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/products" component={ProductsScreen}></Route>
          </Switch>
        </Router>
      </div>
      <Footer />

    </>
  );
}

export default App;
