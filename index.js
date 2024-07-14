const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database.js")
const prefixAdmin = require("./middlewares/admin/prefixAdmin.middleware.js")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
dotenv.config()
const app = express();
const port = process.env.PORT;
const routeClient = require('./routers/client/index.route')
const routerAdmin = require("./routers/admin/index.route")
database.connect()
app.use(express.static('public'));
app.set('view engine', 'pug');
//set đi thẳng vào folder trong view  
app.set('views', './views');
//set bien locals thông qua middleware
app.use(prefixAdmin)
//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
//override
app.use(methodOverride('_method'))
routeClient(app)
routerAdmin(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});