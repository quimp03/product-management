const express = require("express")
const router = express()
const controller = require("../../controllers/client/search.controller")
router.get("/", controller.index)
module.exports = router