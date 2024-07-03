const Product = require("../../model/product.model")
module.exports.index = async(req, res) => {
    const find = {
        deleted: false
    }
    const products = await Product.find(find)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Danh sách sản phẩm", 
        products: products
    })
}