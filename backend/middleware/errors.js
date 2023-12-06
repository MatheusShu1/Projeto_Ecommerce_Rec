const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    let error = { ...err };
    error.message = err.message;

    // Handle CastError
    if (err.name === 'CastError') {
        const message = `Recurso não encontrado. ID inválido: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    // Handle ValidationError
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400);
    }

    // Handle Duplicate Key Errors
    if (err.code === 11000) {
        const message = `Valor duplicado: ${Object.keys(err.keyValue)} já existe`;
        error = new ErrorHandler(message, 400);
    }

    // Handle JWT Errors
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        const message = err.name === 'JsonWebTokenError' ? 'JSON Web Token inválido. Tente novamente' : 'JSON Web Token expirado. Tente novamente';
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
        sucess: false,
        message: error.message || 'Erro interno do servidor'
    });
};
