import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import ProductDetails from './components/product/productDetails';



export default function App() {
  return (

    <Router>
      <div className="App">
        <Header />
        <div className="clearfix">

          <div className="contentArea">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search/:keyword" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/product/:id" component={ProductDetails} />
              <Route
                render={() => {
                  return (
                    <h1 className="text-center">
                      404
                      <br />
                      Not Found
                    </h1>
                  );
                }}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}