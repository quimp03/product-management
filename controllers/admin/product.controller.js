const Product = require("../../model/product.model")
const filterHelper = require("../../helper/filter.helper")
const paginationHelper = require("../../helper/pagination.helper")
const systemConfig = require("../../config/system")
const ProductCategory = require("../../model/product-category.model")
const createTreeHelper = require("../../helper/createTree.helper")
const Account = require("../../model/account.model")
module.exports.index = async(req, res) => {
    try {
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
        // Sort
        const sort = {};
        if(req.query.sortKey && req.query.sortValue) {
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;
            sort[sortKey] = sortValue;
        } else {
            sort.position = "desc";
        }
        // End Sort
        
        //dem ban ghi theo dk
        const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort(sort)
        for (const product of products ) {
            const createdBy = await Account.findOne({
                _id: product.createdBy, 
            })
            if(createdBy){
                product.createdByFullName = createdBy.fullName
            }
        }
        res.render("admin/pages/product/index.pug", {
            pageTitle: "Danh sách sản phẩm", 
            products: products,
            filterStatus: filterStatus,
            keyword: req.query.keyword,
            objectPagination: objectPagination
        })
    } catch (error) {
        console.log(error)
    }
}
// [PATCH] /admin/products/:status/:id
module.exports.changeStatus = async(req,res) => {
    try {
        const status = req.params.status
        const id = req.params.id
        await Product.updateOne({
            _id: id
        }, {
            status: status
        })
        req.flash("success", "Cập nhật trạng thái thành công!")
        res.redirect("back")
    } catch (error) {
        console.log(error)   
    }   
}
module.exports.changeMultiPatch = async(req, res) => {
    try {
        const type = req.body.type
        let ids = req.body.ids
        console.log(ids)
        ids = ids.split(", ")
        switch(type){
            case "active":
            case "inactive":
                await Product.updateMany({
                _id: {$in: ids}
                }, {
                    status: type,
                    updatedAt: new Date(),
                    deletedBy: res.locals.user.id
                })
                req.flash("success", "Cập nhật trạng thái thành công!")
                break
            case "change-position":
                // c2
                for (const item of ids) {
                    const newArr = item.split("-")
                    const id = newArr[0]
                    const position = newArr[1]
                    await Product.updateOne({
                        _id: id
                    }, {
                        position: position
                    })
                }
                req.flash("success", "Thay đổi vị trí sản phẩm thành công!")
                break;
            case "delete-all":
                await Product.updateMany({
                    _id: {$in: ids}
                }, {
                    deleted: true
                })
                req.flash("success", "Xóa các sản phẩm thành công!")
                break
            case "restore":
                await Product.updateMany({
                    _id: {$in: ids}
                }, {
                    deleted: false
                })
                req.flash("success", "Khôi phục các sản phẩm thành công!")
                break
            case "deletevv":
                await Product.deleteMany({
                    _id: {$in: ids}
                })
                req.flash("success", "Sản phẩm ")
                break
            default: 
                break
        }
        res.redirect("back")
    } catch (error) {
        console.log(error)
    }
}
module.exports.deleteItem = async(req, res) =>{
    try {
        const id = req.params.id
        await Product.updateOne({
            _id: id
        }, {
            deleted: true,
            updatedAt: new Date(),
            deletedBy: res.locals.user.id
        })
        res.redirect("back")
    } catch (error) {
        console.log(error)
    }
}
module.exports.trash = async(req, res) =>{
    try {
        const find = {
            deleted: true
        }
        //search
        if(req.query.keyword){
            const regex = new RegExp(req.query.keyword,"i")
            find.title = regex
        }
        const countRecord = await Product.countDocuments(find)
        const objectPagination = paginationHelper(req, countRecord)
        const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
        res.render("admin/pages/product/trash", {
            pageTitle: "Trang thùng rác",
            products: products,
            objectPagination: objectPagination,
            keyword: req.query.keyword
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports.deleteItemVv = async(req, res) => {
    try {
        const id = req.params.id 
        await Product.deleteOne({
            _id: id
        })
        const nameSp = Product.findOne({
            _id: id
        })
        res.flash("success", `Xóa sản phẩm ${nameSp.title} thành công!`)
        res.redirect("back")
    } catch (error) {
        console.log(error)
    }
}
module.exports.restoreItemPatch = async (req, res) => {
    const id = req.params.id
    try {
        await Product.updateOne({
            _id: id
        },
        {
            deleted: false
        })
        res.redirect("back")
    } catch (error) {
        console.log(error)
    }
  };
module.exports.createItem = async(req, res) => {
    try {
        const find = {
            deleted: false
        }
        const productCategory = await ProductCategory.find(find)
        const category = createTreeHelper(productCategory)
        res.render("admin/pages/product/create.pug", {
            pageTitle: "Tạo sản phẩm",
            category: category
        })
    } catch (error) {
        console.log(error)
    }  
}
module.exports.createPost = async(req, res) => {
    try {
        req.body.price = parseInt(req.body.price)
        req.body.discountPercentage = parseInt(req.body.discountPercentage)
        req.body.stock = parseInt(req.body.stock)
        if(req.body.position){
            req.body.position = parseInt(req.body.position)
        }else{
            const countProduct = await Product.countDocuments()
            req.body.position = countProduct + 1
        }
        req.body.createdBy = res.locals.user.id
        const product = new Product(req.body)
        await product.save()
        req.flash('success', "Thêm sản phẩm thành công!")
        res.redirect(`/${systemConfig.prefixAdmin}/products`)
    } catch (error) {
        console.log(error)
    }
}
module.exports.edit = async(req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({
            _id: id,
            deleted: false
        })
        const productCategory = await ProductCategory.find({
            deleted: false
        })
        const category = createTreeHelper(productCategory)
        res.render(`${systemConfig.prefixAdmin}/pages/product/edit`, {
            pageTitle: "Trang chỉnh sửa",
            product: product,
            category: category
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports.editPost = async(req, res) => {
    try {
        const id = req.params.id
        req.body.price = parseInt(req.body.price)
        req.body.discountPercentage = parseInt(req.body.discountPercentage)
        req.body.stock = parseInt(req.body.stock)
        req.body.position = parseInt(req.body.position)
        await Product.updateOne({
            _id:id,
            deleted: false
        }, req.body)
        req.flash("success", "Cập nhật trạng thái sản phẩm thành công!")
        res.redirect("back")
    } catch (error) {
        console.log(error)
    }
}
module.exports.detail = async(req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findOne({
            _id: id,
            deleted: false
        })
        res.render(`${systemConfig.prefixAdmin}/pages/product/detail`, {
            pageTitle: "Tranh chi tiết",
            product: product
        })
    } catch (error) {
        console.log(error)
    }  
}