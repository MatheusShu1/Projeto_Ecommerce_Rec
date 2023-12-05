const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/errors');

app.use(express.json());
;
//importação de rotas
const produtos = require('./rotas/produto');

app.use('/api/v1', produtos);

//middleware para tratamento de erros
app.use(errorMiddleware)

module.exports = app