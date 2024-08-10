module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
        req.flash("error" ,"Vui lòng nhập tiêu đề cho sản phẩm!")
        res.redirect("back")
        return
    }
    if(!req.body.title < 5){
        req.flash("error" ,"Vui lòng nhập ít nhất 5 kí tự!")
        res.redirect("back")
        return
    }
    next()
}