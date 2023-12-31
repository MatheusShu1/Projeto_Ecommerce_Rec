const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/errors');

app.use(express.json());
app.use(cookieParser());

// Importação de rotas
const product = require('./rotas/product');
const auth = require('./rotas/auth');
const order = require('./rotas/order');



app.use('/api/v1', product);
app.use('/api/v1', auth);
app.use('/api/v1', order);


// Middleware para tratamento de erros
app.use(errorMiddleware);

module.exports = app;
