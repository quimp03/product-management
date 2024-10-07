const ProductCategory = require("../../model/product-category.model")
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/createTree.helper");
const paginationHelper = require("../../helper/pagination.helper")
module.exports.index = async (req, res) => {
    try {
      const find = {
        deleted: false
      }
      const countRecords = await ProductCategory.countDocuments(find)
      const objectPagination =  paginationHelper(req, countRecords)
      const products = await ProductCategory.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
      res.render("admin/pages/productCategory/index.pug", {
          pageTitle: "Danh mục sản phẩm",
          products: products,
          objectPagination: objectPagination
      })
    } catch (error) {
      console.log(error)
    }
}
// [GET] /admin/product-category
module.exports.create = async(req, res) => {
    try {
      const records = await ProductCategory.find({
        deleted: false
      })
      const newRecords = createTreeHelper(records);
      res.render("admin/pages/productCategory/create.pug", {
          pageTitle: "Thêm mới danh mục sản phẩm",
          records: newRecords
      })
    } catch (error) {
      console.log(error)
    }
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  try {
    if(req.body.position){
      req.body.position = parseInt(req.body.position)
  }else{
      const countProductCategory = await ProductCategory.countDocuments()
      req.body.position = countProductCategory + 1
  }
  const productCategory = new ProductCategory(req.body)
  await productCategory.save()
  } catch (error) {
    console.log(error)
    return
  }
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`)
  };
  // [PATCH] /admin/product-category/change-status
  module.exports.changeStatus = async(req, res) => {
    try {
      const id = req.params.id
      const status = req.params.status
      await ProductCategory.updateOne({
          _id: id,
          deleted: false
      },{
          status: status
      })
      req.flash("success", "Thay đổi trạng thái danh mục sản phẩm thành công!")
      res.redirect("back")
    } catch (error) {
      console.log(error)
    }
  }
  // [DELETE] /admin/product-category/delete
module.exports.deleteProductCategory = async(req, res) => {
    try {
      const id = req.params.id
      await ProductCategory.updateOne({
          _id: id
      }, {
          deleted: true
      })
      req.flash("success", "Xóa danh mục sản phẩm thành công!")
      res.redirect("back")
    } catch (error) {
      console.log(error)
    }
}
  // [GET] /admin/product-category/edit
module.exports.edit = async (req, res) => {
    try {
      const find = {
        _id: req.params.id,
        deleted: false,
      };
      const data = await ProductCategory.findOne(find);
      const records = await ProductCategory.find({
        deleted: false,
      });
      const newRecords = createTreeHelper(records);
      res.render("admin/pages/productCategory/edit", {
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        data: data,
        records: newRecords,
      });
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/productCategory`);
    }
  };
  // [PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async(req, res) => {
   try {
    const id = req.params.id
    req.body.position = parseInt(req.body.position)
    await ProductCategory.updateOne({
        _id: id,
        deleted: false
    }, req.body)
    req.flash("success", "Cập nhật thành công!")
   } catch (error) {
    console.log(error)
    req.flash("error", "Cập nhật không thành công!")
   }
   res.redirect("back")
}
module.exports.detail = async(req, res) => {
  try {
    const productCategory = await ProductCategory.find({
      deleted: false
    })
    const categoryTree = createTreeHelper(productCategory)
    const id = req.params.id
    const category = await ProductCategory.findOne({
      _id: id,
      deleted: false
    })
    const parentCategory = {
        childCategory: ""
    }
    productCategory.forEach(item => {
      if(item.id == category.parent_id){
        parentCategory.childCategory = item.title
      }
    })
    res.render(`${systemConfig.prefixAdmin}/pages/productCategory/detail.pug`, {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      category: category,
      categoryTree: categoryTree,
      parentCategory: parentCategory
    })
  } catch (error) {
    console.log(error)
  }
}