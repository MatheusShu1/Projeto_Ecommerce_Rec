const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/default_avatar',
            url: 'https://imgs.search.brave.com/qdCjYlJ38wgED0igJWjfmAQUtGyUtw6B65fwnpeX7QQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzA5LzAwLzY0/LzM2MF9GXzEwOTAw/NjQyNl8zODhQYWdx/aWVsZ2pGVEFNZ1c1/OWpSYURtUEp2U0JV/TC5qcGc'
        }
    });

    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        token
    });
}); // Login user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    //check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Por favor, informe seu email e senha', 400));
    }

    //finding user in database
    const user = await User.findOne({
        email
    }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Email ou senha inválidos', 401));
    }

    //check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Email ou senha inválidos', 401));
    }

    sendToken(user, 200, res);

});

//forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('Usuário não encontrado com esse email', 404));
    }

    //get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Seu token de recuperação é o seguinte:\n\n${resetUrl}\n\nSe você não solicitou essa recuperação, ignore esse email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password Recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email enviado para: ${user.email}`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});

//reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new ErrorHandler('Token inválido ou expirado', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Senha não confere', 400));
    }

    //setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

//update /change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler('Senha antiga incorreta', 400));
    }
    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res);
});

//update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    //update avatar: todo

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
});

//logout user => /api/v1/logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Deslogado com sucesso'
    });
});

//admin routes


//get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});

//get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`Usuário não encontrado com o id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    });
});

//update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
});

//delete user  => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`Usuário não encontrado com o id: ${req.params.id}`));
    }

    //remove avatar from cloudinary todo

    await user.remove();

    res.status(200).json({
        success: true,
    });
});
