const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            sucess: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message;

        //wrong mongoose object id error
        if (err.name === 'CastError') {
            const message = `Recurso não encontrado. ID inválido: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        //handle mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        //handle mongoose duplicate key errors
        if (err.code === 11000) {
            const message = `Valor duplicado: ${Object.keys(err.keyValue)} já existe`;
            error = new ErrorHandler(message, 400);
        }

        //handle wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token inválido. Tente novamente';
            error = new ErrorHandler(message, 400);
        }

        //handle expired JWT error
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token expirado. Tente novamente';
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            sucess: false,
            message: error.message || 'Erro interno do servidor'
        });
    }

    res.status(err.statusCode).json({
        sucess: false,
        error: err.stack
    });
}