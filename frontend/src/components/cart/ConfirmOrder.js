import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'
import MetaData from '../layouts/MetaData'
import { countries } from 'countries-list'

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  //calcular order prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shippingPrice = itemsPrice > 200 ? 0 : 25
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    window.location.href = '/payment'
  }
  return (
    <Fragment>
      <MetaData title={'Confirme A Compra'} />
      <div className="container container-fluid">

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 order-confirm">

            <h4 className="mb-3">Informações de Envio</h4>
            <p><b>Name:</b> {user && user.name}</p>
            <p><b>Phone:</b> {shippingInfo.phoneNumber}</p>
            <p className="mb-4"><b>Address:</b>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>

            <hr />
            <h4 className="mt-4">Your Cart Items:</h4>
            {cartItems.map(item => (
              <Fragment key={item?.product}>
                <hr />
                <div className="cart-item my-1" key={item?.product}>
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img src={item?.image} alt="Laptop" height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-6">
                      <a href={`/product/${item?.product}`}>{item?.name}</a>
                    </div>


                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>{item.quantity} x R${item?.price} = <b>R${item?.quantity * item?.price}</b></p>
                    </div>

                  </div>
                </div>
                <hr />

              </Fragment>
            ))}

          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>Subtotal:  <span className="order-summary-values">R${itemsPrice}</span></p>
              <p>Shipping: <span className="order-summary-values">R${shippingPrice}</span></p>
              <p>Tax:  <span className="order-summary-values">R${taxPrice}</span></p>

              <hr />

              <p>Total: <span className="order-summary-values">R${totalPrice}</span></p>

              <hr />
              <button id="checkout_btn" className="btn btn-primary btn-block" onClick={processToPayment}>Prossiga para o Pagamento</button>
            </div>
          </div>


        </div>
      </div>

    </Fragment>
  )
}

export default ConfirmOrder
