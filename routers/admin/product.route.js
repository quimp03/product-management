const express = require("express")
const controller = require("../../controllers/admin/product.controller")
const router = express()
router.get("/", controller.index)
router.patch("/:status/:id", controller.changeStatus)
module.exports = router