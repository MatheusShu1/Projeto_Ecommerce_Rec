import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { getProductsDetails, clearErrors, newReview} from '../../actions/productActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemToCart } from '../../actions/cartActions';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import ListReviews from '../review/ListReviews';

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch()
    const { error, product } = useSelector(state => state.productDetails)
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const {user} = useSelector(state => state.auth)
    const {error: reviewError, success} = useSelector(state => state.newReview)

    useEffect(() => {
        dispatch(getProductsDetails(match.params.id))
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        if (reviewError) {
            toast.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            toast.success('Avaliação enviada com sucesso')
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, error, match.params.id, reviewError, success])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity))
        toast.success('Produto adicionado ao carrinho')
    }
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.product?.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        count.value = qty;
    }

    function setUserRatings () {
        const stars = document.querySelectorAll('.star')
        stars.forEach((star, index) => {
            star.starValue = index + 1;
            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })
        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange');
                    }
                }
                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow');
                    }
                }
                if (e.type === 'mouseout') {
                    star.classList.remove('yellow');
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData))
    }

    return (
        <Fragment>
            <MetaData title={product.product?.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    {product && product.product?.images && (
                        <img src={product.product?.images[0]?.url} alt="sdf" height="500" width="600" />
                            )}
                        </div>
                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.product?.name}</h3>
                    <p id="product_id">Product # {product.product?._id}</p>
                            <hr />
                            <div className="rating-outer">
                        <div className='rating-inner' style={{ width: `${(product.product?.ratings / 5) * 100}%` }}></div> </div>
                    <span id="no_of_reviews">({product.product?.numOfViews})</span>
                            <hr />
                    <p id="product_price">R${product.product?.price}</p>
                            <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                        <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock === 0} onClick={addToCart}>Adicione no carrinho</button>
                            <hr />
                    <p>Status: <span id="stock_status" className={product.product?.stock > 0 ? 'greenColor' : 'redColor'}>Em estoque</span></p>
                            <hr />
                            <h4 className="mt-2">Descrição:</h4>
                    <p>{product.product?.description}</p>
                            <hr />
                    <p id="product_seller mb-3">Sold by: <strong>{product.product?.seller}</strong></p>

                            {user ?
                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Envie sua avaliação
                            </button>
                            : <div className="alert alert-danger mt-5" type='alert'>Faça o login para enviar sua avaliação.</div> } 
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Enviar avaliação</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>
                                                    <textarea name="review" id="review" className="form-control mt-3"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    >
                                                    </textarea>
                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close" onClick={reviewHandler}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div >
                {product.product?.reviews && product.product?.reviews.length > 0 && (
                       <ListReviews reviews={product.product?.reviews} />

                    )}
        </Fragment>
    )
}

export default ProductDetails
