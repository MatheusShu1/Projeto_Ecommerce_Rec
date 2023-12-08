import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS


} from '../constants/productConstants';

// export const getProducts = () => async (dispatch) => {

export const getProducts = (keyword = '', currentPage = 1, price, category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });
        console.log('keyword:', keyword);
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
        }
        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCTS_SUCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/product/${id}`);


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.error('Error fetching product details:', error);

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Clear Errors

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}