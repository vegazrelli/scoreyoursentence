var express    = require("express");
var bodyParser = require("body-parser");
var mongo      = require('mongodb');
var routes     = require("./routes/routes.js");
var tools      = require('./tools');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

tools.initDB();

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});