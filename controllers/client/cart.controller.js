const Cart = require("../../model/cart.model")
const Product = require("../../model/product.model")
// [GET] /cart/
module.exports.index = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
          });
        
          cart.totalPrice = 0;
        
          for (const item of cart.products) {
            const infoProduct = await Product.findOne({
              _id: item.product_id
            }).select("thumbnail title price discountPercentage stock slug");
        
            infoProduct.priceNew = (infoProduct.price * (100 - infoProduct.discountPercentage)/100).toFixed(0);
        
            infoProduct.totalPrice = infoProduct.priceNew * item.quantity;
        
            cart.totalPrice += infoProduct.totalPrice;
        
            item.infoProduct = infoProduct;
          }
        
          res.render("client/pages/cart/index", {
            pageTitle: "Giỏ hàng",
            cartDetail: cart
          });
    } catch (error) {
        console.log(error)
        res.redirect("back")
    }
};
module.exports.addCartPost = async(req, res) => {
    try {
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
            req.flash("error", "Thêm vào vỏ hàng không thành công!")
        }
        res.redirect("back")
    } catch (error) {
        console.log(error)
        res.redirect("back")
    }
}
module.exports.deleteProduct = async(req, res) => {
    try {
        const idProduct = req.params.idProduct
        const carId = req.cookies.cartId
        await Cart.updateOne({
            _id: carId
        },{
            $pull: {products: {product_id: idProduct}}
        })
        req.flash("success", "Xóa sản phẩm khỏi giỏ hàng thành công!")
        res.redirect("back")
    } catch (error) {
        console.log(error)
        res.redirect("back")
    }
}
module.exports.updateQuantityProdut = async(req, res) => {
    try {
        const productId = req.params.productId
        const quantity = req.params.quantity
        console.log(quantity)
        const cartId = req.cookies.cartId
        await Cart.updateOne({
            _id: cartId,
            "products.product_id" : productId
        },{
            $set: {"products.$.quantity" : quantity}
        })
        req.flash("success", "Cập nhật số lượng sản phẩm giỏ hàng thành công!")
        res.redirect("back")
    } catch (error) {
        console.log(error)
        res.redirect("back")
    }
}