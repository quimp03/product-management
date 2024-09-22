const express = require("express")
const router = express()
const controller = require("../../controllers/client/user.controller")
router.get("/login", controller.index)
router.get("/register", controller.register)
router.post("/register", controller.registerPost)
module.exports = router