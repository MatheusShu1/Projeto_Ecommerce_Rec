const Product = require('../models/product.js');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');



//criar um novo produto => /api/v1/produto/novo
exports.novoProduto = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const produto = await Product.create(req.body);

    res.status(201).json({
        sucess: true,
        produto
    });
});

//busca todos os produtos => /api/v1/produtos
exports.getProdutos = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage);

    products = await apiFeatures.query;

    setTimeout(() => {
        res.status(200).json({
            sucess: true,
            productsCount,
            resPerPage,
            filteredProductsCount,
            products
        });
    }, 2000);

});

//busca todos os produtos (admin) => /api/v1/admin/produtos
exports.getAdminProdutos = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        sucess: true,
        products
    });
});

//busca um produto pelo id => /api/v1/produto/:id
exports.getProdutoId = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Produto não encontrado!', 404));
    }

    res.status(200).json({
        sucess: true,
        product
    });
});

//atualiza um produto pelo id => /api/v1/produto/:id
exports.updateProduto = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Produto não encontrado!', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        sucess: true,
        product
    });
});

exports.deleteProduto = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Produto não encontrado!', 404));
    }

    await product.remove();

    res.status(200).json({
        sucess: true,
        message: 'Produto deletado com sucesso!'
    });
});

//criar uma nova review => /api/v1/review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        sucess: true,
    });
});

//busca as reviews de um produto => /api/v1/reviews

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        sucess: true,
        reviews: product.reviews
    });
});

//deleta uma review => /api/v1/reviews

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        sucess: true,
    });
});
