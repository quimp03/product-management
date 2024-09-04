const express = require("express")
const route = express()
const controller = require("../../controllers/admin/my-account.controller")
route.get("/", controller.index)
module.exports = route