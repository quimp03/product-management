const express = require("express")
const router = express()
const controller = require("../../controllers/client/cart.controller")
router.get("/", controller.index)
router.post("/add/:id", controller.addCartPost)
router.get("/delete/:idProduct", controller.deleteProduct)
module.exports = router