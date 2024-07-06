const Product = require("../../model/product.model")
const filterHelper = require("../../helper/filter.helper")
module.exports.index = async(req, res) => {
    const find = {
        deleted: false
    }
    //filter
    const filterStatus = filterHelper(req)
    if(req.query.status){
        find.status = req.query.status
    }
    //search
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword,"i")
        find.title = regex
    }
    const products = await Product.find(find)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Danh sách sản phẩm", 
        products: products,
        filterStatus: filterStatus,
    })
}