var express = require("express");
var app = express();


app.get("/", function(req, res){
    res.send("O hai....tahnk you for vizthiting...");
});

app.get("/bye", function(req, res){
   res.send("Goodbye"); 
});

app.get("/dog", function(req, res) {
    console.log("sb made request to /dog")
    res.send("WOOF!");
});

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("hi, this is the " + subreddit + " - subreddit");
});

app.get("/r/:subredditname/comments/:id/:title/", function(req, res) {
    console.log(req.params);
    res.send("Welcome to comments page")
})

app.get("*", function(req, res) {
    res.send("Sorry, NOPE, nada");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started");
});
