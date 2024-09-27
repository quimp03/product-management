const User = require("../../model/user.model")
module.exports.user = async(req, res, next) => {
    const tokenUser = req.cookies.tokenUser
    const user = await User.findOne({
        tokenUser: tokenUser,
        deleted: false,
        status: "active"
    })
    if(user){
        res.locals.user = user
    }
    next()
}