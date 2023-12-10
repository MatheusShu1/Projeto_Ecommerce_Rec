import { configureStore } from '@reduxjs/toolkit';
import { productsReducers, productDetailsReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordRecucer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { thunk } from 'redux-thunk'; 
import { myOrdersReducer, orderDetailsReducer } from './reducers/ordersReducers';
const reducer = {
    // Redutores
    products: productsReducers,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordRecucer,
    cart: cartReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
};

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
    },
};

const middleware = [thunk];
const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
