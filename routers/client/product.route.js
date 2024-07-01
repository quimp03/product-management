const express = require("express");
const router = express();
router.get("/", (req, res) => {
    res.render("client/pages/products/index.pug")
})
module.exports = router