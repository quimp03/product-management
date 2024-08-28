const systemConfig = require("../../config/system")
const md5 = require("md5")
const Account = require("../../model/account.model")
module.exports.login = (req, res) => {
    res.render(`${systemConfig.prefixAdmin}/pages/auth/login`, {
        pageTitle: "Login"
    })
}
module.exports.loginPost = async(req, res) => {
    const email = req.body.email 
    const password = req.body.password
    const user = await Account.findOne({
        email: email,
        deleted: false
    })
    if(!user){
        req.flash("error", "Email không tồn tại!")
        res.redirect("back")
        return
    }
    if(md5(password) != user.password){
        req.flash("error", "Sai mật khẩu!")
        res.redirect("back")
        return
    }
    if(user.status == "inactive"){
        req.flash("error", "Tài khoản dừng hoạt động")
        res.redirect("back")
        return
    }
    res.cookie("token", user.token)
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}
module.exports.logout = async(req, res) => {
    res.clearCookie("token")
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
}