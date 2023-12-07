import React from 'react'
import { Link } from 'react-router-dom'

const product = ({ product }) => {
    return (
        <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
            <div className='card p-3 rounded'>
                {product.images[0] && (
                    <img
                        className='card-img-top mx-auto'
                        src={product.images[0].urL}
                        alt={product.name}
                    />
                )}
                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>
                        <Link to={`/api/v1/produto/${product._id}`}>{product.name}</Link>
                    </h5>

                    <div className='ratings mt-auto'>
                        <div className='rating-outer'>
                            <div className='rating-inner' style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id='no_of_reviews'>({product.numOfReviews})</span>
                    </div>
                    <p className='card-text'>R${product.price}</p>
                    <Link to={`/api/v1/produto/${product._id}`} id='view_btn' className='btn btn-block'>
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default product
