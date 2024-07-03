const express = require("express");
const controller = require("../../controllers/admin/dashboard.controller")
const router = express()
router.get("/", controller.index)
module.exports = router