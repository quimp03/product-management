const express = require("express")
const router = express()
const controller = require("../../controllers/client/cart.controller")
router.post("/add/:id", controller.addCartPost)
module.exports = router