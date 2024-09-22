const User = require('../../model/user.model')
const md5 = require("md5")
const generate = require("../../helper/generate.helper")
module.exports.index = async(req, res) => {
    res.render("client/pages/user/login.pug", {
        pageTitle: "Đăng nhập tài khoản"
    })
}
module.exports.register = async(req, res) => {
    res.render("client/pages/user/register.pug", {
        pageTitle: "Đăng kí tài khoản"
    })
}
module.exports.registerPost = async(req, res) => {
    const email = req.body.email
    const exitsEmail= await User.findOne({
        email: email,
        deleted: false
    })
    if(exitsEmail){
        req.flash("error", "Email đã tồn tại")
        res.redirect("back")
        return
    }
    const userInfo = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generate.generateRandomString(30)
    }
    const user = new User(userInfo)
    await user.save()
    req.flash("success", "Tạo tài khoản thành công")
    res.redirect("/products")
}