const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/route');
const config = {
    name: 'HomeDepotBackEnd',
    port: 3001 ,
    host: '0.0.0.0',
};
var port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());




routes(app);
app.listen(port);
