const GeneralSetting = require("../../model/general-setting")
const systemConfig  =require("../../config/system")
module.exports.index = async(req, res) => {
    try {
        const generalSetting = await GeneralSetting.findOne()
        res.render(`${systemConfig.prefixAdmin}/pages/general-setting/index.pug`, {
            pageTitle: "Cài đặt chung",
            generalSetting: generalSetting
        })
    } catch (error) {
        console.log(error)
    }  
}
module.exports.settingGeneralPatch = async(req, res) => {
    try {
        const record = await GeneralSetting.findOne()
        if(record){
         await GeneralSetting.updateOne({
             _id: record.id
         }, req.body)
             req.flash("success", "Cập nhật thông tin thành công!")
        }else{
             const general = new GeneralSetting(req.body)
             await general.save()
        }
        res.redirect("back")
    } catch (error) {
        console.log(error)
    } 
}