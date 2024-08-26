const systemConfig = require("../../config/system")
const Role = require("../../model/role.model")
const Account = require("../../model/account.model")
module.exports.index = (req, res) => {
    res.render(`${systemConfig.prefixAdmin}/pages/account/index.pug`, {
        pageTitle: "Trang tài khoản"
    })
}
module.exports.create = async(req, res) => {
    const roles = await Role.find({
        deleted: false
    })
    res.render(`${systemConfig.prefixAdmin}/pages/account/create.pug`, {
        pageTitle: "Tạo tài khoản",
        roles: roles
    })
}
module.exports.createPost = async(req, res) => {
    const account = new Account(req.body)
    await account.save()
    req.flash("success", "Thêm tài khoản thành công!")
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}