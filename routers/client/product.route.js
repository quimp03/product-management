const express = require("express");
const router = express();
const controller = require("../../controllers/client/product.controller")
router.get("/", controller.index)
router.get("/detail/:slug", controller.detail)
router.get("/:slugCategory", controller.slugCategory)
module.exports = router