import React, { Fragment, useState, useEffect } from 'react';
import MetaData from './layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/product';
import Loader from './layouts/loader';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 10000]);
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
        dispatch(getProducts(keyword, currentPage, price, category));

    }, [keyword, dispatch, currentPage, price, category]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProdcutsCount;
    }
    console.log('key:', keyword);
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
                                            <Range
                                                marks={{
                                                    1: `R$1`,
                                                    10000: `R$10000`
                                                }}
                                                min={1}
                                                max={10000}
                                                defaultValue={[1, 10000]}
                                                tipFormatter={value => `R$${value}`}
                                                tipProps={{
                                                    placement: 'top',
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />:
                                            <hr className='my-5' />
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
                                                <Product key={product._id} product={product} col={3} />
                                            ))}
                                        </div>

                                    </div>
                                </Fragment>
                            ) : (
                                products && products.map(product => (
                                    <Product key={product._id} product={product} />
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
