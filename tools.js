var positiveWords = ['great','good','nice','amazing','perfect','well','helpful','friendly','clean','comfortable','easy','excellent','top','superb','fantastic','best'];
var negativeWords = ['problem','unfriendly','horrible','uncomfortable','worst','average','dirty','negative','mess','hell','bad','awful','ancient','cold','tiny','small'];

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var self = module.exports = {
    initDB: function () {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo   = db.db("trivago");
            dbo.dropDatabase();
            var words = [
                { content: 'great', score: '10' },
                { content: 'good', score: '10' },
                { content: 'nice', score: '10' },
                { content: 'amazing', score: '10' },
                { content: 'perfect', score: '10' },
                { content: 'well', score: '10' },
                { content: 'helpful', score: '10' },
                { content: 'friendly', score: '10' },
                { content: 'clean', score: '10' },
                { content: 'comfortable', score: '10' },
                { content: 'easy', score: '10' },
                { content: 'excellent', score: '10' },
                { content: 'top', score: '10' },
                { content: 'superb', score: '10' },
                { content: 'fantastic', score: '10' },
                { content: 'best', score: '10' },
                { content: 'problem', score: '-10' },
                { content: 'unfriendly', score: '-10' },
                { content: 'horrible', score: '-10' },
                { content: 'uncomfortable', score: '-10' },
                { content: 'worst', score: '-10' },
                { content: 'average', score: '-10' },
                { content: 'dirty', score: '-10' },
                { content: 'negative', score: '-10' },
                { content: 'mess', score: '-10' },
                { content: 'hell', score: '-10' },
                { content: 'bad', score: '-10' },
                { content: 'awful', score: '-10' },
                { content: 'ancient', score: '-10' },
                { content: 'cold', score: '-10' },
                { content: 'tiny', score: '-10' },
                { content: 'small', score: '-10' }
            ];
            dbo.collection("words").insertMany(words, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },
    wordScore: function (word, _callback) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;

            var score = 0;

            var dbo = db.db("trivago");
            var query = { content: word };
            dbo.collection("words").find(query).toArray(function(err, result) {
                if (err){
                    _callback(err);
                }
                db.close();

                if (result.length > 0) {
                    score = parseInt(result[0].score);
                }
                _callback(score);
            });
        });
    },
    sentenceScore: function (sentence, _callback) {
        var score = 0;
        var counter = 0;

        if (sentence.length > 0) {
            var words = sentence.split(' ');
            for (var i = 0, len = words.length; i < len; i++) {
                self.wordScore(words[i], function(result) {
                    score += result;
                    counter +=1 

                    // All words are processed
                    if (counter == words.length) {
                        _callback(score);
                    }
                });
            }
        } else {
            _callback(score);
        }
    },
    getSentenceScore: function (req, res) {
        // Let's clean the sentence: lower case, and without punctuation
        var sentence = req.body.sentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

        self.sentenceScore(sentence, function(result) {
            res.json({score: result});
        });
    }
};