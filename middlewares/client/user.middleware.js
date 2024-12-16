const User = require("../../model/user.model")
module.exports.user = async (req, res, next) => {
  if(req.cookies.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
      status: "active"
    });
    if(user) {
      res.locals.user = user;
    }
  }
  
  next();
}