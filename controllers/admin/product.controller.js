const Product = require("../../model/product.model")
const filterHelper = require("../../helper/filter.helper")
const paginationHelper = require("../../helper/pagination.helper")
const systemConfig = require("../../config/system")
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
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort({position: "asc"})
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
    req.flash("success", "Cập nhật trạng thái thành công!")
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
            // c2
            // for (const item of ids) {
            //     let [id, position] = item.split("-");
            //     position = parseInt(position);
            //     await Product.updateOne({
            //       _id: id
            //     }, {
            //       position: position
            //     });
            //   }
              break;
        case "deleteAll":
            await Product.updateMany({
                _id: {$in: ids}
            }, {
                deleted: true
            })
            res.flash("success", "Xóa các sản phẩm thành công!")
            break
        case "restore":
            await Product.updateMany({
                _id: {$in: ids}
            }, {
                deleted: false
            })
            res.flash("success", "Khôi phục các sản phẩm thành công!")
            break
        case "deletevv":
            await Product.deleteMany({
                _id: {$in: ids}
            })
            res.flash("success", "Sản phẩm ")
            break
        default: 
            break
    }
    res.redirect("back")
}
module.exports.deleteItem = async(req, res) =>{
    const id = req.params.id
    await Product.updateOne({
        _id: id
    }, {
        deleted: true
    })
    res.redirect("back")
}
module.exports.trash = async(req, res) =>{
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
}
module.exports.deleteItemVv = async(req, res) => {
    const id = req.params.id 
    await Product.deleteOne({
        _id: id
    })
    const nameSp = Product.findOne({
        _id: id
    })
    res.flash("success", `Xóa sản phẩm ${nameSp.title} thành công!`)
    res.redirect("back")
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
    res.render("admin/pages/product/create.pug", {
        pageTitle: "Tạo sản phẩm"
    })
}
module.exports.createPost = async(req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }else{
        const countProduct = await Product.countDocuments()
        req.body.position = countProduct + 1
    }
    const product = new Product(req.body)
    await product.save()
    req.flash('success', "Thêm sản phẩm thành công!")
    res.redirect(`/${systemConfig.prefixAdmin}/products`)
}