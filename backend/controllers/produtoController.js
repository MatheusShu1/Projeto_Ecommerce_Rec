const Product = require('../models/produto.js');
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

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        sucess: true,
        count: products.length,
        productCount,
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