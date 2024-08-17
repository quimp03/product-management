const ProductCategory = require("../../model/product-category.model")
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
    const products = await ProductCategory.find({
        deleted: false,
    })
    res.render("admin/pages/productCategory/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        products: products
    })
}
module.exports.create = async(req, res) => {
    res.render("admin/pages/productCategory/create.pug", {
        pageTitle: "Thêm mới danh mục sản phẩm"
    })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position)
    }else{
        const countProductCategory = await ProductCategory.countDocuments()
        req.body.position = countProductCategory + 1
    }
    const productCategory = new ProductCategory(req.body)
    await productCategory.save()
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`)
  };
  module.exports.changeStatus = async(req, res) => {
    const id = req.params.id
    const status = req.params.status
    await ProductCategory.updateOne({
        _id: id,
        deleted: false
    },{
        status: status
    })
    res.redirect("back")
  }
module.exports.deleteProductCategory = async(req, res) => {
    const id = req.params.id
    await ProductCategory.updateOne({
        _id: id
    }, {
        deleted: true
    })
    res.redirect("back")
}