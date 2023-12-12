import React, { Fragment } from 'react'
import Loader from '../layouts/loader'
import MetaData from '../layouts/MetaData'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../actions/cartActions';
import { removeItemFromCart } from '../../actions/cartActions';
const Cart = ({ history }) => {


    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
        toast.success('Item removido do carrinho')
    }
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    console.log(cartItems)
    console.log(localStorage.getItem('cartItems'));

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) return;
        dispatch(addItemToCart(id, newQty))
    }
    const decreaseQty = (id, quantity, stock) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        dispatch(addItemToCart(id, newQty))
    }

    const checkoutHandler = () => {
        window.location.href = '/login?redirect=shipping'
    }

    return (
        <Fragment>
            <MetaData title={'Seu carrinho'} />
            {cartItems.length === 0 ? <h2 className="mt-5">Seu carrinho está vazio</h2> : (
                <Fragment>
                    <div className="container container-fluid">
                        <h2 className="mt-5">Seu carrinho: <b>{cartItems.length} items</b></h2>
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">
                                <hr />
                                {cartItems.map(item => (
                                    <Fragment>
                                        <hr />
                                        <div className="cart-item" key={item.product}>
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt="Laptop" height="90" width="115" />
                                                </div>

                                                <div className="col-5 col-lg-3">
                                                    <p href={`/products/${item.product}`}>{item.name}</p>
                                                </div>

                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p id="card_item_price">R${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>

                                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                        <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                                    </div>
                                                </div>

                                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </Fragment>
                                ))}

                                <div className="col-12 col-lg-5 my-4">
                                    <div id="order_summary">
                                        <h4>Sumario</h4>
                                        <hr />
                                        <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}</span></p>
                                        <p>Est. total: <span className="order-summary-values">R${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>

                                        <hr />
                                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart
