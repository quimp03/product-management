const express =require("express")
const multer  = require('multer');
const router = express()
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const controller = require("../../controllers/admin/products-category.controller")
router.get("/", controller.index)
router.get("/create", controller.create)
router.post("/create", upload.single('thumbnail'), uploadCloud.uploadSingle, controller.createPost)
module.exports = router