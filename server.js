var express= require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use( express.static ( "public" ) );

app.get("/", function(req, res) {
    res.render("search");
})

app.get("/results", function(req, res) {
   var query = req.query.search;
   var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=AIzaSyCX5kScBQhin9RYtWkOjSeECG-95tDeohE`
   request(url, function(error, response, body) {
       if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("index", {data: data, query: query});
       }
   });
});

app.get("/results/page", function(req, res) {
   var query = req.query.query;
   var page = req.query.id;
   var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&pageToken=${page}&type=video&key=AIzaSyCX5kScBQhin9RYtWkOjSeECG-95tDeohE`
   request(url, function(error, response, body) {
       if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("index", {data: data, query: query});
       }
   });
});


app.listen(8080, function() {
    console.log("Youtube App has started!!!");
});
