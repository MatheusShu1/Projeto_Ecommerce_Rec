import React, { Fragment, useState, useEffect } from 'react';
import MetaData from './layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/product';
import Loader from './layouts/loader';
import Pagination from 'react-js-pagination';

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('');

    const categories = [
        'Mobile',
        'TV',
        'Laptops',
        'cameras',
        'speaker',
        'tablet',
    ];

    const dispatch = useDispatch();

    const { loading, products, productsCount, resPerPage, filteredProdcutsCount } = useSelector(state => state.products);

    const keyword = match.params.keyword

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, category));
    }, [keyword, dispatch, currentPage, category]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProdcutsCount;
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Compre os melhores produtos eletrônicos'} />

                    <h1 id='products_heading'>Ultimos Produtos</h1>

                    <section id='products' className='container mt-5'>
                        <div className='row'>
                            {keyword ? (
                                <Fragment>
                                    <div className='col-6 col-md-3 mt-5 mb-5'>
                                        <div className="px-5">
                                            <h4 className="mb-3">Categorias</h4>
                                            <ul className="pl-0">
                                                {categories.map(category => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={category}
                                                        onClick={() => setCategory(category)}
                                                    >
                                                        {category}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products && products.map(product => (
                                                <Product product={product} key={product._id} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                products && products.map(product => (
                                    <Product product={product} key={product._id} />
                                ))
                            )}


                        </div>
                    </section>
                    {resPerPage <= count && (
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
