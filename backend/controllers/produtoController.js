const Product = require('../models/produto');

const ErrorHandler = require('../utils/errorHandler');

const APIFeatures = require('../utils/apiFeatures');

//criar um novo produto => /api/v1/produto/novo
module.exports.novoProduto = async (req, res, next) => {
    const produto = await Product.create(req.body);

    res.status(201).json({
        sucess: true,
        produto
    });
};

//busca todos os produtos => /api/v1/produtos
exports.getProdutos = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        sucess: true,
        count: products.length,
        products
    });
}

//busca um produto pelo id => /api/v1/produto/:id
exports.getProdutoId = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Produto não encontrado!', 404));
    }

    res.status(200).json({
        sucess: true,
        product
    });
}

//atualiza um produto pelo id => /api/v1/produto/:id
exports.updateProduto = async (req, res, next) => {

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
}

exports.deleteProduto = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Produto não encontrado!', 404));
    }

    await product.remove();

    res.status(200).json({
        sucess: true,
        message: 'Produto deletado com sucesso!'
    });
}