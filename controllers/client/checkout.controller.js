const Cart = require("../../model/cart.model")
const Product = require("../../model/product.model")
const Order = require("../../model/order.model")
module.exports.index = async(req, res) => {
    const cartId = req.cookies.cartId
    const cart = await Cart.findOne({
        _id: cartId
    })
    cart.totalPrice = 0
    for (const product of cart.products) {
        const inforProduct = await Product.findOne({
            _id: product.product_id
        }).select("thumbnail title price discountPercentage stock slug");
        inforProduct.newPrice = (inforProduct.price * (100 - inforProduct.discountPercentage)/100).toFixed(0)
        inforProduct.totalPrice = inforProduct.newPrice * product.quantity
        cart.totalPrice += inforProduct.totalPrice
        product.inforProduct = inforProduct
    }
    res.render("client/pages/checkout/checkout.pug", {
        pageTitle: "Trang thanh toán",
        cartDetail: cart
    })
}   
module.exports.orderPost = async(req, res) => {
    const cartId = req.cookies.cartId
    const cart = await Cart.findOne({
        _id: cartId
    })
    const products = []
    for (const item of cart.products) {
        const product = await Product.findOne({
            _id: item.product_id
        })
        const infoProduct = {
            product_id: product.id,
            price: product.price,
            discountPercentage: product.discountPercentage,
            quantity: item.quantity,
        }
        products.push(infoProduct)
    }
    const userInfo = req.body
    const dataOrder = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products,
        user_id: cart.user_id
    }
    const order = new Order(dataOrder)
    await order.save()
    await Cart.updateOne({
        _id: cartId
    }, {
        products:[]
    })
    res.redirect(`/checkout/success/${order.id}`)
}
module.exports.success = async(req, res) => {
    const orderId = req.params.orderId
    
    const order = await Order.findOne({
        _id: orderId
    })
    order.totalPrice = 0
    for (const item of order.products) {
        const product = await Product.findOne({
            _id: item.product_id
        })
        item.newPrice = (item.price * (100 - item.discountPercentage)/100).toFixed(0)
        item.totalPrice = item.newPrice * item.quantity
        item.title = product.title
        item.thumbnail = product.thumbnail
        order.totalPrice += item.totalPrice
    }
    res.render("client/pages/checkout/success.pug", {
        pageTitle: "Đơn hàng của bạn",
        order: order
    })
}