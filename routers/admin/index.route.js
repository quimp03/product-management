const dashboardRoutes  = require("./dashboard.route")
const productsRoutes = require("./product.route")
const productsCategoryRoutes = require("./products-category.route")
const systemConfig = require("../../config/system")
const roleRoutes = require("../../routers/admin/role.route")
const accountRoutes  = require("./account.route")
const authRoutes = require("./auth.route")
const myAccountRoute = require("./my-account.route")
const authMiddleware = require("../../middlewares/admin/auth.middleware")
module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`
    app.use(PATH_ADMIN + "/dashboard",authMiddleware.requireAuth, dashboardRoutes)
    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productsRoutes)
    app.use(PATH_ADMIN + "/products-category",authMiddleware.requireAuth, productsCategoryRoutes)
    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes)
    app.use(PATH_ADMIN + "/accounts",authMiddleware.requireAuth, accountRoutes)
    app.use(PATH_ADMIN + "/auth", authRoutes)
    app.use(PATH_ADMIN + "/my-account",authMiddleware.requireAuth, myAccountRoute)
}