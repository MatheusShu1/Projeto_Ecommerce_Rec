import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';

import Home from "./components/home";
import ProductDetails from './components/product/productDetails';

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';
import Shipping from './components/cart/Shipping';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmOrder from './components/cart/ConfirmOrder';
import ListOrders from './components/order/ListOrders';
import Dashboard from './components/admin/dashboard';
import Payment from './components/cart/Payment';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/newProduct';
import UpdateProduct from './components/admin/updateProduct';

export default function App() {

  useEffect(() => {
    store.dispatch(loadUser())

  }, [])


  return (

    <Router>
      <div className="App">
        <Header />
        <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search/:keyword" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
              <Route exact path="/cart" component={Cart} />
              <ProtectedRoute exact path="/shipping" component={Shipping} />
              <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/payment" component={Payment} />
              <Route exact path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/password/forgot" component={ForgotPassword} />
              <Route exact path="/password/reset/:token" component={NewPassword} />
              <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
              <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
          <ProtectedRoute exact path="/me" component={Profile} />        
          <ProtectedRoute exact path="/orders/me" component={ListOrders} />
          <ProtectedRoute exact path="/dashboard" isAdmin={true} component={Dashboard} />
          <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductList} />
          <ProtectedRoute exact path="/admin/product/novo" isAdmin={true} component={NewProduct} />
          <ProtectedRoute exact path="/admin/product/novo" isAdmin={true} component={NewProduct} />
          <ProtectedRoute exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct} />
        </Switch>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}