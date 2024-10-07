const User = require('../../model/user.model')
const ForgotPassword = require("../../model/forgot-password.model")
const sendEmailHelper = require("../../helper/sendEmail.helper")
const md5 = require("md5")
const generate = require("../../helper/generate.helper")
const Cart = require('../../model/cart.model')
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
    try {
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
    } catch (error) {
        console.log(error)
    }
}
module.exports.loginPost = async(req, res) => {
    try {
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
        await Cart.updateOne({
            _id: req.cookies.cartId
        }, {
            user_id: user.id
        })
        res.cookie("tokenUser", user.tokenUser)
        req.flash("success", "Đăng nhập thành công!")
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
}
module.exports.logout = async(req, res) => {
    res.clearCookie("tokenUser")
    res.redirect("/")
}
module.exports.forgotPassword = async(req, res) => {
    res.render("client/pages/user/forgot-password.pug")
}
module.exports.forgotPasswordPost = async(req, res) => {
    try {
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
        const otp = generate.generateRandomNumber(6)
        //Lưu otp vào database
        const objectForgotPassword  = {
            email: email,
            otp: otp,
            expireAt: Date.now() + 3*60*1000,
        }
        const forgotPassword = new ForgotPassword(objectForgotPassword)
        await forgotPassword.save()
        const subject = "Lấy lại mật khẩu."
        const text = `Mã xác thực OTP: ${otp}. Vui lòng không cung cấp mã OTP này với bất kỳ ai!`
        sendEmailHelper.sendEmail(email,subject,text)
        res.redirect(`/user/password/otp?email=${email}`)
    } catch (error) {
        console.log(error)
    }
}
module.exports.otp = async(req, res) => {
    try {
        const email = req.query.email
        res.render("client/pages/user/otp-password", {
            pageTitle: "Nhập mã otp",
            email: email
        }) 
    } catch (error) {
        console.log(error)
    }
}
module.exports.optPost = async(req, res) => {
    try {
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
    } catch (error) {
        console.log(error)
    }    
}
module.exports.resetPassword = async(req, res) => {
    try {
        const password = md5(req.body.password)
        const user = await User.updateOne({
            tokenUser: req.cookies.tokenUser,
        }, {
            password: password
        })
        req.flash("success", "Cập nhật mật khẩu thành công!")
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
}
module.exports.profileUser =async(req, res ) => {
    try {
        const inforUser = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status: "active"
        })
        res.render("client/pages/user/profile.pug", {
            pageTitle: "Tài khoản",
            inforUser: inforUser
        })
    } catch (error) {
        console.log(error)
    }
}