const Product = require("../../model/product.model")
module.exports.index = async(req, res) => {
    const keyword = req.query.keyword
    const regexKeyword = new RegExp(keyword, "i")
    const products = await Product.find({
        title: regexKeyword,
        deleted: false,
        status: "active",
    })
    res.render("client/pages/search/index.pug", {
        pageTitle: "Kết quả",
        products: products,
        keyword: keyword.toUpperCase()
    })
}