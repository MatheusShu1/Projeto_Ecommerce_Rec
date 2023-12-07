import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducers, productDetailsReducer } from './reducers/productReducers';

const reducer = {
    // Redutores
    products: productsReducers,
    productDetails: productDetailsReducer,
};

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
