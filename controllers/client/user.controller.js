const User = require('../../model/user.model')
const ForgotPassword = require("../../model/forgot-password.model")
const md5 = require("md5")
const generate = require("../../helper/generate.helper")
module.exports.login = async(req, res) => {
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
    res.redirect("/user/login")
}
module.exports.loginPost = async(req, res) => {
    const email = req.body.email
    const password = md5(req.body.password)
    const user = await User.findOne({
        email: email,
        deleted: false,
    })
    if(!user){
        req.flash("error", "Tài khoản không tồn tại!")
        res.redirect("back")
        return
    }
    if(password !== user.password){
        req.flash("error", "Sai mật khẩu!")
        res.redirect("back")
        return
    }
    if(user.status != "active"){
        req.flash("error", "Tài khoản đang bị khóa!")
        res.redirect("back")
        return
    }
    res.cookie("tokenUser", user.tokenUser)
    req.flash("success", "Đăng nhập thành công!")
    res.redirect("/")
}
module.exports.logout = async(req, res) => {
    res.clearCookie("tokenUser")
    res.redirect("/")
}
module.exports.forgotPassword = async(req, res) => {
    res.render("client/pages/user/forgot-password.pug")
}
module.exports.forgotPasswordPost = async(req, res) => {
    const email = req.body.email
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if(!user){
        req.flash("error", "Email không tồn tại!")
        res.redirect("back")
        return
    }
    const objectForgotPassword  = {
        email: email,
        otp: generate.generateRandomNumber(6),
        expireAt: Date.now() + 4*60*1000,
    }
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()
    res.redirect(`/user/password/otp?email=${email}`)
}
module.exports.otp = async(req, res) => {
    const email = req.query.email
    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã otp",
        email: email
    })
}
module.exports.optPost = async(req, res) => {
    const email = req.body.email
    const otp = req.body.otp
    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })
    if(!result){
        req.flash("error", "Mã otp không hợp lệ!")
        res.redirect("back")
        return
    }
    const user = await User.findOne({
        email: email
    })
    res.cookie("tokenUser", user.tokenUser)
    res.render("client/pages/user/reset-password.pug")
}
module.exports.resetPassword = async(req, res) => {
    const password = md5(req.body.password)
    const user = await User.updateOne({
        tokenUser: req.cookies.tokenUser,
    }, {
        password: password
    })
    req.flash("success", "Cập nhật mật khẩu thành công!")
    res.redirect("/")
}