import axios from 'axios';

import {
MY_ORDER_LIST_FAIL,
MY_ORDER_LIST_REQUEST,
MY_ORDER_LIST_SUCCESS,
CLEAR_ERRORS,
ORDER_DETAILS_SUCCESS,
ORDER_DETAILS_REQUEST,
ORDER_DETAILS_FAIL  
} from '../constants/orderConstants';

export const myOrders = (id) => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_LIST_REQUEST });

        const { data } = await axios.get('/api/v1/orders/me');

        dispatch({
            type: MY_ORDER_LIST_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDER_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}