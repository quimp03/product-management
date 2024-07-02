const Product = require("../../model/product.model")
module.exports.index = async(req, res) => {
    const find = {
        status: "active",
        deleted: false
    }
    const products = await Product.find(find)
    for (const item of products) {
        item.newPrice = (item.price * ((100 - item.discountPercentage)/100)).toFixed(0)
    }
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
    })
}