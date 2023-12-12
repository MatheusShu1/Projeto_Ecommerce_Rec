import React, { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/ordersActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListOrders = () => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Nº Pedido',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Data',
                    field: 'createdAt',
                    sort: 'asc'
                },
                {
                    label: 'Numero de itens',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Total',
                    field: 'totalPrice',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'orderStatus',
                    sort: 'asc'
                },
                {
                    label: 'Detalhes',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        };

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length, // Número de itens na ordem
                totalPrice: `$${order.totalPrice}`, // Total da ordem
                createdAt: String(order.createdAt).substring(0, 10),
                orderStatus: order.orderStatus

            })
        });
        return data;
    };

    return (
        <Fragment>
            <MetaData title={'Meus Pedidos'} />
            <h1 className="my-5">Meus Pedidos</h1>

            <table className="table table-bordered table-responsive-sm">
                <thead className="bg-primary">
                    <tr>
                        <th>Nº Pedido</th>
                        <th>Data</th>
                        <th>Numero de itens</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders && orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{String(order.createdAt).substring(0, 10)}</td>
                            <td>{order.orderItems.length}</td> {/* Número de itens na ordem */}
                            <td>{`R$ ${order.totalPrice}`}</td> {/* Total da ordem */}
                            <td className="text-center">
                                {order.orderStatus && String(order.orderStatus).includes('Delivered') ? (
                                    <p className="text-success">{order.orderStatus}</p>
                                ) : (
                                    <p className="text-danger">{order.orderStatus}</p>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListOrders;
