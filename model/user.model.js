const mongoose = require("mongoose")
const userSChemal = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: String,
    phone: String,
    avatar: String,
    status:{
        type: String,
        default: "active"
    },
    deleted:{
        type: Boolean,
        default: false
    },
},{
    timestamps: true
}
)
const User = mongoose.model("User", userSChemal, "users")
module.exports = User