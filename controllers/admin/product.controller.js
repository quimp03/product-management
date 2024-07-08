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
    //pagination
    const objectPagination = {
            currentPage: 1,
            limitItems: 3
    }
    //Lay page tren router
    if(req.query.page){
            objectPagination.currentPage = parseInt(req.query.page)
    }
    //cong thuc skip theo so page
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    //dem ban ghi theo dk
    const countRecord = await Product.countDocuments(find)
    //lam tron so page
    objectPagination.totalPage = Math.ceil(countRecord/objectPagination.limitItems)
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    res.render("admin/pages/product/index.pug", {
        pageTitle: "Danh sách sản phẩm", 
        products: products,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
        objectPagination: objectPagination
    })
}