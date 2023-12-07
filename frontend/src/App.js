import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import Home from './components/home';
import ProductDetails from './components/product/productDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
export default App;