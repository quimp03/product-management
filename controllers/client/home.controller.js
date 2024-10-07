const Product = require("../../model/product.model")
module.exports.index = async(req, res) => {
    try {
        //Sản phẩm nổi bật
        const productsFeatured = await Product.find({
            deleted: false,
            status: "active",
            featured: "1"
        }).limit(6).select("-decription")
        for (const product of productsFeatured) {
            product.newPrice = (product.price * (100 - product.discountPercentage)/100).toFixed(0)
        }
        //Sản phẩm mới nhất
        const productsNew = await Product.find({
            deleted: false,
            status: "active",
        }).sort({position: "desc"}).limit(6).select("-decription")
        for (const product of productsNew) {
            product.newPrice = (product.price * (100 - product.discountPercentage)/ 100).toFixed(0)
        }
        res.render("client/pages/home/index", {
            pageTitle:"Trang chủ",
            productsFeatured: productsFeatured,
            productsNew: productsNew
        })
    } catch (error) {
        console.log(error)
    }
}