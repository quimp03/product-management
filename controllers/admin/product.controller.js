const Product = require("../../model/product.model")
const filterHelper = require("../../helper/filter.helper")
const paginationHelper = require("../../helper/pagination.helper")
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
    //pagination
    const countRecord = await Product.countDocuments(find)
    const objectPagination = paginationHelper(req, countRecord)
    //dem ban ghi theo dk
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Danh sách sản phẩm", 
        products: products,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
        objectPagination: objectPagination
    })
}