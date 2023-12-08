import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducers, productDetailsReducer } from './reducers/productReducers';
import { authReducer } from './reducers/userReducers';

const reducer = {
    // Redutores
    products: productsReducers,
    productDetails: productDetailsReducer,
    auth: authReducer,
};

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
