import React, { Fragment, useEffect } from 'react';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/loader';
import Sidebar from './sidebar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productActions';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getAdminProducts());
        if (error) {
            toast.error(error);
        }
        if (deleteError) {
            toast.error(deleteError);
        }
        if (isDeleted) {
            toast.success('Produto deletado com sucesso');
            window.location('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }
        , [dispatch, error, deleteError, isDeleted, history]);

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID do Produto',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Nome do Produto',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Preço',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Ações',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `R$${product.price}`,
                stock: product.stock,
                actions: <Fragment>
                    <a href={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </a>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>

            })
        })

        return data;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
        window.location.reload()
    }


    return (
        <Fragment>
            <div className="row">
                <MetaData title={'Todos os Produtos'} />
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10"> {/* Utilizando col-md-10 para o conteúdo */}
                    <Fragment>
                        <h1 className="my-5">Todos os Produtos</h1>
                        {loading ? (
                            <Loader />
                        ) : (
                            <table className="table table-bordered table-responsive-sm">
                                <thead className="bg-primary">
                                    <tr>
                                        {setProducts().columns.map(column => (
                                            <th key={column.field}>{column.label}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {setProducts().rows.map(row => (
                                        <tr key={row.id}>
                                            {Object.values(row).map((value, index) => (
                                                <td key={index}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}
export default ProductList;
