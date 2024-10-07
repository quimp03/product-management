const systemConfig = require("../../config/system")
const Role = require("../../model/role.model")
module.exports.index = async(req, res) => {
    try {
        const roles = await Role.find({
            deleted: false
        })
        res.render(`admin/pages/role/index.pug`, {
            pageTitle: "Nhóm quyền",
            records: roles
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports.create = async(req, res) => {
    res.render("admin/pages/role/create.pug", {
        pageTitle :"Tạo nhóm quyền"
    })
}
module.exports.creatPost = async(req, res) => {
    try {
        const role = new Role(req.body)
        await role.save()
        req.flash("success", "Tạo nhóm quyền thành công!")
    } catch (error) {
        console.log(error)
        req.flash("error", "Tạo nhóm quyền thất bại!")
    }
 res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}
module.exports.edit = async(req, res) => {
    try {
        const id = req.params.id
        const role = await Role.findOne({
            _id: id,
            deleted: false
        })
        res.render(`${systemConfig.prefixAdmin}/pages/role/edit`, {
            pageTitle: "Chỉnh sửa nhóm quyền",
            role: role
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports.editPatch = async(req, res) => {
    try {   
        const id = req.params.id
        const role = await Role.updateOne({
            _id : id
        }, req.body)
        req.flash("success", "Cập nhật nhóm quền thành công!")
    } catch (error) {
        console.log(error)
    }
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}
module.exports.delete = async(req, res) => {
    try {
        const id = req.params.id 
        await Role.updateOne({
            _id: id
        }, {
            deleted: true
        })
        req.flash("success", "Xóa nhóm quyền thành công!")
        res.redirect("back")
    } catch (error) {
        console.log(error)
    }
}
module.exports.detail = async(req, res) => {
    try {
        const id = req.params.id 
        const role = await  Role.findOne({
            _id: id,
            deleted: false
        })
        res.render(`${systemConfig.prefixAdmin}/pages/role/detail.pug`, {
            pageTitle: "Chi tiết nhóm quyền",
            role: role
        })
    } catch (error) {
        console.log(error)
    }  
}
module.exports.permisstion = async(req, res) => {
    try {
        const find = {
            deleted: false
        }
        const roles = await Role.find(find)
        res.render(`${systemConfig.prefixAdmin}/pages/role/permission.pug`, {
            pageTitle: "Phân quyền",
            records: roles
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports.permissionPatch = async(req, res) => {
    try {
        const roles = JSON.parse(req.body.roles)
        console.log(roles)
        for (const role of roles) {
            //for of mới dùng đc update
            await Role.updateOne({
                _id: role.id
            }, {
                permissions: role.permissions
            })
        }
        req.flash("success","Cập nhật thành công!")
    } catch (error) {
        console.log(error)
        req.flash("error","Cập nhật thất bại!")
    }
    res.redirect("back")
}