const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database.js")
const prefixAdmin = require("./middlewares/admin/prefixAdmin.middleware.js")
dotenv.config()
const app = express();
const port = process.env.PORT;
const routeClient = require('./routers/client/index.route')
const routerAdmin = require("./routers/admin/index.route")
database.connect()
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
//set bien locals
app.use(prefixAdmin)
// routes
routeClient(app)
routerAdmin(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});