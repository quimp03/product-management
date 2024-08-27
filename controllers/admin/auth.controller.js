const systemConfig = require("../../config/system")
module.exports.login = (req, res) => {
    res.render(`${systemConfig.prefixAdmin}/pages/auth/login`)
}