const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database.js")
const prefixAdmin = require("./middlewares/admin/prefixAdmin.middleware.js")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const flash = require("express-flash")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require("path")
const systemConfig = require("./config/system.js")
dotenv.config()
const app = express();
const port = process.env.PORT;

const routeClient = require('./routers/client/index.route')
const routerAdmin = require("./routers/admin/index.route")

database.connect()
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'pug');
//set đi thẳng vào folder trong view  
app.set('views', `${__dirname}/views`);
/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//set bien locals thông qua middleware
app.use(prefixAdmin)
//set moment locals
app.use(systemConfig.moment)
//set locals currency
app.use(systemConfig.currency)
//body-parser
app.use(bodyParser.urlencoded({ extended: false })) //chuyễn chuỗi json thành javascript từ form
//override
app.use(methodOverride('_method'))
//flash
app.use(cookieParser('NCTUMPQKMT'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
routeClient(app)
routerAdmin(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});