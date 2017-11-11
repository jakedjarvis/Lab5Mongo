var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/commentDB', {useMongoClient:true});
var commentSchema = mongoose.Schema({
    Name:String,
    Comment:String
});

var Comment = mongoose.model('Comment', commentSchema);

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function() {
    console.log("Connected");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  console.log("In the GET route?");
  Comment.find(function(err,commentList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(commentList); //Otherwise console log the comments you found

    res.json(commentList);

  }
})

});

router.get('/fake', function(req, res, next){
    console.log("were inside fake");
    var fakelist = [{Name:"Jim", Comment:"Hi"}];
    res.json(fakelist);
});

router.post('/comment', function(req, res, next) {
    console.log("commment post");
    console.log(req.body);
    var newcomment = new Comment(req.body);
    newcomment.save(function(err,post){
        if(err) return console.error(err);

        console.log(post);
        res.sendStatus(200);
    });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
console.log("In the GET route?");
Comment.find(function(err,commentList) { //Calls the find() method on your database
  if (err) return console.error(err); //If there's an error, print it out
  else {
    console.log(commentList); //Otherwise console log the comments you found

    res.json(commentList);

  }
})
});


module.exports = router;
