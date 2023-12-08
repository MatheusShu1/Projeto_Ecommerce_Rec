import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';

const homeElement = lazy(() => import('./components/home'));
const ProductDetailsElement = lazy(() => import('./components/product/productDetails'));
const LoginElement = lazy(() => import('./components/user/Login'));
const registerElement = lazy(() => import('./components/user/Register'));

const routes = [
  {
    element: homeElement,
    path: '/'
  },
  {
    element: LoginElement,
    path: '/login'
  },
  {
    element: ProductDetailsElement,
    path: '/product/:id'
  },
  {
    element: registerElement,
    path: '/register'
  },
  {
    element: homeElement,
    path: '/search/:keyword'
  }
]

function App() {
  return (
    <Router>
          <Routes>
        {
          routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))
        }
      </Routes>
    </Router>
  );
}
export default App;