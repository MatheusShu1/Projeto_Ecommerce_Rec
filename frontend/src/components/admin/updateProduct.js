import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsDetails, clearErrors, updateProduct } from '../actions/productActions';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProduct = ({ match, history }) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePublicId, setImagePublicId] = useState('');
    const [oldImages, setOldImages] = useState([]);

    const categories = [
        'Mobile',
        'TV',
        'Laptops',
        'cameras',
        'speaker',
        'tablet',
    ];
    const dispatch = useDispatch();
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);
    const { error, product } = useSelector(state => state.productDetails);

    const productId = match.params.id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductsDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setSeller(product.seller);
            setOldImages(product.images);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            history.push('/admin/products');
            toast.success('Produto atualizado com sucesso');
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, error, history, isUpdated, product, productId, updateError]);


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        formData.set('images.url', imageUrl);
        formData.set('images.public_id', imagePublicId);
        dispatch(updateProduct(product._id, formData));
    }

    const handleImageChange = e => {
        const url = e.target.value; // Obtém a URL da imagem do input
        setImageUrl(url);
    }



    const handlePublicIdChange = e => {
        const publicId = e.target.value; // Obtém o public ID da imagem do input
        setImagePublicId(publicId);
    }


    return (
        <Fragment>
            <MetaData title={'Atualizar Produto'} />
            <div className="row">
                <div className="col-12 col-md-2">
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Atualizar Produto</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nome</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Preço</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Descrição</label>
                                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}

                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stock_field">Estoque</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="seller_field">Vendedor</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={seller}
                                        onChange={(e) => setSeller(e.target.value)}
                                    />
                                </div>
                                <label>Insira a URL da Imagem do Produto</label>
                                <input
                                    type='text'
                                    name='url'
                                    className='form-control'
                                    onChange={handleImageChange}
                                />
                                <label>Insira o ID da Imagem do Produto</label>
                                <input
                                    type='text'
                                    name='public_id'
                                    className='form-control'
                                    onChange={handlePublicIdChange}
                                />
                                <br />
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    ATUALIZAR
                                </button>
                            </form>
                        </div>
                    </Fragment>
                </div>

            </div>
        </Fragment>
    )
}
export default UpdateProduct;