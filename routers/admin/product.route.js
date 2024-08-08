const express = require("express")
const controller = require("../../controllers/admin/product.controller")
const router = express()
const multer  = require('multer')
const storage =  require("../../helper/storageMulter.helper")
const upload = multer({storage : storage})
router.get("/", controller.index)
router.patch("/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMultiPatch)
router.delete("/delete/:id", controller.deleteItem)
router.get("/trash", controller.trash)
router.delete("/deleteVv/:id", controller.deleteItemVv)
router.patch("/:id", controller.restoreItemPatch)
router.get("/create", controller.createItem)
router.post("/create",upload.single("thumbnail"), controller.createPost)
module.exports = router