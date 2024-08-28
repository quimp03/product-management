const systemConfig = require("../../config/system")
const md5 = require("md5")
const Role = require("../../model/role.model")
const Account = require("../../model/account.model")
const generateHelper = require("../../helper/generate.helper")
module.exports.index = async(req, res) => {
    const roles = await Role.find({
        deleted: false
    })
    const accounts = await Account.find({
        deleted: false
    })
    for (const account of accounts) {
        const role = await Role.findOne({
            _id: account.role_id,
            deleted: false
        })
        account.roleTitle = role.title
    }
    res.render(`${systemConfig.prefixAdmin}/pages/account/index.pug`, {
        pageTitle: "Trang tài khoản",
        accounts: accounts
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
    req.body.password = md5(req.body.password)
    req.body.token = generateHelper.generateRandomString(30)
    const email = req.body.email
    const accounts = await Account.find({
        deleted: false
    })
    for (const account of accounts) {
        if(account.email == email){
            req.flash("error", "Email đã tồn tại")
            res.redirect("back")
            return
        }
    }
    const account = new Account(req.body)
    await account.save()
    req.flash("success", "Thêm tài khoản thành công!")
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}
module.exports.changeStatus = async(req, res) => {
    const id = req.params.id
    const status = req.params.status
    await Account.updateOne({
        _id: id,
        deleted: false
    }, {
        status: status
    })
    req.flash("success", "Cập nhật trạng thái thành công!")
    res.redirect("back")
}
module.exports.edit = async(req, res) => {
    const id = req.params.id
    const account = await Account.findOne({
        _id: id,
        deleted: false
    })
    const roles = await Role.find({
        deleted: false
    })
    res.render(`${systemConfig.prefixAdmin}/pages/account/edit.pug`, {
        pageTitle: "Chỉnh sửa tài khoản",
        data: account,
        roles: roles
    })
}
module.exports.editPatch = async(req, res)=> {
    const id = req.params.id
    const account = await Account.updateOne({
        _id: id,
        deleted: false
    }, req.body)
    req.flash("success", "Cập nhật tài khoản thành công!")
    res.redirect("back")
}
module.exports.delete = async(req, res) => {
    const id = req.params.id 
    await Account.updateOne({
        _id: id
    }, {
        deleted: true
    })
    const titleAccount = await Account.findOne({
        _id: id
    })
    req.flash("success", `Xóa tài khoản ${titleAccount.fullName} thành công`)
    res.redirect("back")
}
module.exports.detail = async(req, res) => {
    const id = req.params.id
    const account = await Account.findOne({
        _id: id,
        deleted: false
    })
    const role = await Role.findOne({
        _id: account.role_id
    })
    account.roleTitle = role.title
    res.render(`${systemConfig.prefixAdmin}/pages/account/detail.pug`, {
        pageTile: "Chi tiết tài khoản",
        account: account
    })
}