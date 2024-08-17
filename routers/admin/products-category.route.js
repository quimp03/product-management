const express =require("express")
const multer  = require('multer');
const validate = require("../../validates/admin/product.vallidate")
const router = express()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const controller = require("../../controllers/admin/products-category.controller")
router.get("/", controller.index)
router.get("/create", controller.create)
router.post("/create", upload.single('thumbnail'), uploadCloud.uploadSingle, validate.createPost, controller.createPost)
router.patch("/:status/:id", controller.changeStatus)
router.delete("/delete/:id", controller.deleteProductCategory)
module.exports = router