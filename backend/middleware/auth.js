const User = require('../models/user')

const jwt = require('jsonwebtoken')
const catchAsyncErrors = require('./catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {
        token
    } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Faça login primeiro antes de acessar esse recurso!', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

// Handling user roles

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { //roles = ['admin', 'user']
            return next(new ErrorHandler(`Usuário com a função ${req.user.role} não tem permissão para acessar esse recurso`, 403))
        }
        next()
    }
}