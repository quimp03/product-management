const express = require("express");
const app = express();
const port = 3000;
app.set('view engine', 'pug');
app.set('views', './views');
const routeClient = require('./routers/client/index.route')
routeClient(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});