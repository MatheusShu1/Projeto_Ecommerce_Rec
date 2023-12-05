const express = require('express');
const router = express.Router();

const { getProdutos, novoProduto, getProdutoId, updateProduto, deleteProduto } = require('../controllers/produtoController');


router.route('/produtos').get(getProdutos);

router.route('/produto/:id').get(getProdutoId);

router.route('/admin/produto/:id').put(updateProduto);

router.route('/admin/produto/novo').post(novoProduto);

router.route('/admin/produto/:id').delete(deleteProduto);

module.exports = router;