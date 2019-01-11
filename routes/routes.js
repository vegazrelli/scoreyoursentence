var path       = require("path");
var tools      = require('./../tools');

// function score(req, res) {
// 	var sentence = req.body.sentence;
// 	var score    = 0;

// 	if (sentence.length > 0) {
// 		var words = sentence.split(" ");
// 		words.forEach(function(word) {
// 		    if (positiveWords.includes(word)) {
// 		    	score += 10;
// 		    } else if (negativeWords.includes(word)) {
// 		    	score -= 10;
// 		    }
// 		});
// 	}	

//     res.json({score: score})
// }

var appRouter = function (app) {
  app.get("/", function(req, res) {
  	res.render('index');
  });

  app.post("/score", tools.getSentenceScore);
}

module.exports = appRouter;