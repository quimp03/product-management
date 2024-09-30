const GeneralSetting = require("../../model/general-setting")
module.exports.generalSettting = async(req, res, next) => {
    const generalSetting = await GeneralSetting.findOne()
    res.locals.generalSetting = generalSetting
    next()
}