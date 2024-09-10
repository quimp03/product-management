const PREFIX_ADMIN = "admin";
const moment = require("moment")
const currency = require("currency.js")
module.exports = {
  prefixAdmin: PREFIX_ADMIN
};
module.exports.moment = (req, res, next) => {
  res.locals.moment = moment
  next()
}
module.exports.currency = (req, res, next) => {
  res.locals.currency = currency
  next()
}