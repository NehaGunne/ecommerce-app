

import Header from './components/header';
import Home from './components/home';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Checkout from './components/cartScreen';
import Login from './components/login';
import Signup from './components/signup';
import Payment from './components/payment';
import ProductDetails from './components/product-detail';
import SearchedProducts from './components/searched-products';
import Shipping from './components/shipping';
import PlaceOrder from './components/place-order';
import OrderHistory from './components/order-history';
import OrderScreen from './components/order-screen';
import Dashboard from './components/admin-dashboard';
import AllUsers from './components/all-users';
import AllOrders from './components/all-orders';
import AddProduct from './components/add-product';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact >
          <Header/>
          <Home/>
        </Route>
        <Route path='/checkout' >
          <Header/>
          <Checkout/>
        </Route>
        <Route path='/login' >
          <Login/>
        </Route>
        <Route path='/signup' >
          <Signup/>
        </Route>
        <Route path='/payment' >
          <Header/>
          <Payment/>
        </Route>
        <Route path='/details/:_id'>
          <Header/>
          <ProductDetails/>
        </Route> 
        <Route path='/searched-products'>
          <Header/>
          <SearchedProducts/>
        </Route> 
        <Route path='/shipping'>
          <Header/>
          <Shipping/>
        </Route> 
        <Route path='/place-order'>
          <Header/>
          <PlaceOrder/>
        </Route> 
        <Route path='/order-details/:_id'>
          <Header/>
          <OrderScreen/>
        </Route> 
        <Route path='/order-history'>
          <Header/>
          <OrderHistory/>
        </Route> 
        <Route path='/admin-dashboard'>
          <Header/>
          <Dashboard/>
        </Route> 
        <Route path='/all-users'>
          <Header/>
          <AllUsers/>
        </Route> 
        <Route path='/all-orders'>
          <Header/>
          <AllOrders/>
        </Route> 
        <Route path='/add-product'>
          <Header/>
          <AddProduct/>
        </Route> 

      </Switch>
    </Router>
  );
}

export default App;
