const systemConfig = require("../../config/system")

module.exports.index = (req, res) => {
    res.render(`${systemConfig.prefixAdmin}/pages/my-account/index`)
}