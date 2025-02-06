const Product = require("../../model/product.model")
module.exports.index = async(req, res) => {
    
    const keyword = req.query.keyword
    const regexKeyword = new RegExp(keyword, "i")
    try {
        const products = await Product.find({
            title: regexKeyword,
            deleted: false,
            status: "active",
        })
        for (const item of products) {
            item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
          }
        res.render("client/pages/search/index.pug", {
            pageTitle: "Kết quả",
            products: products,
            keyword: keyword.toUpperCase()
        })
    } catch (error) {
        console.log(error)
        res.redirect("back")
    }
}