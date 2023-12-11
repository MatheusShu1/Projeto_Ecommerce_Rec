const express = require('express');
const router = express.Router();

const { getProdutos, getAdminProdutos, novoProduto, getProdutoId, updateProduto, deleteProduto, createProductReview, getProductReviews, deleteReview } = require('../controllers/produtoController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/products').get(getProdutos);
router.route('/admin/products').get(getAdminProdutos);


router.route('/product/:id').get(getProdutoId);

router.route('/admin/product/novo').post(isAuthenticatedUser, authorizeRoles('admin'), novoProduto);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduto)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduto);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews').get(isAuthenticatedUser, getProductReviews);

router.route('/reviews').delete(isAuthenticatedUser, deleteReview);


module.exports = router;