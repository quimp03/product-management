const mongoose = require("mongoose")
const generalSettingSchemal = new mongoose.Schema({
    websiteName: String,
    logo: String,
    email: String,
    phone: String,
    address: String,
    copyright: String,
    faceBook: String,
    tikTok: String,
    gitHub: String,
    slideshow: { type: [String], default: [] },
},{
    timestamps: true
}
)
const generalSetting = new mongoose.model("generalSetting", generalSettingSchemal, "general-setting")
module.exports = generalSetting