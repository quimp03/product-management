const ProductCategory = require("../../model/product-category.model")
const createTreeHelper = require("../../helper/createTree.helper")
module.exports.caterogy = async(req, res, next) => {
    const productCategory = await ProductCategory.find({
        deleted: false,
        status: "active"
    })
    const newProductCategory = createTreeHelper(productCategory)
    res.locals.layoutProductCategory = newProductCategory
    next()
}