const Order = require('../models/order');
const Produto = require('../models/produto');
const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new order   =>   /api/v1/order/new

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    console.log("Req Body:", req.body);

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    });

    res.status(200).json({
        success: true,
        order
    })
});