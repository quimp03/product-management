const Cart = require("../../model/cart.model")
module.exports.addCartPost = async(req, res) => {
    const productId = req.params.id
    const quantity = parseInt(req.body.quantity)
    const cartId = req.cookies.cartId

   
    try {
        const product = {
            product_id: productId,
            quantity: quantity,
        }
        const card = await Cart.findOne({
            _id: cartId
        })
        const existProductId = card.products.find(item => item.product_id == productId)
        if(existProductId){
            const quantityUpdate = existProductId.quantity + quantity
            await Cart.updateOne({
                _id: cartId,
                "products.product_id": productId
            },{
                $set: {"products.$.quantity": quantityUpdate}
            })
        }else{
            await Cart.updateOne({
                _id:cartId
            },{
                $push: {products: product}
            })
        }
        req.flash("success", "Thêm vào vỏ hàng thành công!")
    } catch (error) {
        console.log(error)
        req.flash("error", "Thêm vào vỏ hàng không thàh công!")
    }
    res.redirect("back")
}