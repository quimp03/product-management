const Product = require("../../model/product.model")
const ProductCategory = require("../../model/product-category.model")
module.exports.index = async(req, res) => {
    try {
        const find = {
            status: "active",
            deleted: false
        }
        const products = await Product.find(find).sort({position: "desc"})
        for (const item of products) {
            item.newPrice = (item.price * ((100 - item.discountPercentage)/100)).toFixed(0)
        }
        res.render("client/pages/products/index.pug", {
            pageTitle: "Danh sách sản phẩm",
            products: products,
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports.detail = async(req, res) => {
    try {
        const slug = req.params.slug
        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        })
        const category = await ProductCategory.findOne({
            _id: product.product_category_id,
            deleted: false,
            status: "active"
        })
        product.category = category
        product.priceNew = (product.price * (100 - product.discountPercentage)/100).toFixed(0)
        if(product){
            res.render("client/pages/products/detail.pug", {
                pageTitle: "Trang chi tiết sản phẩm",
                product: product
            })
        }else{
            res.redirect("/")
        }
    } catch (error) {
       console.log(error) 
    }
}
module.exports.slugCategory = async(req, res) => {
    try {
        const slugCategory = req.params.slugCategory
        const productCategory = await ProductCategory.findOne({
            slug: slugCategory,
            deleted: false,
            status: "active"
        })
        if(productCategory){
            const getSubCategory = async(parent_id) => {
                let allSubs = []
                const listSub = await ProductCategory.find({
                    parent_id: parent_id,
                    deleted: false,
                    status: "active"
                }).select("id title")
                allSubs = [...listSub]
                for (const sub of listSub) {
                    const childs = await getSubCategory(sub.id)
                    allSubs = allSubs.concat(childs)
                }
                return allSubs
            }
            const listSubcategory = await getSubCategory(productCategory.id)
            const listIdSubCategory = listSubcategory.map(item => item.id)
            const products = await Product.find({
                product_category_id: {$in: [productCategory.id, ...listIdSubCategory]},
                deleted: false,
                status: 'active'
            }).sort({position: "desc"})
            for (const product of products) {
                product.newPrice = product.price * ((100 - product.discountPercentage)/100).toFixed(0)
            }
            res.render("client/pages/products/index.pug", {
                pageTitle: productCategory.title,
                products: products
            })
        }else{
            return
        }
    } catch (error) {
        console.log(error)
    }
    
}