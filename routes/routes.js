var path       = require("path");
var tools      = require('./../tools');

var appRouter = function (app) {
  app.get("/", function(req, res) {
  	res.render('index');
  });

  app.post("/score", tools.getSentenceScore);
}

module.exports = appRouter;