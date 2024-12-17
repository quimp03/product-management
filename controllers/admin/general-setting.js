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
module.exports.settingGeneralPatch = async (req, res) => {
    try {
        const record = await GeneralSetting.findOne();
        if (record) {
            await GeneralSetting.updateOne({ _id: record.id }, req.body);
            req.flash("success", "Cập nhật thông tin thành công!");
        } else {
            const general = new GeneralSetting(req.body);
            await general.save();
        }
        
        res.redirect("back");

    } catch (error) {
        console.log(error);
        req.flash("error", "Có lỗi xảy ra, vui lòng thử lại.");
        res.redirect("back"); 
    }
};
module.exports.slideShow = async(req, res) => {
    const record = await GeneralSetting.findOne()
    res.render(`${systemConfig.prefixAdmin}/pages/general-setting/slideshow.pug`, {
        record: record
    })
}
module.exports.slideShowPatch = async (req, res) => {
    try {
        const record = await GeneralSetting.findOne(); 
        if (req.body.slideshow.length > 0) {
            await GeneralSetting.updateOne(
                { _id: record.id }, 
                { slideshow: req.body.slideshow }
            );
            req.flash("success", "Cập nhật thành công!");
            res.redirect("back");
        } else {
            req.flash("error", "Dữ liệu slideshow không hợp lệ!");
            res.redirect("back");
        }
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!");
        console.log(error);
        res.redirect("back");
    }
};
