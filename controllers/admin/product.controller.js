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
// [PATCH] /admin/products/:status/:id
module.exports.changeStatus = async(req,res) => {
    const status = req.params.status
    const id = req.params.id
    await Product.updateOne({
        _id: id
    }, {
        status: status
    })
    res.redirect("back")
}
module.exports.changeMultiPatch = async(req, res) => {
    const type = req.body.type
    let ids = req.body.ids
    ids = ids.split(", ")
    switch(type){
        case "active":
        case "inactive":
            await Product.updateMany({
            _id: {$in: ids}
            }, {
                status: type
            })
            break
        default: 
            break
    }
    res.redirect("back")
}