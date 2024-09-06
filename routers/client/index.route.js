const homeRouter = require("./home.route")
const productRouter = require("./product.route")
const createTreeMiddleware = require("../../middlewares/client/category.middleware")
module.exports = (app) => {
    app.use(createTreeMiddleware.caterogy)
    app.use("/", homeRouter)
    app.use("/products", productRouter)
}