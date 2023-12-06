const Order = require('../models/order');
const Produto = require('../models/produto');
const ErrorHandler = require('../utils/errorHandler');

const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new order   =>   /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    console.log("Req Body:", req.body);
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

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
        body: order
    })
});

//get single order => /api / v1 / admin / order /: id

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
        return next(new ErrorHandler('Pedido não encontrado com esse id', 404));
    }
    res.status(200).json({
        success: true,
        order
    });
});

//get logged in user orders => /api/v1/orders/me

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    console.log('User ID:', req.user.id); // Verifica se o ID do usuário está sendo recuperado corretamente
    const orders = await Order.find({ user: req.user.id });
    console.log('Orders:', orders); // Verifica se a consulta find está sendo executada corretamente

    res.status(200).json({
        success: true,
        orders
    });
});

//get all user orders => /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    console.log('User ID:', req.user.id); // Verifica se o ID do usuário está sendo recuperado corretamente
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

//update process order => /api/v1/admin/order/:id

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Você já recebeu este pedido', 400));
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now(),

        await order.save();

    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Produto.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}

//delete order => /api/v1/admin/order/:id

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler('Pedido não encontrado com esse id', 404));
    }
    await order.remove();

    res.status(200).json({
        success: true,
    });
});