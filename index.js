const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database")
dotenv.config()
const app = express();
const port = process.env.PORT;
const routeClient = require('./routers/client/index.route')
database.connect()
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
routeClient(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});