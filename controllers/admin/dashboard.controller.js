const CategoryProduct = require("../../model/product-category.model")
const Product = require("../../model/product.model")
const User = require("../../model/user.model")
const Account = require("../../model/account.model")
const ProductCategory = require("../../model/product-category.model")
module.exports.index = async(req, res) => {
    try {
        const statistic = {
            categoryProduct: {
                total: 0,
                active: 0,
                inactive: 0,
            },
            product: {
                total: 0,
                active: 0,
                inactive: 0
            },
            account: {
                total: 0,
                active: 0,
                inactive: 0,
            },
            user: {
                total: 0,
                active: 0,
                inactive: 0,
            }
        }
        statistic.categoryProduct.total = await ProductCategory.countDocuments({
            deleted: false
        })
        statistic.product.total = await Product.countDocuments({
            deleted: false
        })
        statistic.user.total = await User.countDocuments({
            deleted: false
        })
        statistic.account.total = await Account.countDocuments({
            deleted: false
        })
        res.render("admin/pages/dashboard/index", {
            pageTitle: "Trang tổng quan",
            statistic: statistic
        })
    } catch (error) {
        console.log(error)
    }  
}