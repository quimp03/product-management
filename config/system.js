const PREFIX_ADMIN = "admin";
const moment = require("moment")
module.exports = {
  prefixAdmin: PREFIX_ADMIN
};
module.exports.moment = (req, res, next) => {
  res.locals.moment = moment
  next()
}