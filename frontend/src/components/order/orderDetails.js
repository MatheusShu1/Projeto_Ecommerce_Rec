import React, {Fragment, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../actions/ordersActions';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/loader';

const OrderDetails = ({ order }) => {
    const dispatch = useDispatch();
    const { loading, error, order } = useSelector(state => state.orderDetails);
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order;

    useEffect(() => {

        dispatch(getOrderDetails(match.params.id));
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error,match.params.id]);
    return (
        <Fragment>
            <MetaData title={'Detalhes do Pedido'} />
            {loading ? <Loader /> : (
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-details">
                        <h1 className="my-5">Pedido # {order._id}</h1>

                        <h4 className="mb-4">Informações de Entrega</h4>
                        <p><b>Nome:</b> {user && user.name}</p>
                        <p><b>Telefone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                        <p className="mb-4"><b>Endereço:</b>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                        <p><b>Valor:</b> R${totalPrice}</p>

                        <hr />

                        <h4 className="my-4">Pagamento</h4>
                        <p className={paymentInfo && paymentInfo.status === 'succeeded' ? "greenColor" : "redColor"}><b>{paymentInfo && paymentInfo.status === 'succeeded' ? "PAGO" : "NÃO PAGO"}</b></p>

                        <h4 className="my-4">Status do Pedido:</h4>
                        <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"}><b>{orderStatus}</b></p>

                        <h4 className="my-4">Itens do Pedido:</h4>

                        <hr />
                        <div className="cart-item my-1">
                            {orderItems && orderItems.map(item => (
                                <div key={item.product} className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <a href={`/product/${item.product}`}>{item.name}</a>
                                    </div>
                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>R${item.price}</p>
                                    </div>
                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{item.quantity} Unidade(s)</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr />
                    </div>
                </div>
            )}
            </Fragment>
    )
}