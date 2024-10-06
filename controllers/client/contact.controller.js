module.exports.index = async(req, res) => {
    res.render("client/pages/contact/index.pug", {
        pageTitle: "Trang liên hệ"
    })
}