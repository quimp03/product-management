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
module.exports.detail = async(req, res) => {
    const slug = req.params.slug
    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    })
    if(product){
        res.render("client/pages/products/detail.pug", {
            pageTitle: "Trang chi tiết sản phẩm",
            product: product
        })
    }else{
        res.redirect("/")
    }
}