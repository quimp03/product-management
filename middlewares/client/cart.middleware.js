const Cart = require("../../model/cart.model")
module.exports.cart = async(req, res, next) => {
    if(!req.cookies.cartId){
        const cart = new Cart()
        cart.save()
        res.cookie("cartId", cart.id)
    }
    next()
}