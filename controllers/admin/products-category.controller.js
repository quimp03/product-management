const ProductCategory = require("../../model/product-category.model")
const systemConfig = require("../../config/system");
module.exports.index = (req, res) => {
    res.render("admin/pages/productCategory/index.pug", {
        pageTitle: "Danh mục sản phẩm"
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