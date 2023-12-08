import React from 'react'

const product = ({ product, col }) => {

    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className='card p-3 rounded'>
                {product.images[0] && (
                    <img
                        className='card-img-top mx-auto'
                        src={product?.images[0].urL}
                        alt={product.name}
                    />
                )}
                <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>
                        <a href={`/product/${product._id}`}>{product.name}</a>
                    </h5>

                    <div className='ratings mt-auto'>
                        <div className='rating-outer'>
                            <div className='rating-inner' style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id='no_of_reviews'>({product.numOfReviews})</span>
                    </div>
                    <p className='card-text'>R${product.price}</p>
                    <a href={`/product/${product._id}`} id='view_btn' className='btn btn-block'>
                        Ver Detalhes
                    </a>
                </div>
            </div>
        </div>
    )
}

export default product
