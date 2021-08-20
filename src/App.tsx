import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Landing from './components/landing/landing';
import ProductsScreen from './components/products-screen/products-screen';
import PageLoader from './components/page-loader/page-loader';
import Footer from './components/footer/footer';
import SingleProductScreen from './components/single-product-screen.tsx/singleProductScreen';
import CheckoutScreen from './components/checkout-screen/checkout-screen';
import OrderHistoryScreen from './components/order-history-screen/order-history-screen';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <PageLoader />
        <div style={{ paddingTop: "55px", background: "white", minHeight: "100vh" }}>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/product" component={SingleProductScreen}></Route>
            <Route exact path="/products" component={ProductsScreen}></Route>
            <Route exact path="/checkout" component={CheckoutScreen}></Route>
            <Route exact path ="/order-history" component={OrderHistoryScreen}></Route>
          </Switch>
        </div>
        <Footer />
      </Router>

    </>
  );
}

export default App;
