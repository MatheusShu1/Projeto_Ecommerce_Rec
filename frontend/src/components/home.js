import React, { Fragment, useState, useEffect } from 'react';
import MetaData from './layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/product';
import Loader from './layouts/loader';
import Pagination from 'react-js-pagination';

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();

    const { loading, products, productsCount, resPerPage } = useSelector(state => state.products);

    const keyword = match.params.keyword

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage));
    }, [keyword, dispatch, currentPage]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Compre os melhores produtos eletrônicos'} />

                    <h1 id='products_heading'>Ultimos Produtos</h1>

                    <section id='products' className='container mt-5'>
                        <div className='row'>
                            {products && products.map(product => (
                                <Product product={product} key={product._id} />
                            ))}
                        </div>
                    </section>
                    {resPerPage <= productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Próximo'}
                                prevPageText={'Anterior'}
                                firstPageText={'Primeiro'}
                                lastPageText={'Último'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}


                </Fragment>
            )}

        </Fragment>
    );
}

export default Home;
