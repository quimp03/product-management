const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const app = express();
const port = process.env.PORT;
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
const routeClient = require('./routers/client/index.route')
routeClient(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});