const express = require("express")
const controller = require("../../controllers/admin/product.controller")
const router = express()
router.get("/", controller.index)
module.exports = router