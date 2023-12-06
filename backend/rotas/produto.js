const express = require('express');
const router = express.Router();

const { getProdutos, novoProduto, getProdutoId, updateProduto, deleteProduto } = require('../controllers/produtoController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/produtos').get(getProdutos);

router.route('/produto/:id').get(getProdutoId);

router.route('/admin/produto/novo').post(isAuthenticatedUser, authorizeRoles('admin'), novoProduto);

router.route('/admin/produto/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduto)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduto);

module.exports = router;